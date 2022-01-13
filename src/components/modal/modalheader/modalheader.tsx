import { ModalHeaderInterface } from "./modalheaderInterface";
import "./modalheading.css";

const ModalHeader: React.FC<ModalHeaderInterface> = ({heading}):JSX.Element=>{
    return <div>
        <h2 className="modal-heading-txt">{heading}</h2>
    </div>
}
export default ModalHeader;