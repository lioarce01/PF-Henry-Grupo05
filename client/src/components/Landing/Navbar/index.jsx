import logo from './logo.png'
import './nav-index.css'
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="flex justify-between px-10 py-5 items-center w-full z-50">
  
      <div className="flex ml-5">
        <h1 className="flex flex-row font-bold lg:text-[2rem] text-[#3D190C]">Paws</h1>
        <h1 className="flex flex-row font-bold lg:text-[2rem] text-[#F87171]">Founding</h1>
      </div>


      <div className="flex items-center">
        <div className="flex items-center mr-20">
          <a className="font-bold mx-7 text-[#000] link-underline link-underline-black lg:text-[1.2rem]" href="/about">About Us</a>
          <a className="font-bold mx-7 text-[#000] link-underline link-underline-black lg:text-[1.2rem]" href="/#">Contact</a>
        </div>
      </div>
      <Link to='/'>
      <div>
        <img className="w-12 h-12"  src={logo} alt="LOGO" />
      </div>
      </Link>
    </nav>
  );
};

export default Navbar;
