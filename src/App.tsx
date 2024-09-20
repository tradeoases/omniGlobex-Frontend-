import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";
import TopBanner from "./components/TopBanner";

function App() {
  return (
    <>
      <TopBanner />
      <Button variant="destructive">Destructive</Button>
      <ModeToggle />
    </>
  );
}

export default App;
