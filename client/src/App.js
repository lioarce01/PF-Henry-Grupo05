import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element='' />
        <Route path="/" element='' />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/landing" element="" />
        <Route path="/:OngName/:post_id" element="" />
      </Routes>
    </div>
  );
}

export default App;
