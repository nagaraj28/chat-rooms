import "./modal.css";
import CancelIcon from '@mui/icons-material/Cancel';
import { useContext } from "react";
import { Context } from "../../context/context";

const Modal: React.FC<{}> = ({children})=>{
    const {closeAllModals}:any = useContext(Context);

    return <div className="modal-ctnr" >
        <div className="modal-sub-ctnr">
            <div className="modal-heading">
                <span></span>
            <CancelIcon className="cancel-btn" onClick={()=>{closeAllModals();}}/>
            </div>
        {children}
        </div>
    </div>
} 
export default Modal;