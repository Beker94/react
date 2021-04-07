import "./style.scss";

interface ErrorFieldProps {
  error: any;
  submitCount: number;
}

const ErrorField: React.FC<ErrorFieldProps> = ({ error, submitCount }) => {
  const className = error && submitCount ? "error" : "no-error";
  return <div className={className}>{error}</div>;
};

export default ErrorField;
