# Implementation:

### Q) What libraries did you add to the frontend? What are they used for?
* redux - used to manage state and side effects within the application
* redux-api-middleware - handles carrying out API calls and triggering actions associated with those calls in a consistent manner
* react-waypoint - triggers a callback when it enters the viewport, used for triggering the loading of additional pages
* jest - used for executing unit tests
* enzyme - used for shallow rendering of components during unit tests so that a full DOM is not required
* backpack components - used several backpack components to make it easier to match the provided design

### Q) What is the command to start the server?

(Default) `APIKEY=<key> npm run server`

---

# General:

### Q) How long, in hours, did you spend on the test?
30 hours

### Q) If you had more time, what further improvements or new features would you add?
* Show arrival time, as well as departure time, for each segment
* Apply more aria attributes to make the site more accessible
* Add outbound/inbound date fields to search options
* Make number of passengers editable
* Make cabin class editable
* Implement sorting
* Implement filtering
* Save most recent origin/destination to local storage to allow user to start where they left off
* Extract text from components to support localisation
* Add typescript/flow to catch errors at compile time
* Support different currencies
* Add tests to server code
* Upgrade react/webpack versions
* Highlight to customer when they need to change airports between segments
* Add smoke screen tests using something like puppateer or cypress

### Q) Which parts are you most proud of? And why?
* The components all try to adhear to the BEM (Block Element Modifier) pattern for CSS classes. This is a pattern I have had the opportunity to learn about recently and found it a useful way to structure styles.
* Results are loaded in pages, which means that a user sees the first set of results quicker and can load more as required.
* Cards support showing legs with multiple stops, which allows a user to view more complicated, multi-stop journeys.
* When a user clicks on the header, they can search for alternative locations and select from the results returned by the places search API. This allows a user to search for flights other than the those from/to the default locations.

### Q) Which parts did you spend the most time with? What did you find most difficult?
* Initially had issues with the webpack setup not including backpack components, which turned out to be because the regex didn't account for Windows-style paths
* Ran in to issues with the fact that some backpack components contained flow types. Tried a babel transform that should have removed them but for some reason that didn't work. Eventually had to follow two different approaches, one for removing the types during the webpack build and one for removing them when running unit tests.

### Q) How did you find the test overall? If you have any suggestions on how we can improve the test or our API, we'd love to hear them.
* Interesting challenge
* API docs were thorough
* Backpack docs were pretty easy to navigate and find the required info (might help to have some more specific info around webpack setup?)
* Might be good to upgrade the react and webpack versions in this example