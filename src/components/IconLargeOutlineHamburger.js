import PropTypes from "prop-types";
import "./IconLargeOutlineHamburger.css";

const IconLargeOutlineHamburger = ({ className = "" }) => {
  return (
    <div className={`iconlargeoutlinehamburger ${className}`}>
      <img
        className="iconlargeoutlinehamburger-child"
        loading="lazy"
        alt=""
        src="/line-1.svg"
      />
      <img
        className="iconlargeoutlinehamburger-item"
        loading="lazy"
        alt=""
        src="/line-2.svg"
      />
    </div>
  );
};

IconLargeOutlineHamburger.propTypes = {
  className: PropTypes.string,
};

export default IconLargeOutlineHamburger;
