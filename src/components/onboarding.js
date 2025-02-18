import "./onboarding.css";
import { Link,useNavigate } from "react-router-dom";

const Onboarding = () => {
  const navigate = useNavigate();
  const navigateHandler = (url) => {
    navigate(url);
    
  }
  return (
    <div className="onboarding">
      <img className="bg-img-icon" alt="" src="images//bg-img@2x.png" />
      <div className="onboarding-child" />
      <div className="onboarding-frame-parent" >
        <div className="discover-design-and-transfor-parent">
          <div className="discover-design-and" >
            Discover, Design, and Transform Your Space with Ease
          </div>
          <div className="continue-unleashing-your">
            Continue unleashing your creativity and bringing your dream
            interiors to life effortlessly.
          </div>
        </div>
        <div className="onboarding-buttons">
          <div className="onboarding-button" onClick={() => navigateHandler("/login")}>
            <img
              className="iconsmalloutlineleft-arrow"
              alt=""
              src="/images/iconsmalloutlineleft-arrow.svg"
            />
            <div  className="onboarding-button1">Login</div>
            <img
              className="iconsmalloutlineleft-arrow"
              alt=""
              src="/images/iconsmalloutlineright-arrow.svg"
            />
          </div>
          <div className="button1">
            <img
              className="iconsmalloutlineleft-arrow"
              alt=""
              src="/iamges/iconsmalloutlineleft-arrow1.svg"
            />
            <div className="login" ><Link target="page" className="text-white text-justify" to="http://provainteriordesign.com/"  >Explore Our Designs</Link></div>
            <img
              className="iconsmalloutlineexternal-ar"
              alt=""
              src="/images/iconsmalloutlineexternal-arrow.svg"
            />
          </div>
        </div>
      </div>
      <img className="prova-2-1" alt="" src="/images/prova--2-1@2x.png" />
    </div>
  );
};

export default Onboarding;
