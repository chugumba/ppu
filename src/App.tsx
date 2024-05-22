import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Выводит Greeting из src-tauri в greetMsg
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
     
      <div className="row">
        html test
      </div>
      
    </div>
  );
}

export default App;
