import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import NavBar from "./widgets/NavBar";
import HomeScreen from "./screens/HomeScreen";
import "./App.css";

function App() {
    const [selected, setSelected] = useState(0);
    const screens = [
        <HomeScreen />,
    ];
    return (
        <div className="container">
            <NavBar />
            {screens[selected]}
        </div>
    );
}

export default App;
