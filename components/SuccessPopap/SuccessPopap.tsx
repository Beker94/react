import { useRef } from "react";
import { useDispatch } from "react-redux";
import { messageObject } from "../../constants";
import { useOutsideClickHook } from "../../hooks/outsideClickHook";

import { closeSuccessForm } from "../../redux/form/actions/form.actions";
import { closeForm } from "../../redux/modal/actions/modal.actions";

interface SuccessPopapProps {
  modalType: string | null;
}

const SuccessPopap: React.FC<SuccessPopapProps> = ({ modalType }) => {
  const wrapperRef = useRef(null);
  const dispatch = useDispatch();
  useOutsideClickHook(wrapperRef, () => {
    dispatch(closeSuccessForm());
    dispatch(closeForm());
  });
  const successType = messageObject[modalType as keyof typeof messageObject];

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
      <h4>The movie has been {successType}.</h4>
    </div>
  );
};

export default SuccessPopap;
