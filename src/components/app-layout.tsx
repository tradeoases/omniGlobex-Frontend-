import TopBanner from "@/components/TopBanner";
import TopBar from "@/components/TopBar";
import NavBar from "@/components/NavBar";
import Sidemenu from "@/components/Sidemenu";
import Footer from "@/components/Footer";

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <main
      className={
        "relative flex min-h-screen flex-col items-start justify-start bg-white text-neutral-800"
      }
    >
      {/* The Page Content */}
      <section className="relative flex w-full flex-col items-start justify-start">
        <Sidemenu />
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
