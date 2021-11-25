import "../css/login.css";
import H1 from "../image/filename.jpg"
import { FcGoogle } from "react-icons/fc";
import { BsFillTelephoneFill} from "react-icons/bs";
// import { HiOutlineMail } from "react-icons/hi";
import { FaCopyright } from "react-icons/fa";
import { signInAPI } from "../actions/actionIndex";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
// import { Redirect } from "react-router-dom";
// import { Route, Navigate, Routes } from "react-router";



const Login = (props) => {

    return (
      // {
      //   firebase.auth().currentUser.metadata.creationTime ===
      //   firebase.auth().currentUser.metadata.lastSignInTime)?
      //   (

      //     )
      //   }
       
      //     // sign up
      //  else 
      //     // login
      // }
      
      <div className="mainContainer">
          {/* {firebase.auth().user.metadata.creationTime===firebase.auth().user.metadata.lastSignInTime?(
          <Redirect to="/fillform"/>
          ):(
            <Redirect to="/app"/>
          )} */}
          {/* {props.user && props.user.metadata.creationTime===props.user.metadata.lastSignInTime?(<Redirect to="/fillform"/>):(<Redirect to="/app"/>)} */}
           {/* {props.user && <Redirect to="/fillform"/>} */}
        {
          (() => {
            if (props.user===null)
              return <Redirect to="/"/>
            if (props.user && props.user.metadata.creationTime===props.user.metadata.lastSignInTime)
              return <Redirect to="/fillform"/>
            else 
              return <Redirect to="/app"/>
          })()
        }
        <div className="heading">
          <p>Welcome to VartalApp</p>
          <img src={H1} alt="hero1" />
        </div>
        <div className="loginCompo">
          <div className="googlebutton" onClick={() => props.signIn()}>
          <FcGoogle size="1.2rem" style={{background:"white"}} /> &nbsp;&nbsp; Sign in with Google
          </div>
          <Link to="/phonemail" className="loginCompo1"><div className=" phonebutton" >
          <BsFillTelephoneFill size="1.1rem" style={{background:"white"}}/> &nbsp; &nbsp;Sign in with Phone
          </div></Link>
          {/* <div className="googlebutton mailbutton">
          <HiOutlineMail size="1.3rem" /> &nbsp; &nbsp;Sign in with Email
          </div> */}
          <p className="from1">from </p><p className="byShiv">ShivamTripathi<FaCopyright size="0.8rem" color="white" style={{position:"absolute",top: "4px", right:"-1rem"}}/></p>
        </div>
      </div>
    );
}


const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  signIn: () => dispatch(signInAPI()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);


