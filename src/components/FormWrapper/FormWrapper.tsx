import "./style.scss";

import { useEffect } from "react";

interface FormWrapperProps {
  closeModal(): void;
  children: any;
}

const FormWrapper: React.FC<FormWrapperProps> = ({ children, closeModal }) => {
  useEffect(() => {
    document.querySelector("body")?.classList.add("overflow-hidden");
    return () => {
      document.querySelector("body")?.classList.remove("overflow-hidden");
    };
  }, []);

  // const closeModalWindow = useCallback(
  //   (e) => {
  //     if (e.target.id === "wrapper") {
  //       closeModal();
  //     }
  //   },
  //   [closeModal]
  // );

  return (
    <div className="form-wrapper" id="wrapper">
      <div className="close" onClick={closeModal}></div>
      {children}
    </div>
  );
};

export default FormWrapper;
