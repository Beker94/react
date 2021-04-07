import "./style.scss";

import { useEffect } from "react";

const FormWrapper: React.FC = ({ children }) => {
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
