import { Outlet } from "react-router";
import NavBar from "../component/NavBar";
import { Footer } from "../component/Footer";

const AccoutLayout = () => {
 
  return (
    <div className="h-[100dvh] w-full flex flex-col ">
      <header className="h-[6%] w-full">
        <NavBar />
      </header>
      <main className="h-[95%] overflow-scroll">
        <Outlet />
      </main>
      <footer className="h-[8%] py-2 w-full">
        <Footer />
      </footer>
      
    </div>
  );
};

export default AccoutLayout;
