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
        selectedList: action.payload,
      };

    case "ADD_RECITATION":
      return {
        selectedRecitations: [...state.selectedRecitations, action.payload],
      };

    case "REMOVE_RECITATION":
      return {
        selectedRecitations: state.selectedRecitations.filter(
          (item) => item !== action.payload
        ),
      };
      
    case "UPDATE_RECITATION_LIST":
      return {
        selectedRecitations: action.payload,
      };
    default:
      return state;
  }
};
