import Navbar from "./Navbar";
import "../css/contacts.css";
import { connect } from "react-redux";
import { useEffect } from "react";
import { setUserChatsAPI, setUserInputData } from "../actions/actionIndex";
import C1 from "../image/nouser.jpg";
import { setUserChatsStateAPI } from "../actions/actionIndex";
// import { Redirect } from "react-router-dom";
import { useState } from "react";
import { AiOutlineArrowLeft} from "react-icons/ai";
import U1 from "../image/nouser.jpg";
import {auth, storage,db} from "../config/Config";

const Contacts=(props)=>{

  // const [chatflag, setChatFlag]= useState("");
  const [profilephotodisplay, setProfilePhotoDetails]= useState("none");
  const [url, setUrl]= useState();


  useEffect(() => {
    props.setUserInputData1(); 
  }, [props]);

  useEffect(() => {
    props.setUserChatsData1(); 
  }, [props]);
  // console.log(props.userChats)

   const handleRedirect=(p,m)=>{
    // setChatFlag(p);
    let tochatUrl=""
    for(let j=0;j<props.userChats.length; j++)
      { 
        if((props.userChats[j].data.participants[0]===m && props.userChats[j].data.participants[1]===p ) || (props.userChats[j].data.participants[1]===m && props.userChats[j].data.participants[0]===p ))
          {

            tochatUrl=props.userChats[j].data.id;
          }
      }
      console.log(tochatUrl);
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


  const handleRedirectDB=(event,chatsU)=>{
    console.log("event",event.data)
    console.log("user",props.user);

    // console.log("chats",chatsU);
    // chatsU.forEach((chats) => {
    //   if (chats.data.participants.includes(event.data.id) && chats.data.participants.includes(props.user.id)) {
    //     console
    //   }
    // })
    // toChatSection(event,m, dataU, chatsU);
    
    // let mainUserId="";
    // for (let i = 0; i < dataU.length; i++) 
    // {
    //    if(props.user.email===dataU[i].data.userId || props.user.phoneNumber===dataU[i].data.userId)
    //      {
    //        mainUserId=dataU[i].data.id;
    //      }
    // }
    // handleRedirect(mainUserId,m)

  }

  const toChatSection=(event,m, dataU, chatsU)=>{
    event.preventDefault();
    if (event.target !== event.currentTarget) {
      return;
    }
    let mainUserId=""
    // let preORnot="true";
    let dataULength=dataU.length;
    // let chatsUUserLength=chatsU.length;
    // console.log(chatsUUserLength)
    // console.log(MainUserId);
    // console.log(m);
    // console.log(chatsU[j].data.participants[k])
    for (let i = 0; i < dataULength; i++) 
    {
       if(props.user.email===dataU[i].data.userId || props.user.phoneNumber===dataU[i].data.userId)
         {
           mainUserId=dataU[i].data.id;
         }
    }
    var flag=0;
    for(let j=0;j<chatsU.length; j++)
      { 
        if((chatsU[j].data.participants[0]===m && chatsU[j].data.participants[1]===mainUserId ) || (chatsU[j].data.participants[1]===m && chatsU[j].data.participants[0]===mainUserId ))
          {
            flag=1;
          }
      }
    if(flag===0)
      {
        let payload=
          {
            MainUserId:mainUserId,
            toChatUser:m,
          }
        props.toChatSection(payload)
      }
      // toChatSection(event,m,chatsU,props.userChats)
      // console.log(tochatUrl)
    // handleRedirect(preORnot)
  }

  useEffect(() => {
    props.setUserChatsData1(); 
  }, [props]);

    return(
        <>
        <Navbar props="contacts"/>
        <div className="mainContactCont">
          {/* {chatflag==="true"? <Redirect to="/app"/>:null} */}
        {props.user &&
          props.userData.map((article, key) => (
            props.user.phoneNumber === article.data.userId || props.user.email===article.data.userId ?
            (
              null
            )
            :
            (
            <div className="showUserContact" key={key} onClick={()=>handleRedirectDB(article,props.userChats)}>
            <div className="contactPhoto" onClick={(e)=>{e.stopPropagation();photoDisplay(article.data.userProfilePicture)}}> 
              {article.data.userProfilePicture?(<img src={article.data.userProfilePicture} alt="user" />):(<img src={C1} alt="user"/>)}
            </div>
            <div className="contactDetails" >
             <p className="username1" >{article.data.userName}</p>
             {article.data.about ? <p className="userAbout">{article.data.about}</p>:<p className="userAbout">About.</p>}</div>
            </div>
            )
          ))
        }
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
      userChats:state.userChatState.userChats,
    };
  };
  
  const mapDispatchToProps = (dispatch) => ({
    setUserInputData1:()=> dispatch(setUserInputData()),
    toChatSection:(payload)=> dispatch(setUserChatsAPI(payload)),
    setUserChatsData1:()=> dispatch(setUserChatsStateAPI()),
  });
  
  export default connect(mapStateToProps, mapDispatchToProps)(Contacts);