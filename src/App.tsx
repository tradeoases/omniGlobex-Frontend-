import "./App.css";
import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
    <Button variant="destructive">Destructive</Button>
    <ModeToggle />
    </>
  );
}

export default App;
