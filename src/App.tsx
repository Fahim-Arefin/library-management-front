import { Outlet } from "react-router";
import Navbar from "./components/custom/Navbar";
import Footer from "./components/custom/Footer";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="pt-[64px] flex-grow px-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
