import "../css/navbar.css";
import { MdOutlineExplore,MdOutlineContacts} from "react-icons/md";
import {AiOutlineSearch} from "react-icons/ai";
import { BsChatSquareText,BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const Navbar = (props) => {
    return (
    <>
     <div className="header">
       <div className="header-top">
         <p>VartalApp</p>
         <AiOutlineSearch size="1.6rem" color="white"  style={{ background: '#364147' }}/>
       </div>
       <div className="header-bottom">
        <Link className="allroutes" to="/app" ><div><BsChatSquareText size="1.37rem" style={{ background: '#364147' }}/><p>Messages</p></div></Link>
        <Link className="allroutes" to="/status"><div><MdOutlineExplore size="1.65rem"  style={{ background: '#364147' }}/><p>Status</p></div></Link>
        <Link className="allroutes" to="/contacts"><div className="hb1"><MdOutlineContacts size="1.4rem"  style={{ background: '#364147' }}/><p>Contacts</p></div></Link>
        <Link className="allroutes" to="/usercontrol"><div><BsFillPersonFill size="1.6rem"  style={{ background: '#364147' }}/><p>Me</p></div></Link>
       </div>
     </div>
    </>
    );
}
export default Navbar;