import { SET_USER_CHATS } from "../actions/actionType";
export const initialState = {
  userChats: [],
};

const userChatsReducer = (state = initialState, action) => {
    // console.log(action.payload)
  switch (action.type) {
    case SET_USER_CHATS:
      return {
        ...state,
        userChats: action.payload,
      };
    
    default:
      return state;
  }
};
export default userChatsReducer;