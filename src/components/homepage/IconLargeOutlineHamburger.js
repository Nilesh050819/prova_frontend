import PropTypes from "prop-types";
import styles from "./IconLargeOutlineHamburger.module.css";

const IconLargeOutlineHamburger = ({ className = "" }) => {
  return (
    <div className={[styles.iconlargeoutlinehamburger, className].join(" ")}>
      <img
        className={styles.iconlargeoutlinehamburgerChild}
        loading="lazy"
        alt=""
        src="/line-1.svg"
      />
      <img
        className={styles.iconlargeoutlinehamburgerItem}
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
