import "./App.css";
import { Route, Routes } from "react-router-dom";
import OngDetail from "./components/OngProfile/OngProfile";
import Home from "./components/Home/Home";
import Landing from "./components/Landing";


function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="*" element='' />
        <Route path="/" element={<Landing />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/:OngName/:post_id" element="" />
        <Route path= "/:OngId/profile" element={<OngDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
