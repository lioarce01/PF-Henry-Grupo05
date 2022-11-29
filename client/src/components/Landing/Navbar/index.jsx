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
    <nav className="flex justify-between lg:px-10 px-3 py-5 items-center w-full z-50">

      <div className={`flex group flex-row items-baseline`}>
        <span className={`lg:text-[2rem] 2xl:text-[3.5rem] text-sm sm:text-xl font-bold text-[#201008] dark:text-[#F0EEEE] group-hover:text-[#FF7272] transition-all duration-500 font-mono `}>Paws</span>
        <span className={`lg:text-[2rem] 2xl:text-[3.5rem] text-sm sm:text-xl font-bold text-[#FF7272] group-hover:text-[#201008] transition-all duration-500`}>Founding</span>
      </div>


      <div className="flex items-center">
        <div className="flex items-center">
          <a className="font-bold mx-7 text-[#838788] link-underline link-underline-black lg:text-[1.2rem] 2xl:text-[2.5rem] 2xl:mr-[250px]" href="/about">About Us</a>
        </div>
      </div>
      <div className='flex flex-rox items-center lg:mr-4'>
      <div className="lg:mr-4">
						<button
							className="hover:bg-[#FF7272] p-[5px] rounded-full transition duration-300 dark:hover:bg-[#E06161]"
							onClick={toggleDarkMode}
						>
							{darkmode ? (
								<BsSun className="text-xl text-[#201008] w-[25px] h-[25px] 2xl:w-14 2xl:h-14 hover:text-white dark:text-[#F0EEEE]" />
							) : (
								<HiMoon className="text-xl text-[#201008] w-[25px] h-[25px] 2xl:w-14 2xl:h-14" />
							)}
						</button>
			</div>

      <Link to='/'>
        <div>
          <img className="lg:w-12 lg:h-12 2xl:w-14 2xl:h-14 w-[25px] h-[25px]" src={logo} alt="LOGO" />
        </div>
      </Link>
      </div>
    </nav>
  );
};

export default Navbar;
