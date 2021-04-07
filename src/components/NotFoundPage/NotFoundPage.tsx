import { useHistory } from "react-router";

import "./style.scss";

const NotFoundPage: React.FC = () => {
  const history = useHistory();

  return (
    <div className="not-found">
      <h1>PAGE NOT FOUND</h1>
      <img
        src="https://blog.vverh.digital/wp-content/uploads/2020/06/oblojka-404.png"
        alt="404"
      />
      <button  onClick={() => history.push("/")}>GO BACK TO HOME</button>
    </div>
  );
};

export default NotFoundPage;
