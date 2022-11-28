import logo from './logo.png'
import './nav-index.css'
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <nav className="flex justify-between lg:px-10 px-3 py-5 items-center w-full z-50">

      <div className={`flex group flex-row items-baseline`}>
        <span className={`lg:text-[2rem] text-sm sm:text-xl font-bold text-[#201008] dark:text-[#F0EEEE] group-hover:text-[#FF7272] transition-all duration-500 font-mono `}>Paws</span>
        <span className={`lg:text-[2rem] text-sm sm:text-xl font-bold text-[#FF7272] group-hover:text-[#201008] transition-all duration-500`}>Founding</span>
      </div>


      <div className="flex items-center">
        <div className="flex items-center">
          <a className="font-bold text-[#838788] dark:text-[#AFB3B4] link-underline link-underline-black lg:text-[1.7rem] lg:mr-[40px] text-sm sm:text-xl" href="/about">About Us</a>
        </div>
      </div>
      <Link to='/'>
        <div>
          <img className="lg:w-12 lg:h-12 w-11 h-8" src={logo} alt="LOGO" />
        </div>
      </Link>
    </nav>
  );
};

export default Navbar;
