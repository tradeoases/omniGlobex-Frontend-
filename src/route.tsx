import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/not-found-page";
import HomePage from "./pages/home-page";
import { AboutPage } from "./pages/about-page";

export default function RoutesConfig() {
  // const { id } = useParams();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
