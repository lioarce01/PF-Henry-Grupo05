import "./App.css";
import { Route, Routes } from "react-router-dom";
import OngDetail from "./components/OngProfile/OngProfile";
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
        <Route path= "/:OngId/profile" element={<OngDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
