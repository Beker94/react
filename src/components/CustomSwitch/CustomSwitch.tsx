import { useEffect } from "react";
import { Switch, useHistory } from "react-router";

const NotFoundPage: React.FC = () => {
  const history = useHistory();
  useEffect(() => {
    history.push("/notfoundpage");
  }, []);
  return null;
};

const CustomSwitch: React.FC = (props) => {
  const { children } = props;
  return (
    <Switch>
      {children}
      <NotFoundPage />
    </Switch>
  );
};

export default CustomSwitch;
