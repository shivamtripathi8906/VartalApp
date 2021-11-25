import { Link } from "react-router-dom";
import "../css/fillform.css";
import I1 from "../image/nouser.jpg";
import { BsFillCameraFill} from "react-icons/bs";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { setUserDataAPI } from "../actions/actionIndex";
import { Redirect } from "react-router-dom";
import { setUserInputData} from "../actions/actionIndex";


const Fillform = (props) => {
    const [shareImage, setShareImage] = useState("");
    const [profilename, setProfieName]= useState("");
    const [confirmbuttstyle, setConfirmbutt]=useState("none");
    const [messageare, setMessagearea]= useState("block");

    useEffect(() => {
      props.setUserInputData1(); 
    }, [props]);
    
    const setUserData=(event)=>{
      event.preventDefault();
      if (event.target !== event.currentTarget) {
        return;
      }let payload="";
      if(setShareImage===null){
         if(props.user.displayName===null){
          payload={
            uId:props.user.phoneNumber,
            userName:profilename,
            userProfilePicture:null,
          }}
         if(props.user.phoneNumber===null){
          payload={
            uId:props.user.email,
            userName:profilename,
            userProfilePicture:null,
          }
          // props.setUserData(payload)
        }
        // props.setUserData(payload)        
        }
      
      else
      { 
        if(props.user.displayName===null){
          payload={
            uId:props.user.phoneNumber,
            userName:profilename,
            userProfilePicture:shareImage,
          }}
         if(props.user.phoneNumber===null){
          payload={
            uId:props.user.email,
            userName:profilename,
            userProfilePicture:shareImage,
          }
          // props.setUserData(payload);
        }
        // props.setUserData(payload);
        
      }
      props.setUserData(payload);
      
      }


    useEffect(() => {
        if(profilename!==""){
        setConfirmbutt("block")
        setMessagearea("none")}
        else 
        {setConfirmbutt("none")
        setMessagearea("block")}
      }, [profilename]);

    const handleChange = (e) => {
        const image = e.target.files[0];
        if (image === "" || image===undefined) {
          console.log(e.error.message);
          return;
        }
        setShareImage(image);
      };

      
        
    return(
      <>
    <div className="fillformMainCont">
    {props.userData.map((article, key) => {
            if (props.user.phoneNumber===article.data.userId || props.user.email===article.data.userId)
              return <Redirect to="/app" key={key}/>
            else 
              return null;
          })
    }

       <div className="fillform_Photo">
           <div className="userProfilePhoto">
        {/* {  (() => {
            if (shareImage)
              return <img src={URL.createObjectURL(shareImage)} alt="noim" />
            else 
              return <img src={I1} alt="noim" />
          })()
        } */}
          {shareImage? (<img src={URL.createObjectURL(shareImage)} alt="noim" />):(<img src={I1} alt="noImage" />)}
           {/* <img src={I1} alt="noim" /> */}
           </div>
            <input
                    type="file"
                    accept="image/gif, image/jpeg ,image/png"
                    name="image"
                    id="file"
                    multiple={false}
                    style={{ display: "none" }}
                    onChange={handleChange}
            />
            <div className="inputForProfile">
                    <label htmlFor="file" style={{ cursor: "pointer", background:"rgb(4, 145, 4)", borderRadius:"50%",height:"auto", paddingTop:"0.35rem", paddingLeft:"0.35rem", paddingRight:"0.3rem" }}>
                      <BsFillCameraFill color="white" size="1.5rem" style={{background:"rgb(4, 145, 4)" ,borderRadius:"50% 50% 0 0"}}/>
                    </label>
            </div>
            <p>Select an image</p>
       </div>
       <div className="userProfileDetails">
           <input type="textarea" name="text" id="profileName" placeholder="Enter your name" style={{width:"66%", marginBottom:"0.1rem"}}  onChange={(e) => setProfieName(e.target.value)}/>   
       </div>
       <p className="mandatoryMessage" style={{display:`${messageare}`}}>Name is mandatory to proceed.*</p>
       <div className="confirmbutt"  >
           <Link to="/app" style={{display:`${confirmbuttstyle}`}} onClick={(e)=>setUserData(e)}>Confirm</Link>
       </div>
    </div>
    </>
)}

const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
    userData: state.userDataState.userData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  setUserData: (payload) => {
    dispatch(setUserDataAPI(payload));
  },
  setUserInputData1:()=> dispatch(setUserInputData())
});

                    
export default connect(mapStateToProps,mapDispatchToProps)(Fillform);