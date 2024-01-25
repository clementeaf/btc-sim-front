import { useState } from "react";
import Simulator from "./components/Simulator/Simulator";
import SpreadsTable from "./components/SpreadsTable/SpreadsTable";

function App() {
  const [showView, setShowView] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <h1 className="text-2xl">Buda-Test</h1>
      <div className="flex w-[350px] sm:w-[20%] justify-between items-center">
        <button onClick={() => setShowView(true)} className={`${showView ? "text-black" : "text-black/30"}`}>Table</button>
        <button onClick={() => setShowView(false)} className={`${!showView ? "text-black" : "text-black/30" }`}>Simulador</button>
      </div>
      <div className="flex w-full h-full items-center justify-center px-10">
        {
          showView ? <SpreadsTable /> : <Simulator />
        }
      </div>
    </div>
  );
}

export default App;
