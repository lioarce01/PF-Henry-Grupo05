import "./App.css";
import { Route, Routes } from "react-router-dom";
import OngDetail from "./components/OngProfile/index.jsx";
import Home from "./components/Home/Main/Home";
import Landing from "./components/Landing";
import Page404 from "./components/Page404";
import OngForm from "./components/OngForm/OngForm";
import UserForm from "./components/UserForm/UserFom";
import UserProfile from "./components/UserProfile/UserProfile";
import MercadoPago from "./components/MercadoPago/MercadoPago";
import About from "./components/About/About";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadUser from "./components/LoadUser";
import { useSelector } from "react-redux";
import LearnMore from "./components/LearnMore/LearnMore";
import ProtectRoute from "./components/TicketsPage/ProtectRoute";

function App() {
  LoadUser()
  const { darkmode } = useSelector(state => state.localStorage.manageTheme)
  return (
    <div className={darkmode ? "App dark": "App light"}>
      
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Landing />} />
        <Route path="/createOng" element={<OngForm />} />
        <Route path="/updateUser" element={<UserForm />} />
        <Route path="/learnMore" element={<LearnMore/>} />
        <Route path="/About" element={<About />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/tickets" element={<ProtectRoute />} />
        <Route path="/:OngName/:post_id" element="" />
        <Route path="/mp" element={<MercadoPago />} />
        <Route path= "/:id/profile" element={<OngDetail/>}/>
        <Route exact path='/users/:userId' element={<UserProfile/>}/>
        <Route exact path='/admin' element={
        <ProtectedRoute>
          <AdminDashboard/>
        </ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
