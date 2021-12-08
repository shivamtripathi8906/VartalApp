import Navbar from "./Navbar";
import "../css/messages.css";
const Messages=()=>{
    return(
        <>
        <Navbar props="app"/>
        <div className="messageMainContaier">
        <p>Messages Lorem ipsum doloratur molestias accusantium ipsa, magni eaque, porro sit?</p>
        </div>
        </>
    );
}
export default Messages;