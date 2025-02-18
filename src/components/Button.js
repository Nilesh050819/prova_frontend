import PropTypes from "prop-types";
import "./Button.css";

const Button = ({
  className = "",
  content = "View all",
  leftIcon = false,
  rightIcon = false,
}) => {
  return (
    <div className={`button1 ${className}`}>
      {leftIcon && (
        <img
          className="iconsmalloutlineleft-arrow1"
          alt=""
          src="/iconsmalloutlineleft-arrow.svg"
        />
      )}
      <a className="login1">{content}</a>
      {rightIcon && (
        <img
          className="iconsmalloutlineright-arrow1"
          alt=""
          src="/iconsmalloutlineright-arrow.svg"
        />
      )}
    </div>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  content: PropTypes.string,
  leftIcon: PropTypes.bool,
  rightIcon: PropTypes.bool,
};

export default Button;
