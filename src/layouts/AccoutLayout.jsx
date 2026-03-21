import { Outlet } from "react-router";
import NavBar from "../component/NavBar";
import { Footer } from "../component/Footer";
import StoryPortal from "../portal/StoryPortal";

const AccoutLayout = () => {
 
  return (
    <div className="h-[90vh] w-full flex flex-col ">
      <header className="h-[6%] w-full">
        <NavBar />
      </header>
      <main className="h-[95%] overflow-scroll">
        <Outlet />
      </main>
      <footer className="h-[5%] w-full">
        <Footer />
      </footer>
      
    </div>
  );
};

export default AccoutLayout;
