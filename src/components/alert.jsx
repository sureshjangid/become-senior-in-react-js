import { createPortal } from "react-dom";

const Alert = ({ show, children ,onClose}) => {
    if(!show){return}else{
      setTimeout(() => {
        onClose()
      }, 2000);
    }; 
     
    return   createPortal(
      <div className="alert" >
        {children}
      </div>
    ,document.querySelector('#main-alert')) 
  };

export default Alert