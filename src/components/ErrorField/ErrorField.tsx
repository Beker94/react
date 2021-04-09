import "./style.scss";

interface ErrorFieldProps {
  error: any;
  touched: any;
}

const ErrorField: React.FC<ErrorFieldProps> = ({ error, touched }) => {
  const className = error && touched ? "error" : "no-error";
  return <div className={className}>{error}</div>;
};

export default ErrorField;
