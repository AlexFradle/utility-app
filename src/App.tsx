import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import NavBar from "./widgets/NavBar";
import HomeScreen from "./screens/HomeScreen";
import "./App.css";
import TodoScreen from "./screens/TodoScreen";
import SettingsScreen from "./screens/SettingsScreen";

function App() {
    const [selected, setSelected] = useState(0);
    const screens: [string, JSX.Element][] = [
        ["Dashboard", <HomeScreen />],
        ["TODO", <TodoScreen />],
        ["Settings", <SettingsScreen />],
    ];
    return (
        <div className="container">
            <NavBar 
                selectedIndex={selected} 
                titles={screens.map(s => s[0])} 
                indCallback={newInd => {setSelected(newInd)}}
            />
            {screens[selected][1]}
        </div>
    );
}

export default App;
