const Button = ({ children, onClick, className, disabled }) => (
  <button
    className={`button ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
