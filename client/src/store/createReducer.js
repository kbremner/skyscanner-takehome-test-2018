// adapted from the example here:
// https://redux.js.org/recipes/reducing-boilerplate#generating-reducers
export default (initialState, handlers) => (state = initialState, action) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state;
