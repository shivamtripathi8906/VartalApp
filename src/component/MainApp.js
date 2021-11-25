import { Route, Switch } from "react-router-dom";
import Navbar from '../component/Navbar';
import Messages from "./Messages";
const MainApp=()=>{
    return(
        <>
        <Navbar/>
        
        <Switch>
        <Route exact path="/message" ><Messages/></Route>
        </Switch>
        
        </>
    );
}
export default MainApp;