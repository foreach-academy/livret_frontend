import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../Button"

const CustomModal = ({ isOpen, onClose, title, description, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  return (
    <div className={`modal fade ${isOpen ? "show d-block" : "d-none"}`} tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header bg-fe-blue d-flex justify-content-between">
            <h5 className="modal-title">{title}</h5>
            <Button buttonTitle="×" className="close" setAction={onClose} />
          </div>
          <div className="modal-body">
            {description && <p>{description}</p>}
            {children}
          </div>
          {/* <div className="modal-footer">
            <Button buttonTitle="Fermer" className="btn btn-secondary" setAction={onClose} />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
