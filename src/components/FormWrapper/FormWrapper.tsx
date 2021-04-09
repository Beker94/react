import "./style.scss";

import { useEffect } from "react";
import { DeleteForm } from "../DeleteForm";
import { Film } from "../../interfaces";
import { FilmForm } from "../FilmForm";
import { SuccesPopap } from "../SuccesPopap";
import { FormType } from "../../constants";

interface FormWrapperProps {
  film: Film;
  modalType: string | null;
  successSubmit: boolean;
  isOpen: boolean;
}

const FormWrapper: React.FC<FormWrapperProps> = ({
  film,
  modalType,
  successSubmit,
  isOpen,
}) => {
  useEffect(() => {
    if (isOpen || successSubmit) {
      document.querySelector("#wrapper")?.classList.remove("form-closed");
      document.querySelector("body")?.classList.add("overflow-hidden");
    } else {
      document.querySelector("#wrapper")?.classList.add("form-closed");
      document.querySelector("body")?.classList.remove("overflow-hidden");
    }
  }, [isOpen, successSubmit]);

  function renderSwitch(
    modalType: string | null,
    film: Film,
    successSubmit: boolean
  ) {
    switch (modalType) {
      case FormType.DELETE:
        return successSubmit ? (
          <SuccesPopap modalType={modalType} />
        ) : (
          <DeleteForm film={film} modalType={modalType} />
        );

      case FormType.ADD:
        return successSubmit ? (
          <SuccesPopap modalType={modalType} />
        ) : (
          <FilmForm
            film={film}
            modalType={modalType}
            successSubmit={successSubmit}
          />
        );

      case FormType.EDIT:
        return successSubmit ? (
          <SuccesPopap modalType={modalType} />
        ) : (
          <FilmForm
            film={film}
            modalType={modalType}
            successSubmit={successSubmit}
          />
        );

      default:
        return <></>;
    }
  }

  return (
    <div className="form-wrapper" id="wrapper">
      {renderSwitch(modalType, film, successSubmit)}
    </div>
  );
};

export default FormWrapper;
