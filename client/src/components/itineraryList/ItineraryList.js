import React from 'react';
import { connect } from 'react-redux';
import Waypoint from 'react-waypoint';
import { BpkExtraLargeSpinner, SPINNER_TYPES } from 'bpk-component-spinner';
import { search, fetchNextPage } from '../../store/actions';
import { loading, error, itineraries, hasMorePages } from '../../store/selectors';
import PropTypes from '../../types';
import ItineraryCard from './ItineraryCard';
import ItineraryError from './ItineraryError';
import './ItineraryList.scss';

export class ItineraryList extends React.PureComponent {

  componentDidMount() {
    this.props.search();
  }

  render() {
    const { itineraries, search, fetchNextPage, loading, error, hasMorePages } = this.props;
    return (<div className="itinerary-list">
      {error && <ItineraryError
        className="itinerary-list__error"
        onRetry={search}
      />}
      {!error && ((loading || itineraries.length > 0)
        ? itineraries.map(itinerary => (
            <ItineraryCard
              className="itinerary-list__card"
              itinerary={itinerary}
              key={itinerary.bookingLink}
            />
          ))
      : <div>no results!</div>)}
      {loading && <BpkExtraLargeSpinner className="itinerary-list__spinner" type={SPINNER_TYPES.primary} />}
      {!error && !loading && hasMorePages && itineraries.length > 0 && <Waypoint
        onEnter={fetchNextPage}
        bottomOffset={-10}
      />}
    </div>);
  }
}

ItineraryList.propTypes = {
  itineraries: PropTypes.arrayOf(PropTypes.itinerary).isRequired,
  search: PropTypes.func.isRequired,
  fetchNextPage: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  hasMorePages: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    loading: loading(state),
    error: error(state),
    itineraries: itineraries(state),
    hasMorePages: hasMorePages(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    search: () => dispatch(search()),
    fetchNextPage: () => dispatch(fetchNextPage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItineraryList);
