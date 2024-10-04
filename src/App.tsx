import "./App.css";
import { DashboardSideMenu } from "./components/dashboard-side-menu";
import NavBar from "./components/NavBar";
import TopBar from "./components/TopBar";
import Footer from "./components/Footer";
import Sidemenu from "./components/Sidemenu";

interface Props {
  children: React.ReactNode;
}

const App: React.FC<Props> = ({ children }) => {
  return (
    <>
      <main
        className={
          "relative flex min-h-screen flex-col items-start justify-start bg-light text-neutral-800"
        }
      >
        
        <section className="relative flex w-full flex-col items-start justify-start">
          <Sidemenu />
          {/* <TopBanner /> */}
          <DashboardSideMenu />
          {/* <Button variant="destructive">Destructive</Button> */}
          {/* <ModeToggle /> */}
          <NavBar />
          <TopBar />
          {children}
          <Footer />
        </section>
      </main>
    </>
  );
};

export default App;
