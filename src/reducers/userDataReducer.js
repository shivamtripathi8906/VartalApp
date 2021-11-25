
import { SET_USER_DATA } from "../actions/actionType";
export const initialState = {
  userData: [],
};

const userDataReducer = (state = initialState, action) => {
    // console.log(action.payload)
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    
    default:
      return state;
  }
};
export default userDataReducer;