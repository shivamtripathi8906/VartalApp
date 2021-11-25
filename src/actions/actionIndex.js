import {auth, storage} from "../config/Config";
import { SET_USER , SET_USER_DATA} from "./actionType";
import firebase from "@firebase/app-compat";
import db from "../config/Config";
import { Redirect } from "react-router-dom";
export const setUser = (payload) => ({
    type: SET_USER,
    user: payload,
});

export const setUserInputData1 = (payload) => ({
 
  type: SET_USER_DATA,
  payload: payload,
}
);

export function signOutAPI() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(setUser(null));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}

export function signInAPI() {
    return (dispatch) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });
      auth
        .signInWithPopup(provider)
        .then((payload) => {
          dispatch(setUser(payload.user));
        })
        .catch((error) => alert("Not chosen correctly"));
    };
  }

  export function getUserAuth() {
    return (dispatch) => {
      auth.onAuthStateChanged(async (user) => {
        if (user) {
            // console.log(user);  
          dispatch(setUser(user));
        }
      });
    };
  }

  
  export function recaptchaAPI(payload){
   return(dispatch)=>{
     let recaptcha= new firebase.auth.RecaptchaVerifier("recaptchaContainer")
     let number=`+91${payload.description}`;
    //  console.log(number);
     firebase.auth().signInWithPhoneNumber(number,recaptcha).then((e)=>{
       let code= prompt("enter otp");
       if(code===null){
         return;
       }
       e.confirm(code).then((res)=>{
        //  console.log(res,".....");
         dispatch(setUser(res));
       })
     }).catch((error)=>{
       console.log(error.message+"error")
     })  
   }
  }

  export function setUserDataAPI(payload){
    return (dispatch) => {
      // dispatch(setLoading(true));
  
      if (payload.userProfilePicture) {
        const upload = storage
          .ref(`profilePicture/${payload.userProfilePicture.name}`)
          .put(payload.userProfilePicture);
        upload.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if (snapshot.state === "RUNNING") {
              console.log(`progress=${progress}`);
            }
          },
          (error) => console.log(error.code),
          async () => {
            const downloadURL = await upload.snapshot.ref.getDownloadURL();
            console.log(payload);
            db.collection("UserData").add({
              
              
                userId:payload.uId,
                userName:payload.userName,
                userProfilePicture:downloadURL,
  
                
            });
            // dispatch(setLoading(false));
          }
        );
      } else {
        db.collection("UserData").add({
          
            userId:payload.uId,
            userName:payload.userName,
            userProfilePicture:"",
          
        });
        <Redirect to="/app"/>
        // dispatch(setLoading(false));
      }
    };
  }

  export function setUserInputData(){
    return(dispatch)=>{

    db.collection("UserData")
      .onSnapshot((snapshot) => {
        var payload = [];
        snapshot.docs.forEach((doc) => {
          var ob = {};
          // ob.id = doc.userId;
          ob.data = {...doc.data(), id:doc.id};
          payload.push(ob);
        });
        // console.log(payload)
        dispatch(setUserInputData1(payload));
        
        // console.log(payload);
      });
      
    }
    
  }

  export function setUserNewNameAPI(payload){
    return(dispatch)=>{
      db.collection("UserData").doc(payload.id1).update({userName: payload.newname});
      // console.log(payload.id1)
    }
    
  }

  