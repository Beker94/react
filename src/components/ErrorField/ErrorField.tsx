import "./style.scss";

interface ErrorFieldProps {
  error: any;
}

const ErrorField: React.FC<ErrorFieldProps> = ({ error }) => {
  const className = error ? "error" : "no-error";
  return <div className={className}>{error}</div>;
};

export default ErrorField;
