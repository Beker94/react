import "./style.scss";

import { useEffect } from "react";
import { FormType } from "../../constants";

interface FormWrapperProps {
  modalType: string;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, modalType }) => {
  useEffect(() => {
    document.querySelector("body")?.classList.add("overflow-hidden");
    return () => {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    };
  }, []);

  const classList =
    modalType === FormType.DELETE ? "form-wrapper delete-form" : "form-wrapper";

  return (
    <div className={classList} id="wrapper">
      <div className="form-header">
        <h3>{modalType.toUpperCase()} MOVIE</h3>
        <div className="close"></div>
      </div>
      {children}
    </div>
  );
};

export default FormWrapper;
