import "./App.css";
import { Route, Routes } from "react-router-dom";
import OngDetail from "./components/OngProfile/OngProfile";
import Home from "./components/Home/Home";
import Landing from "./components/Landing";
import Page404 from "./components/Page404";
import OngForm from "./components/OngForm/OngForm";
import UserForm from "./components/UserForm/UserFom";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Landing />} />
        <Route path="/createOng" element={<OngForm />} />
        <Route path="/Login" element={<UserForm />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/:OngName/:post_id" element="" />
        <Route path= "/:OngId/profile" element={<OngDetail/>}/>
      </Routes>
    </div>
  );
}

export default App;
