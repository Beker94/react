import "./style.scss";

import { useEffect } from "react";
import { Modal } from "../../interfaces";
import { FormType } from "../../constants";

interface FormWrapperProps {
  children: any;
  modalState: Modal;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, modalState }) => {
  useEffect(() => {
    document.querySelector("body")?.classList.add("overflow-hidden");
    return () => {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    };
  }, []);

  const classList =
    modalState.type === FormType.DELETE
      ? "form-wrapper delete-form"
      : "form-wrapper";

  return (
    <div className={classList} id="wrapper">
      <div className="form-header">
        <h3>{modalState.type.toUpperCase()} MOVIE</h3>
        <div className="close"></div>
      </div>
      {children}
    </div>
  );
};

export default FormWrapper;
