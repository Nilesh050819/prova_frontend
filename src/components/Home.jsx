import { Outlet } from "react-router";
import Header from "./appComponents/Header";
import Navbar from "./appComponents/Navbar";
const Home = () => {
   
    return (
        <>
          {/* <Header /> */}
            <Outlet />
        </>
    )
}

export default Home;