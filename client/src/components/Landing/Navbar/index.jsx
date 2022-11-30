import logo from './logo.png'
import './nav-index.css'
import { BsSun } from "react-icons/bs"
import { HiMoon } from "react-icons/hi"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"
import { switchTheme } from "../../../redux/slices/manageTheme"

const Navbar = () => {
  const dispatch = useDispatch()
	const { darkmode } = useSelector(state => state.localStorage.manageTheme)
	const toggleDarkMode = () => dispatch(switchTheme())

  return (
    <div className="flex justify-between lg:px-10 px-3 py-5 items-center w-full lg:w-full">

      <div className="flex group flex-row">
        <span className={`lg:text-[1.5rem] text-sm sm:text-xl font-bold text-[#201008] dark:text-[#F0EEEE] group-hover:text-[#FF7272] transition-all duration-500 font-mono mt-[2px]`}>Paws</span>
        <span className={`lg:text-[1.5rem] text-sm sm:text-xl font-bold text-[#FF7272] group-hover:text-[#201008] transition-all duration-500`}>Founding</span>
      </div>


      <div className="flex xl:w-1/3 justify-end">
          <a className="font-bold text-[#838788] dark:text-[#d8d8d8] link-underline link-underline-black lg:text-[1.5rem]" href="/about">About Us</a>
      </div>

      <div className="flex gap-10">
            <button
              className="hover:bg-[#FF7272] py-2 px-3 rounded-full transition duration-300 dark:hover:bg-[#E06161]"
              onClick={toggleDarkMode}
            >
              {darkmode ? (
                <BsSun className="text-xl text-[#838788] w-[25px] h-[25px] hover:text-white dark:text-[#F0EEEE]" />
              ) : (
                <HiMoon className="text-xl text-[#838788] w-[25px] h-[25px]" />
                )}
            </button>

      
        <Link to='/'>
          <div>
            <img className="lg:w-12 lg:h-12 w-[25px] h-[25px]" src={logo} alt="LOGO" />
          </div>
        </Link>
      </div>

    </div>
  );
};

export default Navbar;
