import IconLargeOutlineHamburger from "./IconLargeOutlineHamburger";
import PropTypes from "prop-types";
import "./Root.css";

const Root = ({ className = "" }) => {
  return (
    <header className={`root ${className}`}>
      <div className="hamburger-menu">
        <IconLargeOutlineHamburger />
      </div>
      <img
        className="iconlargeoutlinenotificatio"
        loading="lazy"
        alt=""
        src="/iconlargeoutlinenotification.svg"
      />
    </header>
  );
};

Root.propTypes = {
  className: PropTypes.string,
};

export default Root;
