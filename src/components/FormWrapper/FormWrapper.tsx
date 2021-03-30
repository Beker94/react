import "./style.scss";

import { useEffect } from "react";

interface FormWrapperProps {
  modalType: string | null;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, modalType }) => {
  useEffect(() => {
    document.querySelector("body")?.classList.add("overflow-hidden");
    return () => {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="form-wrapper" id="wrapper">
      {children}
    </div>
  );
};

export default FormWrapper;
