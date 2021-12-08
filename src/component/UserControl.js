import Navbar from "./Navbar";
import "../css/usercontrol.css"
import U1 from "../image/nouser.jpg";
import { HiOutlineLogout} from "react-icons/hi";
import { SiNamecheap } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { BsTextCenter } from "react-icons/bs";
import { getUserAuth } from "../actions/actionIndex";
import { signOutAPI } from "../actions/actionIndex";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { setUserInputData} from "../actions/actionIndex";
import { setUserNewNameAPI } from "../actions/actionIndex";
import { setUserAboutAPI } from "../actions/actionIndex";
import { AiOutlineArrowLeft} from "react-icons/ai";





const UserControl=(props)=>{
  const [namechange, setNameChange]= useState("");
  const [namechangestyle, setNameChangeStyle]= useState("none");
  const [aboutchangestyle, setAboutChangeStyle]= useState("none");
  const [aboutchange, setAboutChange]= useState("");
  const [profilephotodisplay, setProfilePhotoDetails]= useState("none");
  const [url, setUrl]= useState();
  // const [userphotostyle,setUserPhotoStyle]=useState("none");
  //  console.log(aboutchange);

    useEffect(() => {
        props.getUserAuth(); 
      }, [props]);

      useEffect(() => {
        props.setUserInputData1(); 
      }, [props]);

      const handleAbout=()=>{
        // e.preventDefault();
         if(aboutchangestyle==="none")
         setAboutChangeStyle("block")
         else
         setAboutChangeStyle("none")
      }

      const photoDisplay=(m)=>{
        // console.log(m)
        if(profilephotodisplay==="none"){
        setProfilePhotoDetails("block");
        setUrl(m);  
     }
        else
        setProfilePhotoDetails("none")
        setUrl(m)
        
      } 
      // const handleUserPhoto=()=>{
      //    if(userphotostyle==="none")
      //    setUserPhotoStyle("block")
      //    else
      //    setUserPhotoStyle("none")
      // }

      const handleName=()=>{
        // e.preventDefault();
         if(namechangestyle==="none")
         setNameChangeStyle("block")
         else
         setNameChangeStyle("none")
      }
      
      
      const setUserNewName=(event,m)=>{
        event.preventDefault();
        if (event.target !== event.currentTarget) {
          return;
        }
        let payload="";
        if(namechange===""){console.log()}
        else{
         payload={
           id1:m,
           newname:namechange,
         }}
         props.setUserNewName(payload)
         setNameChangeStyle("none");
         setNameChange("");
      }

      const setUserNewAbout=(event,m)=>{
        event.preventDefault();
        if (event.target !== event.currentTarget) {
          return;
        }
        let payload="";
        if(aboutchange===""){console.log()}
        else{
         payload={
           id1:m,
           newabout:aboutchange,
         }}
         props.setUserNewAbout(payload)
         setAboutChange("");
         setAboutChangeStyle("none");
      }
      

    return(
        <>
        <Navbar props="usercontrol"/>
        <div className="usercontrolMainContainer">
            {props.user &&
          props.userData.length > 0 &&
          props.userData.map((article, key) => {
            if(props.user.phoneNumber ===article.data.userId || props.user.email===article.data.userId)
              
             return <div className="userInfo" id={key} key={key}>
               
              
                <div className="userIMG" onClick={()=>photoDisplay(article.data.userProfilePicture)}>
                    {article.data.userProfilePicture?(<img src={article.data.userProfilePicture} alt="user" />):(<img src={U1} alt="user" />)}
                </div>
                <div className="userName">
                {
                  (() => {
                    if (props.user.phoneNumber=== article.data.userId ||props.user.email===article.data.userId)
                      return  (<div className="name"> <p className="username1">{article.data.userName}</p></div>) 
                    else 
                      return <div className="name"><p className="username1">UserName</p></div>
                  })()
                }
                
                {article.data.about?<p className="userAbout">{article.data.about}</p>:<p className="userAbout">About.</p>}
                </div>
                <div className="changename_style" style={{display:`${namechangestyle}`}}>
                <p>Enter your name</p>
                <input type="text" placeholder={`${article.data.userName}`} className="namechange_input"  maxLength="25"  onChange={(e) => setNameChange(e.target.value)}></input>
                <div className="twoName_button"><button onClick={(e)=>setUserNewName(e,article.data.id)}>Save</button> <button onClick={()=>handleName()}> Cancel</button></div>
                
               </div>

               <div className="changename_style" style={{display:`${aboutchangestyle}`}}>
                <p>Add About</p>
                <input type="text" placeholder={`${article.data.about}`} className="namechange_input"  maxLength="50"  onChange={(e) => setAboutChange(e.target.value)}></input>
                <div className="twoName_button"><button onClick={(e)=>setUserNewAbout(e,article.data.id)}>Save</button> <button onClick={()=>handleAbout()}> Cancel</button></div>
               </div>
               

                
            </div>
            
            else return(null)
            
}
)}
            <div className="updateUser">
            <div className="coverContainer" style={{display:`${aboutchangestyle}`}} onClick={()=>handleAbout()}></div>
            <div className="coverContainer" style={{display:`${namechangestyle}`}} onClick={()=>handleName()}></div>
                <div className="photochange" ><CgProfile size="1.75rem" color="rgb(0, 175, 156)" style={{ background: '#21313a' }}/><p>changephoto</p></div>
                <div className="photochange" onClick={()=>handleName()}><SiNamecheap size="1.8rem" color="rgb(0, 175, 156)"  style={{ background: '#21313a' }} /><p>Edit name</p></div>
                <div className="photochange" onClick={()=>handleAbout()}><BsTextCenter size="1.7rem" color="rgb(0, 175, 156)"  style={{ background: '#21313a' }}/><p>Edit about</p></div>
                <div className="photochange" onClick={() => props.signOut()}><HiOutlineLogout size="1.8rem" color="rgb(175, 90, 68)"  style={{ background: '#21313a',paddingLeft:"2px" }}/><p>Log out</p></div>
            </div>
            {/* <div className="user_photo_container" style={{display:`${userphotostyle}`}}>
              <ImageCrop />
              <div className="twouserphotoButton">
                <button onClick={()=>handleUserPhoto()}>Go Back</button>
              </div>
            </div> */}
            <div className="user_photo_Show" style={{display:`${profilephotodisplay}`}}>
                 <div className="profileImg"><p onClick={()=>photoDisplay(null)}><AiOutlineArrowLeft size="1.2rem" style={{marginTop:"0.2rem"}}/></p><p style={{marginLeft:"2rem", fontSize:"1.15rem"}}>Profile photo</p></div>
                 {url?<img src={url} alt="user"/>:<img src={U1} alt="user"/>}
               </div>
            
            
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
    getUserAuth: () => dispatch(getUserAuth()),
    signOut: () => dispatch(signOutAPI()),
    setUserInputData1:()=> dispatch(setUserInputData()),
    setUserNewName: (payload) => {
      dispatch(setUserNewNameAPI(payload));
    },
    setUserNewAbout:(payload)=>{
      dispatch(setUserAboutAPI(payload))
    }
});
  
export default connect(mapStateToProps, mapDispatchToProps)(UserControl);