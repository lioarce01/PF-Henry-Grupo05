import logo from './logo.png'
import './nav-index.css'
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="flex justify-between px-10 py-5 items-center w-full z-50">

      <div className={`flex group flex-row`}>
        <span className={`text-[2rem] font-bold text-[#201008] group-hover:text-[#FF7272] transition-all duration-500 font-mono mt-[2px]`}>Paws</span>
        <span className={`text-[2rem] font-bold text-[#FF7272] group-hover:text-[#201008] transition-all duration-500`}>Founding</span>
      </div>


      <div className="flex items-center">
        <div className="flex items-center mr-20">
          <a className="font-bold mx-7 text-[#838788] link-underline link-underline-black lg:text-[1.2rem]" href="/about">About Us</a>
          <a className="font-bold mx-7 text-[#838788] link-underline link-underline-black lg:text-[1.2rem]" href="/#">Contact</a>
        </div>
      </div>
      <Link to='/'>
        <div>
          <img className="w-12 h-12" src={logo} alt="LOGO" />
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
