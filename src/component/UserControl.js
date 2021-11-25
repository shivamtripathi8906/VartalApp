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




const UserControl=(props)=>{
  const [namechange, setNameChange]= useState("");
  const [namechangestyle, setNameChangeStyle]= useState("none");
  //  console.log(namechange);

    useEffect(() => {
        props.getUserAuth(); 
      }, [props]);
      // /console.log(props.user);

      useEffect(() => {
        props.setUserInputData1(); 
      }, [props]);

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
      

    return(
        <>
        <Navbar/>
        <div className="usercontrolMainContainer">
            {/* <div className="userInfo">
                <div className="userIMG">
                    <img src={U1} alt="user" />
                </div>
                <div className="userName">
                {
                  (() => {
                    if (props.user && props.user.displayName)
                      return <div className="name"> <p className="username1">{props.user.displayName}</p></div>
                    if (props.user && props.user.phoneNumber)
                      return <div className="name"> <p className="username1">+91 {props.user.phoneNumber.slice(3)}</p></div>
                    else 
                      return <div className="name"><p className="username1">UserName</p></div>
                  })()
                }

               
                <p className="userAbout">Userstatus</p>
                </div>
                
            </div> */}
            {props.user &&
          props.userData.length > 0 &&
          props.userData.map((article, key) => {
            if(props.user.phoneNumber ===article.data.userId || props.user.email===article.data.userId)
              
             return <div className="userInfo" id={key} key={key}>
               
              
                <div className="userIMG">
                    {article.data.userProfilePicture?(<img src={article.data.userProfilePicture} alt="user" />):(<img src={U1} alt="user" />)}
                    
                    {article.id}
                </div>
                <div className="userName">
                {
                  (() => {
                    if (props.user.phoneNumber=== article.data.userId ||props.user.email===article.data.userId)
                      return  (<div className="name"> <p className="username1">{article.data.userName}</p></div>) 
                    
                    // if (props.user && props.user.phoneNumber)
                    //   return <div className="name"> <p className="username1">+91 {props.user.phoneNumber.slice(3)}</p></div>
                    else 
                      return <div className="name"><p className="username1">UserName</p></div>
                  })()
                }
                
                <p className="userAbout">Userstatus</p>
                </div>
                <div className="changename_style" style={{display:`${namechangestyle}`}}>
                <p>Enter your name</p>
                <input type="text" placeholder={`${article.data.userName}`} className="namechange_input"  maxLength="25"  onChange={(e) => setNameChange(e.target.value)}></input>
                <div className="twoName_button"><button onClick={(e)=>setUserNewName(e,article.data.id)}>Save</button> <button onClick={()=>handleName()}> Cancel</button></div>
               </div>
                
            </div>
            
            else return(null)
             
        //     if(props.user===null)
        //     return 
        //     <div className="userInfo" >
               
        //     <div className="userIMG">
        //         <img src={U1} alt="user" />
        //     </div>
        //     <div className="userName">
            
        //           <div className="name"> <p className="username1">s</p></div><div className="name"> <p className="username1">UserName</p></div>
        //         <div className="name"><p className="username1">UserName</p></div>
              
           
        //     <p className="userAbout">Userstatus</p>
        //     </div>
            
        // </div>
            
}
)}
            <div className="updateUser">
                <div className="photochange"><CgProfile size="2.01rem" color="yellow" style={{ background: '#21313a' }}/><p>changephoto</p></div>
                <div className="photochange" onClick={()=>handleName()}><SiNamecheap size="2rem" color="lightgreen"  style={{ background: '#21313a' }} /><p>Change name</p></div>
                <div className="photochange"><BsTextCenter size="1.9rem" color="lightblue"  style={{ background: '#21313a' }}/><p>changeabout</p></div>
                <div className="photochange" onClick={() => props.signOut()}><HiOutlineLogout size="1.9rem" color="red"  style={{ background: '#21313a' }}/><p>Log out</p></div>
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
});
  
export default connect(mapStateToProps, mapDispatchToProps)(UserControl);