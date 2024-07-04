import TopBanner from "@/components/TopBanner";
import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import Sidemenu from "@/components/Sidemenu";
import Footer from "@/components/Footer";
import { DashboardSideMenu } from "./dashboard-side-menu";

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
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
        <TopBanner />
        <TopBar />
        <NavBar />
        {children}
        <Footer />
      </section>
    </main>
  );
};

export default AppLayout;
