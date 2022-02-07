export default (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        selectedList: [...state.selectedList, action.payload],
      };
    case "REMOVE_ITEM":
      return {
        selectedList: state.selectedList.filter(
          (item) => item !== action.payload
        ),
      };
    case "UPDATE_LIST":
      return {
        selectedList: action.payload
      }
    default:
      return state;
  }
};
