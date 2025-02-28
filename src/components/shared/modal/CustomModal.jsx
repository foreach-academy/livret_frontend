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

  if (!isOpen) return null;

  return (
    <>

      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header bg-fe-blue d-flex justify-content-between">
              <h5 className="modal-title">{title}</h5>
              <Button buttonTitle="×" className="bg-danger" setAction={onClose} />
            </div>
            <div className="modal-body">
              {description && <p>{description}</p>}
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default CustomModal;
