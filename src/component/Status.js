import Navbar from "./Navbar";

const Status=()=>{
    return(
        <>
        <Navbar props="status"/>
        <div className="statusMainContainer">
            <div className="updateStatus"></div>
            <div className="contactStatus"></div>
        </div>
        
        </>
    );
}
export default Status;