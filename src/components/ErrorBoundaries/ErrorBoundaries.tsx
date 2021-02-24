import { Component } from "react";
import "./style.scss";

class ErrorBoundaries extends Component {
  state = {
    error: false,
  };

  componentDidCatch(error: Error, info: any) {
    console.log("error", error);
    console.log("info", info);
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return <div>ERROR</div>;
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundaries;
