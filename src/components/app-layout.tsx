// import TopBanner from "@/components/TopBanner";
import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import Sidemenu from "@/components/Sidemenu";
import Footer from "@/components/Footer";
import { DashboardSideMenu } from "./dashboard-side-menu";
import useScrollToTop from "@/hooks/use-scroll-top";

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  useScrollToTop();
  return (
    <main
      className={
        "relative flex min-h-screen flex-col items-start justify-start bg-light text-neutral-800"
      }
    >
      {/* The Page Content */}
      <section className="relative flex w-full flex-col items-start justify-start">
        <Sidemenu />
        <DashboardSideMenu />
        {/* <TopBanner /> */}
        <NavBar />
        <TopBar />
        {children}
        <Footer />
      </section>
    </main>
  );
};

export default AppLayout;
