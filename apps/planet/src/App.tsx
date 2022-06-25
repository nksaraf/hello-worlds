import { OrbitControls } from "@react-three/drei";
import { Leva } from "leva";
import "./App.css";
import BasicScene from "./components/BasicScene";
import CameraButtons from "./components/cameras/CameraButtons";
import PlanetConfigurator from "./components/planet/PlanetConfigurator";
import { useStore } from "./store";

function App() {
  const state = useStore();

  return (
    <div className="App">
      <Leva collapsed />
      <BasicScene>
        <OrbitControls />
        <PlanetConfigurator />
      </BasicScene>
      <div
        id="actions"
        style={{ position: "absolute", left: "1em", bottom: "1em" }}
      >
        <button>Spawn Player</button>
        <CameraButtons />
        <div id="spawner"></div>
      </div>
    </div>
  );
}

export default App;
