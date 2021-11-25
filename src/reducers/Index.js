import { combineReducers } from "redux";
import userReducer from "./userReducer";
import userDataReducer from "./userDataReducer";
const rootReducer = combineReducers({
    userState: userReducer,    
    userDataState: userDataReducer,
  });  
export default rootReducer;