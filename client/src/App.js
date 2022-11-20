import "./App.css";
import { Route, Routes } from "react-router-dom";
import OngDetail from "./components/OngProfile/OngProfile";
import Home from "./components/Home/Home";
import Landing from "./components/Landing";
import Page404 from "./components/Page404";
import OngForm from "./components/OngForm/OngForm";
import UserForm from "./components/UserForm/UserFom";
import UserProfile from "./components/UserProfile/UserProfile";
import MercadoPago from "./components/MercadoPago/MercadoPago";
import About from "./components/About/About";
import { useAuth0 } from "@auth0/auth0-react"
import { useCreateUserMutation } from "./redux/api/users";
import { useEffect } from "react";
import { setUserAction } from "./redux/slices/manageUsers/actions";
import { useDispatch } from "react-redux";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user, isAuthenticated } = useAuth0()
  const dispatch = useDispatch()
  const [createUser, {}] = useCreateUserMutation();

  const loadUser = async () => {
    if (isAuthenticated) {
      const {message, newUser} = await createUser({
            name: user.nickname,
            email: user.email,
            profilePic: user.picture
      }).unwrap()
      dispatch(setUserAction(newUser, isAuthenticated))
    }
  }

  useEffect(() => {
    loadUser()
  }, [isAuthenticated, user])

  return (
    <div className="App">
      
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Landing />} />
        <Route path="/createOng" element={<OngForm />} />
        <Route path="/updateUser" element={<UserForm />} />
        <Route path="/About" element={<About />} />
        <Route exact path="/home" element={<Home />} />
        <Route path="/:OngName/:post_id" element="" />
        <Route path="/mp" element={<MercadoPago />} />
        <Route path= "/:id/profile" element={<OngDetail/>}/>
        <Route exact path='/users/:userId' element={<UserProfile/>}/>
        <Route exact path='/admin' element={
        <ProtectedRoute>
          <AdminDashboard isAuth={isAuthenticated}/>
        </ProtectedRoute>}/>
      </Routes>
    </div>
  );
}

export default App;
