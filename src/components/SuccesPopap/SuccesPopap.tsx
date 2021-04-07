import { useRef } from "react";
import { useDispatch } from "react-redux";
import { FormType } from "../../constants";
import { useOutsideClickHook } from "../../hooks/outsideClickHook";

import { closeSuccessForm } from "../../redux/form/actions/form.actions";
import { closeForm } from "../../redux/modal/actions/modal.actions";

import "./style.scss";

interface SuccesPopapProps {
  modalType: string | null;
}

const SuccesPopap: React.FC<SuccesPopapProps> = ({ modalType }) => {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  useOutsideClickHook(wrapperRef, () => {
    dispatch(closeSuccessForm());
    dispatch(closeForm());
  });
  let succecType = "";
  switch (modalType) {
    case FormType.DELETE:
      succecType = "deleted";
      break;
    case FormType.EDIT:
      succecType = "edited";
      break;
    case FormType.ADD:
      succecType = "added";
      break;
  }

  return (
    <div className="popap-form" ref={wrapperRef}>
      <div className="form-header">
        <div
          className="close"
          onClick={() => {
            dispatch(closeSuccessForm());
            dispatch(closeForm());
          }}
        ></div>
      </div>
      <h2>CONGRATULATIONS!</h2>
      <h4>The movie has been {succecType}.</h4>
    </div>
  );
};

export default SuccesPopap;
