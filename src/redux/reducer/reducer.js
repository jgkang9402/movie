let initialState = {};

function reducer(state = initialState, action) {
  // console.log("action은?", action);
  // console.log(state);

  return { ...state };
}

export default reducer;
