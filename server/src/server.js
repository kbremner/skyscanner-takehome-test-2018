require('isomorphic-fetch');
require('es6-promise').polyfill();

const express = require('express');
const app = express();
const { minBy } = require('lodash');
const api = require('./api/');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const getCarrierFaviconUrl = ({ ImageUrl }) => {
  const splitUrl = ImageUrl.split('/');
  return `https://logos.skyscnr.com/images/airlines/favicon/${splitUrl[splitUrl.length -1]}`;
}

const findById = (vals, id) => vals.find(({ Id }) => Id === id);

const formatPrice = price => price % 1 !== 0
  ? price.toFixed(2)
  : price;

const formatResults = ({ Itineraries, Agents, Legs, Carriers, Segments, Places }) => Itineraries
  .map(({ OutboundLegId, InboundLegId, PricingOptions }) => {
    const legs = [OutboundLegId, InboundLegId]
      .filter(legId => legId !== undefined)
      .map(findById.bind(null, Legs))
      .map(leg => {
        const carrier = findById(Carriers, leg.Carriers[0]);
        return {
          ...leg,
          carrier: {
            name: carrier.Name,
            faviconUrl: getCarrierFaviconUrl(carrier)
          }
        };
      })
      .map(leg => ({
        ...leg,
        segments: leg.SegmentIds
          .map(findById.bind(null, Segments))
          .map(({ DepartureDateTime, ArrivalDateTime, OriginStation, DestinationStation }) => ({
            origin: {
              dateTime: DepartureDateTime,
              code: findById(Places, OriginStation).Code
            },
            destination: {
              dateTime: ArrivalDateTime,
              code: findById(Places, DestinationStation).Code
            }
          }))
      }))
      .map(({ Id, Duration, Stops, carrier, segments }) => ({
        id: Id,
        duration: Duration,
        numStops: Stops.length,
        carrier,
        segments
      }));

  const pricingOption = minBy(
    // some itineraries can have a pricing option with price of 0
    // and no agents, so need to filter them out.
    PricingOptions.filter(({ Agents }) => Agents.length > 0),
    'Price');
  const { Price, DeeplinkUrl } = pricingOption;

  return {
    price: `£${Price % 1 !== 0 ? Price.toFixed(2) : Price}`,
    agentName: findById(Agents, pricingOption.Agents[0]).Name,
    bookingLink: DeeplinkUrl,
    legs
  }
  });

/**
  Simple flight search api wrapper.

  TODO: client should provide params

  Api params and location values are here:
  http://business.skyscanner.net/portal/en-GB/Documentation/FlightsLivePricingQuickStart
*/
app.get('/api/search', (req, res) => {
  const { sessionKey, pageIndex } = req.query;
  const pageIndexNum = parseInt(pageIndex) || 0;
  
  let apiPromise;
  if (req.query.sessionKey) {
    apiPromise = api.livePricing.fetchPage(sessionKey, pageIndexNum);
  } else {
    apiPromise = api.livePricing.search(req.query);
  }
  
  apiPromise
    .then(result => {
      const itineraries = formatResults(result);
      const sessionUrl = `${req.protocol}://${req.headers.host}/api/search?sessionKey=${sessionKey || result.sessionKey}`;
      const nextPageUrl = `${sessionUrl}&pageIndex=${pageIndexNum + 1}`;
      return itineraries.length === 0
        ? { itineraries, sessionUrl }
        : { itineraries, sessionUrl, nextPageUrl };
    })
    .then(payload => res.json(payload))
    .catch(error => {
      console.log('Error occurred:', error);
      if (error.ValidationErrors) {
        res.status(400).json({ validationErrors: error.ValidationErrors });
      } else {
        res.status(500).json({ error: 'Something went wrong!' });
      }
    });
});

app.get('/api/places', (req, res) => {
  api.places.search(req.query.query)
    .then(results => res.json(results));
});

app.listen(4000, () => {
  console.log('Node server listening on http://localhost:4000');
});
