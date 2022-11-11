import "./App.css";
import { Route, Routes } from "react-router-dom";
import OngDetail from "./components/OngProfile/OngProfile";
import Home from "./components/Home/Home";
import Landing from "./components/Landing";
import Page404 from "./components/Page404";
import OngForm from "./components/OngForm/OngForm";
import UserForm from "./components/UserForm/UserFom";
import UserProfile from "./components/UserProfile/UserProfile";
import About from "./components/About/About";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Landing />} />
        <Route path="/createOng" element={<OngForm />} />
        <Route path="/Login" element={<UserForm />} />
        <Route path="/About" element={<About />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/:OngName/:post_id" element="" />
        <Route path= "/:id/profile" element={<OngDetail/>}/>
        <Route path='/users/:userId' element={<UserProfile/>}/>
      </Routes>
    </div>
  );
}

export default App;
