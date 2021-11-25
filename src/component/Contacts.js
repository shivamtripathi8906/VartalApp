import Navbar from "./Navbar";
import "../css/contacts.css";
import { connect } from "react-redux";
import { useEffect } from "react";
import { setUserInputData } from "../actions/actionIndex";
import C1 from "../image/nouser.jpg"


const Contacts=(props)=>{

  useEffect(() => {
    props.setUserInputData1(); 
  }, [props]);
  

    return(
        <>
        <Navbar/>
        <div className="mainContactCont">
        {props.user &&
          props.userData.map((article, key) => (
            props.user.phoneNumber === article.data.userId ||props.user.email===article.data.userId ?
            (
              null
            )
            :
            (
            <div className="showUserContact" key={key}>
            <div className="contactPhoto"> 
              {article.data.userProfilePicture?(<img src={article.data.userProfilePicture} alt="user" />):(<img src={C1} alt="user"/>)}
            </div>
            <div className="contactDetails">
             <p className="username1">{article.data.userName}</p>
             <p className="userAbout">Userstatus</p></div>
            </div>
            )
          ))
        }
        </div>
        </>
    );
}


const mapStateToProps = (state) => {
    return {
      user: state.userState.user,
      userData: state.userDataState.userData,
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    setUserInputData1:()=> dispatch(setUserInputData())
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Contacts);