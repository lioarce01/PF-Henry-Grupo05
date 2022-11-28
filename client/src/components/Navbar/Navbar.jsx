import { Link } from "react-router-dom"
import { BsSun } from "react-icons/bs"
import { HiMoon } from "react-icons/hi"
import { FiHome } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import ProfilePanel from "./ProfilePanel"
import { switchTheme } from "../../redux/slices/manageTheme"

const Navbar = () => {
	const dispatch = useDispatch()
	const { darkmode } = useSelector(state => state.localStorage.manageTheme)
	const toggleDarkMode = () => dispatch(switchTheme())

	return (
		<div className="relative z-49 flex flex-row items-center w-full h-20 px-4 bg-white rounded-b-lg dark:bg-[#1B1A1F] duration-300">
			<div className="flex flex-row justify-between w-full">
				<div className="flex flex-row items-center">
					<div className="flex flex-row items-center justify-center ml-[10px]">
						<Link to="/">
							<div className="flex group flex-row">
								<span
									className={`text-[1.5rem] font-bold text-black dark:text-[#f0eeee]
										group-hover:text-[#FF7272] transition-all duration-500 font-mono mt-[2px]`}
								>
									Paws
								</span>
								<span
									className={`text-[1.5rem] font-bold text-[#FF7272] dark:group-hover:text-white
										group-hover:text-[#201008] transition-all duration-500`}
								>
									Founding
								</span>
							</div>
						</Link>
					</div>

					<div className="ml-4 lg:ml-[100px] md:ml-[120px] hover:bg-[#FF7272] p-[7px] rounded-full transition duration-300 dark:hover:bg-[#E06161]">
						<Link to="/home">
							<FiHome className="text-[#201008] w-[25px] h-[25px] dark:text-white" />
						</Link>
					</div>
				</div>

				<div className="flex flex-row items-center">
					<div className="lg:mr-[250px]">
						<button
							className="hover:bg-[#FF7272] p-[5px] rounded-full transition duration-300 dark:hover:bg-[#E06161]"
							onClick={toggleDarkMode}
						>
							{darkmode ? (
								<BsSun className="text-xl text-[#201008] w-[25px] h-[25px] hover:text-white dark:text-[#F0EEEE]" />
							) : (
								<HiMoon className="text-xl text-[#201008] w-[25px] h-[25px]" />
							)}
						</button>
					</div>

					<ProfilePanel />
				</div>
			</div>
		</div>
	)
}

export default Navbar
