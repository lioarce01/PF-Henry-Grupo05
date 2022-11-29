// hooks and components
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import HomeProfilePanel from "./HomeProfilePanel"
import { carouselSheltersAction } from '../../../redux/slices/manageShelters/actions'
import { switchTheme } from "../../../redux/slices/manageTheme"

// react icons
import { MdPets } from "react-icons/md"
import { HiMoon } from "react-icons/hi"
import { FaBook } from "react-icons/fa"
import { AiFillStar } from "react-icons/ai"
import { TbReportMoney } from "react-icons/tb"
import { BsPeopleFill, BsSun } from "react-icons/bs"
import { BsChevronBarLeft, BsChevronBarRight, BsChevronBarUp, BsChevronBarDown } from "react-icons/bs"

const SubscriptorsBar = () => {
	const dispatch = useDispatch()

	// these are for changing and getting carousel display state
	const { carousel } = useSelector(state => state.manageShelters)
	const [displaying, setDisplaying] = useState('All')

	// getter for user details 
	const { userDetail } = useSelector(state => state.localStorage.userState)

	// if user does not have a shelter, this img loads as background for the shelter banner
	const defaultImg = 'https://i.pinimg.com/originals/a9/18/2e/a9182e7e917d6f47365fbee3fea5af56.png'

	// handles this bar's expansion state
	const [expanded, setExpanded] = useState(window.innerWidth > 1700 ? true : false)
	const toggleExpanded = () => setExpanded(!expanded)

	// handles dark mode toggle in the website
	const { darkmode } = useSelector(state => state.localStorage.manageTheme)
	const toggleDarkMode = () => dispatch(switchTheme())

	// handles changes in the carousel render state
	const handleRender = render => dispatch(carouselSheltersAction(render))

	useEffect(() => {
		setDisplaying(carousel[0]?.toUpperCase() + carousel?.substring(1))
	}, [carousel])

	useEffect(() => {
		setDisplaying('All')
	}, [])

	return (
		<div className={`flex h-screen bg-white dark:bg-[#1b1a1f] overflow-y-hidden ${expanded ? "md:w-[350px] xsm:w-screen xsm:h-screen xsm:fixed xsm:z-50 sm:static" : "xsm:h-0 sm:h-screen sm:flex w-[140px]"} transition-all duration-300`}>
			<div className={`${expanded ? "md:w-[325px] xsm:w-screen sm:pr-[20px] xsm:pr-0" : "w-[140px]"} h-screen mt-[30px] flex flex-col`}>
				<div className={expanded && "ml-[25px]"}>
					<div className="flex w-full">
						<div className="w-full">
							<Link to="/">
								<div className={`flex group ${expanded ? "flex-row" : "flex-col text-center"}`}>
									<span className={`text-[1.5rem] font-bold text-[#201008] dark:text-[#f0eeee]
										group-hover:text-[#FF7272] transition-all duration-500 font-mono mt-[2px]`}>Paws</span>
									<span className={`text-[1.5rem] font-bold text-[#FF7272] dark:group-hover:text-white
										group-hover:text-[#201008] transition-all duration-500`}>Founding</span>
								</div>
							</Link>
						</div>

						<button onClick={toggleExpanded} className=
							{`xsm:hidden sm:flex text-xl ml-auto bg-[#EFF0F3] dark:bg-[#27242C] absolute items-center rounded-full ${expanded ? "sm:right-[20px] md:right-auto md:left-[320px] p-[15px]" : "left-[125px] p-[5px]"} transition-all duration-300`}>
							{expanded ? <BsChevronBarLeft className="dark:text-white" /> : <BsChevronBarRight className="dark:text-white" />}
						</button>
					</div>

					<div className={`mt-[45px] ${!expanded ? "ml-[40px]" : "sm:ml-[20px] md:ml-[10px]"}`}>
						<div className="flex">
							<HomeProfilePanel expanded={expanded} />
						</div>
					</div>
				</div>

				<div className={expanded && `xsm:flex sm:flex-row md:flex-col xsm:flex-row xsm:ml-[40px] md:ml-[10px]`}>
					<div className={`xsm:mt-[20px] sm:mt-[45px] ${expanded && "sm:ml-[45px]"}`}>
						<h2 className={`text-[0.9rem] text-[#ACB1B2] dark:text-[#8b9091] font-semibold ${!expanded && "text-center"}`}>Displaying: {!expanded && <br />} {displaying}</h2>
						<ul className="mt-[10px]">
							<li>
								<button onClick={() => handleRender('all')} className={`flex flex-row group ${!expanded && 'mx-auto'}`}>
									<MdPets className={`flex text-[#bb7070] group-hover:text-[#e76f6f] dark:text-[#f56666] dark:group-hover:text-[#fa5656] 
									transition-all duration-300 ${expanded ? 'sm:text-2xl xsm:text-xl' : 'text-4xl mx-auto'}`} />
									{expanded && <p className="flex xsm:ml-[10px] sm:ml-[15px] text-[#979b9c] dark:text-[#afb3b4] sm:text-[1.1rem] xsm:text-[0.9rem] font-semibold group-hover:underline">All Shelters</p>}
								</button>
							</li>

							<li className="mt-[10px]">
								<button onClick={() => handleRender('following')} className={`flex flex-row group ${!expanded && 'mx-auto'}`}>
									<AiFillStar className={`text-2xl text-[#bb7070] flex group-hover:text-[#e76f6f] dark:text-[#f56666] dark:group-hover:text-[#fa5656] 
									transition-all duration-300 ${expanded ? 'sm:text-2xl xsm:text-xl' : 'text-4xl mx-auto'}`} />
									{expanded && <p className="flex xsm:ml-[10px] sm:ml-[15px] text-[#979b9c] dark:text-[#afb3b4] sm:text-[1.1rem] xsm:text-[0.9rem] font-semibold group-hover:underline">Followed Shelters</p>}
								</button>
							</li>
						</ul>
					</div>

					<div className={`sm:mt-[45px] ${expanded && "md:ml-[45px] sm:ml-auto sm:mr-[140px] xsm:ml-[35px] xsm:mt-[20px]"}`}>
						<h2 className={`text-[0.9rem] text-[#ACB1B2] dark:text-[#8b9091] font-semibold ${!expanded && "text-center"}`}>Specifics</h2>
						<ul className="mt-[5px]">
							<li className="mt-[10px]">
								<Link to='/termsAndConditions'>
									<button className={`flex flex-row group ${!expanded && 'mx-auto'}`}>
										<FaBook className={`text-[#bb7070] flex mt-[2px] group-hover:text-[#e76f6f] dark:text-[#f56666] dark:group-hover:text-[#fa5656]
										transition-all duration-300 ${expanded ? 'sm:text-2xl xsm:text-xl' : 'text-4xl mx-auto'}`} />
										{expanded && <p className="flex xsm:ml-[10px] sm:ml-[15px] text-[#979b9c] dark:text-[#afb3b4] sm:text-[1.1rem] xsm:text-[0.9rem] font-semibold group-hover:underline">Conditions</p>}
									</button>
								</Link>
							</li>

							<li className="mt-[10px]">
								<button className={`group ${!expanded && 'flex mx-auto'}`}>
									<Link to='/about' className="flex flex-row">
									<BsPeopleFill className={`text-[#bb7070] flex mt-[2px] group-hover:text-[#e76f6f] dark:text-[#f56666] dark:group-hover:text-[#fa5656]
									transition-all duration-300 ${expanded ? 'sm:text-2xl xsm:text-xl' : 'text-4xl mx-auto'}`} />
									{expanded && <p className="w-[100px] flex xsm:ml-[10px] sm:ml-[15px] text-[#979b9c] dark:text-[#afb3b4] sm:text-[1.1rem] xsm:text-[0.9rem] font-semibold group-hover:underline">About Us</p>}
									</Link>
								</button>
							</li>
						</ul>
					</div>
				</div>

				<Link to={userDetail?.Shelter?.length > 0 ? `/${userDetail.Shelter[0].id}/profile` : "/createOng"}>
					<div className={` ${expanded ? "sm:ml-[45px] sm:mt-[100px] xsm:mt-[50px] md:mr-[0px] sm:mr-[30px] xsm:mr-[40px] xsm:ml-[35px]" : "mx-[15px] mt-[50px]"} transition-all duration-300`}>
						<div className="xsm:h-[140px] sm:h-[200px] rounded-[20px] bg-gradient-to-bl from-[#FF7272] to-[#be4c4c] hover:to-[#813939] dark:from-[#ec5959] dark:to-[#420f0f] dark:hover:to-[#0c0b0b]">
							{userDetail?.Shelter?.length > 0 ? (
								<div className="w-full h-full">
									<img src={userDetail?.Shelter[0]?.profilePic}
										className="opacity-30 w-full h-full object-cover rounded-[20px]" />

									<div className="relative bottom-[120px]">
										<h1 className="text-[1.5rem] text-center text-white font-bold xsm:mt-[25px] sm:mt-0">Manage Shelter</h1>
									</div>
								</div>
							) : (
								<div className="w-full h-full">
									<img src={defaultImg}
										className="opacity-30 w-full h-full object-cover rounded-[20px]" />

									<div className="relative bottom-[120px]">
										<h1 className="text-[1.5rem] text-center text-white font-bold">Create Shelter</h1>
									</div>
								</div>
							)}
						</div>
					</div>
				</Link>

				<div className={`md:mt-[50px] flex flex-row ${expanded ? "sm:w-auto sm:mr-[40px] md:w-[250px] ml-[45px] sm:mt-[160px] lg:mt-[100px]" : "ml-[30px] sm:mt-[40px]"}`}>
					{expanded && <h2 className="sm:flex text-[#979b9c] dark:text-[#afb3b4] text-[1.1rem] font-semibold xsm:hidden">Night Mode</h2>}

					<div className={`flex ${expanded && "ml-auto sm:mr-[0px] xsm:absolute xsm:top-[40px] xsm:right-[20px] sm:static"}`}>
						<div className="flex flex-row bg-[#F2F1EF] hover:bg-[#e7e6e4] rounded-[30px] dark:bg-[#302c35]">
							<button onClick={toggleDarkMode} className={`flex w-[40px] rounded-[30px] py-[5px] ${! darkmode ? "bg-none" : "bg-[#FF7272]"}`}>
								<HiMoon className={`text-lg mx-auto ${!darkmode ? "text-[#8389A5] dark:text-[#c4bfbf]" : "text-white"}`} />
							</button>
							<button onClick={toggleDarkMode} className={`flex w-[40px] rounded-[30px] py-[5px] ${darkmode ? "bg-none" : "bg-[#FF7272]"}`}>
								<BsSun className={`text-lg mx-auto ${darkmode ? "text-[#8389A5] dark:text-[#c4bfbf]" : "text-white"}`} />
							</button>
						</div>
					</div>
				</div>

				{/* retract nav button: only shows on xsm */}
				<div className="xsm:flex sm:hidden mt-[40px] w-fit mx-auto">
					<button onClick={toggleExpanded} className="bg-[#EFF0F3] dark:bg-[#FF7272] p-[5px] rounded-full">
						<BsChevronBarUp className="text-2xl" />
					</button>
				</div>
			</div>

			{/* expand nav button: only shows on xsm */}
			{! expanded && <div className="mt-[40px] w-fit xsm:flex mx-auto absolute right-[20px] bottom-[20px] sm:hidden">
				<button onClick={toggleExpanded} className="bg-[#FF7272] p-[10px] rounded-full z-50">
					<BsChevronBarDown className="text-3xl text-white" />
				</button>
			</div>}
		</div>
	)
}

export default SubscriptorsBar
