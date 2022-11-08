import "./App.css";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="*" element='' />
        <Route path="/" element='' />
        <Route exact path="/home" element=""/>
        <Route exact path="/landing" element="" />
        <Route path="/:OngName/:post_id" element="" />
      </Routes>
    </div>
  );
}

export default App;
