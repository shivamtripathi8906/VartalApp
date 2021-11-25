import './App.css';
import { BrowserRouter , Route } from "react-router-dom";
import Login from './component/Login';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUserAuth } from './actions/actionIndex';
import PhoneEmail from './component/PhoneEmailLogin';
import Messages from './component/Messages';
import Status from './component/Status';
import Contacts from './component/Contacts';
import UserControl from './component/UserControl';
import Fillform from './component/Fillform';
function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, [props]);
  return (
    <div className="App">  
     <BrowserRouter>
       <Route exact path="/" component={Login}/>
       <Route exact path="/app" component={Messages}/>
       <Route exact path="/phonemail" component={PhoneEmail}/>
       {/* <Route exact path="/message" ><Messages/></Route> */}
       <Route exact path="/status" component={Status}/>
       <Route exact path="/contacts" component={Contacts}/>
       <Route exact path="/usercontrol" component={UserControl}/>
       <Route exact path="/fillform" component={Fillform}/>
    </BrowserRouter>
    </div>  
  );
}

const mapStateToProps = (state) => {
  return {user: state.userState.user,};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);


