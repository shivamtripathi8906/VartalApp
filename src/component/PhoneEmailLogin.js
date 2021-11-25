import "../css/login.css"
import { BiArrowBack } from "react-icons/bi"
import { Link } from "react-router-dom";
import { recaptchaAPI } from "../actions/actionIndex";
import { connect } from "react-redux";
import { getUserAuth } from "../actions/actionIndex";
import { useEffect,useState } from "react";
import { Redirect } from "react-router-dom";
const PhoneEmail = (props) => {
  useEffect(() => {
    props.getUserAuth(); 
  }, [props]);

  const [editorText, setText] = useState("");
  
  const reset = (e) => {
    setText("");
  };

  const VerifyCaptcha = (e) => {
    e.preventDefault();
    if (e.target !== e.currentTarget) {
      return;
    }
    const payload = {
      description: editorText, 
    };
    props.VerifyCaptcha(payload);
    reset(e);
  };

  

  return (
   <>
   <div className="phoneheader">
   {
          (() => {
            if (props.user===null)
              return 
            if (props.user && props.user.metadata.creationTime===props.user.metadata.lastSignInTime)
              return <Redirect to="/fillform"/>
            else 
              return <Redirect to="/app"/>
          })()
        }
    <Link to="/"><BiArrowBack color="white" size="1.6rem"/></Link>
    <p>Verify your phone number </p>
    {/* <h5> {props.user ? (
               props.user.phoneNumber
              ) : (
                <p>no user</p>
              )}</h5> */}
   </div>
    <div className="inputPhone">
        <p>VartalApp will send an SMS message(carrier charges may apply) to verify your phone number. Enter your phone number:</p>
        <div className="IndiaCont"><p>India</p></div>
        <div className="phonenumberInput">
            <div className="phone1"><p>+&nbsp;&nbsp;91</p></div>
            <div className="phone2"><input type="number" name="phonenum" id="a1" maxLength="10" size="10" placeholder="00000-00000" onChange={(e) => setText(e.target.value)}/></div>   
        </div>
        <div id="recaptchaContainer"></div>
        <button className="verifybutton" onClick={(e)=>VerifyCaptcha(e)}>Next</button>   
    </div>
    <p className="ageRestrict">You must be at least <Link to="/phonemail" style={{color:"lightgreen"}}>16 years old</Link> to register. <Link to="/phonemail" style={{color:"lightgreen", textDecorationLine: 'underline'}}>Learn how</Link> VartalApp works with other companies.</p>
   </>
  );
}


const mapStateToProps = (state) => {
  return {
     user: state.userState.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  VerifyCaptcha: (payload) => {dispatch(recaptchaAPI(payload))},
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneEmail);
