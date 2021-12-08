import "../css/navbar.css";
import { MdOutlineExplore,MdOutlineContacts} from "react-icons/md";
import {AiOutlineSearch} from "react-icons/ai";
import { BsChatSquareText,BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Navbar = (props) => {
  // console.log(props.props)
  const [icon1, setIcon1]= useState("white")
  const [icon2, setIcon2]= useState("white")
  const [icon3, setIcon3]= useState("white")
  const [icon4, setIcon4]= useState("white")

  useEffect(()=>{
     if(props.props==="contacts")
     setIcon3("lightgreen")
     if(props.props==="app")
     setIcon1("lightgreen")
     if(props.props==="status")
     setIcon2("lightgreen")
     if(props.props==="usercontrol")
     setIcon4("lightgreen")
  },[props.props])
  
  

    return (
    <>
     <div className="header">
       <div className="header-top">
         <p>VartalApp</p>
         <AiOutlineSearch size="1.6rem" color="white"  style={{ background: '#364147' }}/>
       </div>
       <div className="header-bottom">
        <Link className="allroutes" to="/app" ><div ><BsChatSquareText size="1.37rem" style={{ background: '#364147' , color:`${icon1}`}}/><p style={{color:`${icon1}`}}>Messages</p></div></Link>
        <Link className="allroutes" to="/status"><div><MdOutlineExplore size="1.65rem"  style={{ background: '#364147', color:`${icon2}` }}/><p style={{color:`${icon2}`}}>Status</p></div></Link>
        <Link className="allroutes" to="/contacts"><div className="hb1"><MdOutlineContacts size="1.4rem"  style={{ background: '#364147' , color:`${icon3}`}}/><p style={{color:`${icon3}`}}>Contacts</p></div></Link>
        <Link className="allroutes" to="/usercontrol"><div><BsFillPersonFill size="1.6rem"  style={{ background: '#364147',color:`${icon4}` }}/><p style={{color:`${icon4}`}}>Me</p></div></Link>
       </div>
     </div>
    </>
    );
}
export default Navbar;