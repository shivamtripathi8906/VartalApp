import { combineReducers } from "redux";
import userReducer from "./userReducer";
import userDataReducer from "./userDataReducer";
import userChatsReducer from "./userChatsReducer";
const rootReducer = combineReducers({
    userState: userReducer,    
    userDataState: userDataReducer,
    userChatState:userChatsReducer
  });  
export default rootReducer;