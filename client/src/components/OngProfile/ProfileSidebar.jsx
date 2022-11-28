import { useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import HomeProfilePanel from "../Home/Main/HomeProfilePanel"
import { switchTheme } from "../..//redux/slices/manageTheme"

// react icons
import { BsChevronBarLeft, BsChevronBarRight, BsChevronBarUp,
BsChevronBarDown, BsFillPersonFill } from "react-icons/bs"
import { HiPencilSquare } from "react-icons/hi2"
import { FaMapMarkerAlt } from "react-icons/fa"
import { HiLink, HiMoon } from "react-icons/hi"
import { BsSun } from "react-icons/bs"


const ProfileSidebar = ({ id, profilePic, city, country, website, postsLength, followersLength, setIsOpenDonate }) => {
    const dispatch = useDispatch()

    // handles dark mode toggle in the website
	const { darkmode } = useSelector(state => state.localStorage.manageTheme)
	const toggleDarkMode = () => dispatch(switchTheme())

    // handles this bar's expansion state
    // it may start expanded or rectracted, based on initial window width
    const [expanded, setExpanded] = useState(window.innerWidth > 1700 ? true : false)
    const toggleExpanded = () => setExpanded(!expanded)

    return (
        <div className={`flex h-screen bg-white dark:bg-[#1B1A1F] overflow-y-hidden ${expanded ? "md:w-[350px] xsm:w-screen xsm:h-screen xsm:fixed xsm:z-50 sm:static" : "xsm:h-0 sm:h-screen sm:flex w-[140px]"} transition-all duration-300 overflow-x-hidden`}>
            <div className={`${expanded ? "md:w-[325px] xsm:w-screen sm:pr-[20px] xsm:pr-0" : "w-[140px]"} h-screen mt-[30px] flex flex-col`}>
                <div className={expanded && "ml-[25px]"}>
                    <div className="flex w-full">
                        <div className="w-full">
                            <Link to="/">
                                <div className={`flex group ${expanded ? "flex-row" : "flex-col text-center"}`}>
                                    <span className={`text-[1.5rem] font-bold text-[#201008] dark:text-white
										group-hover:text-[#FF7272] transition-all duration-500 font-mono mt-[2px]`}>Paws</span>
                                    <span className={`text-[1.5rem] font-bold text-[#FF7272] dark:group-hover:text-white
										group-hover:text-[#201008] transition-all duration-500`}>Founding</span>
                                </div>
                            </Link>
                        </div>

                        {/* retract or expand sidebar button */}
                        <button onClick={toggleExpanded} className=
                            {`xsm:hidden sm:flex text-xl ml-auto bg-[#EFF0F3] dark:bg-[#27242C] dark:text-white absolute items-center rounded-full
                            ${expanded ? "sm:right-[20px] md:right-auto md:left-[320px] p-[15px]" : "left-[125px] p-[5px]"} transition-all duration-300`}>
                            {expanded ? <BsChevronBarLeft /> : <BsChevronBarRight />}
                        </button>
                    </div>

                    {/* profile manager panel */}
                    <div className={`mt-[45px] ${!expanded ? "ml-[40px]" : "sm:ml-[20px] md:ml-[10px]"}`}>
                        <div className="flex">
                            <HomeProfilePanel expanded={expanded} />
                        </div>
                    </div>
                </div>

                {/* profile picture */}
                <div className={` ${expanded ? "sm:ml-[45px] sm:mt-[40px] xsm:mt-[10px] md:mr-[0px] sm:mr-[30px] xsm:mr-[40px] xsm:ml-[35px]" : "mx-[15px] mt-[30px]"}
                transition-all duration-300 pt-[40px] border-t`}>
                    <div className="xsm:h-[140px] sm:h-[200px] rounded-[20px] hover:bg-gradient-to-bl from-[#FF7272] to-[#be4c4c] group">
                        <div className="w-full h-full">
                            <img src={profilePic} className="w-full h-full object-cover rounded-[20px] duration-300
                            shadow-[0px_15px_20px_-20px_rgba(176,176,176,0.75)] group-hover:opacity-60 transition-all" />
                        </div>
                    </div>
                </div>

                {/* informative text */}
                <div className={expanded && `xsm:flex sm:flex-col xsm:flex-col xsm:ml-[30px]`}>
                    <div className={`xsm:mt-[20px] sm:mt-[45px] ${expanded && "sm:ml-[20px]"}`}>
                        <ul className="mt-[10px]">
                            {/* location */}
                            <li>
                                <button className={`flex flex-row group ${!expanded && 'mx-auto'}`}>
                                    <FaMapMarkerAlt className={`text-[#bb7070] flex group-hover:text-[#e76f6f] 
									transition-all duration-300 ${expanded ? 'sm:text-3xl xsm:text-xl' : 'text-4xl mx-auto'}`} />
                                    {expanded && <p className="flex xsm:ml-[10px] sm:ml-[15px] text-[#979b9c] dark:text-[#b3b8b9]
                                    sm:text-[1.2rem] xsm:text-[1rem] font-semibold group-hover:underline">{`${city}, ${country}`.length > 22 ? `${city}, ${country}`.slice(0, 22)+'...' : `${city}, ${country}`}</p>}
                                </button>
                            </li>

                            {/* website */}
                            <li className="mt-[20px]">
                                <button className={`flex flex-row group ${!expanded && 'mx-auto'}`}>
                                    <HiLink className={`text-[#bb7070] flex group-hover:text-[#e76f6f] 
									transition-all duration-300 ${expanded ? 'sm:mt-[5px] sm:text-3xl xsm:text-xl' : 'text-4xl mx-auto'}`} />
                                    {expanded && <a href={website} target={"_blank"} className="flex xsm:ml-[10px] sm:ml-[15px] text-[#979b9c] dark:text-[#b3b8b9]
                                     sm:text-[1.2rem] xsm:text-[1rem] font-semibold group-hover:underline">{website ? (
                                        website?.length > 26 ? website.slice(0,24)+'...' : website
                                     ) : (
                                        'No website available'
                                     )}</a>}
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className={`${expanded ? "md:ml-[45px] sm:ml-[30px] sm:mr-0 xsm:ml-0 xsm:mt-[20px] w-full sm:mt-[25px] " : "sm:mt-[60px]"}`}>
                        <ul className="mt-[5px] text-center ">
                            {/* posts */}
                            <li className="mt-[10px] w-full">
                                <button className={`flex flex-row group ${!expanded && 'mx-auto flex-col'} w-full`}>
                                    {!expanded &&  <HiPencilSquare className={`text-[#bb7070] flex mt-[2px] group-hover:text-[#e76f6f] 
									transition-all duration-300 ${expanded ? 'sm:text-2xl xsm:text-xl' : 'text-4xl mx-auto'}`} />}

                                    <div className={`flex sm:flex-row md:flex-col w-full sm:text-left md:text-center ${expanded && "mr-[80px]"}`}>
                                        <span className="text-[#979b9c] dark:text-[#b3b8b9] sm:text-[1.5rem] xsm:text-[1rem] font-semibold">{postsLength}</span>
                                        {expanded && 
                                        <div className="flex w-fit text-center md:mx-auto">
                                            <p className="text-[#979b9c] dark:text-[#b3b8b9] sm:text-[1.5rem] xsm:text-[1rem] text-center font-semibold xsm:ml-[10px] md:ml-0">{postsLength > 1 ? "Posts" : "Post"}</p>
                                        </div>}
                                    </div>
                                </button>
                            </li>

                            {/* followers */}
                            <li className="xsm:mt-[5px] sm:mt-[25px] w-full">
                                <button className={`flex flex-row group ${!expanded && 'mx-auto flex-col'} w-full`}>
                                    {!expanded &&  <BsFillPersonFill className={`text-[#bb7070] flex mt-[2px] group-hover:text-[#e76f6f] 
									transition-all duration-300 ${expanded ? 'sm:text-2xl xsm:text-xl' : 'text-4xl mx-auto'}`} />}

                                    <div className={`flex sm:flex-row md:flex-col w-full sm:text-left md:text-center ${expanded && "mr-[80px]"}`}>
                                        <span className="text-[#979b9c] dark:text-[#b3b8b9] sm:text-[1.5rem] xsm:text-[1rem] font-semibold">{followersLength}</span>
                                        {expanded && 
                                        <div className="flex w-fit text-center md:mx-auto">
                                            <p className="text-[#979b9c] dark:text-[#b3b8b9] sm:text-[1.5rem] xsm:text-[1rem] text-center font-semibold xsm:ml-[10px] md:ml-0">{followersLength > 1 ? "Followers" : "Follower"}</p>
                                        </div>}
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className={`md:mt-[50px] flex flex-row ${expanded ? "sm:w-auto sm:mr-[40px] md:w-[250px] ml-[20px] sm:mt-[160px] lg:mt-[100px]" : "ml-[30px] sm:mt-[40px]"}`}>
                        {expanded && <h2 className="sm:flex text-[#979b9c] dark:text-[#afb3b4] text-[1.1rem] font-semibold xsm:hidden">Night Mode</h2>}

                        <div className={`flex ${expanded && "ml-auto sm:mr-[0px] xsm:absolute xsm:top-[40px] xsm:right-[20px] sm:static"}`}>
                            <div className="flex flex-row bg-[#F2F1EF] hover:bg-[#e7e6e4] rounded-[30px] dark:bg-[#302c35]">
                                <button onClick={toggleDarkMode} className={`flex w-[40px] rounded-[30px] py-[5px] ${!darkmode ? "bg-none" : "bg-[#FF7272]"}`}>
                                    <HiMoon className={`text-lg mx-auto ${!darkmode ? "text-[#8389A5] dark:text-[#c4bfbf]" : "text-white"}`} />
                                </button>
                                <button onClick={toggleDarkMode} className={`flex w-[40px] rounded-[30px] py-[5px] ${darkmode ? "bg-none" : "bg-[#FF7272]"}`}>
                                    <BsSun className={`text-lg mx-auto ${darkmode ? "text-[#8389A5] dark:text-[#c4bfbf]" : "text-white"}`} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* retract nav button: only shows on xsm */}
                <div className="xsm:flex sm:hidden mt-[40px] w-fit mx-auto">
                    <button onClick={toggleExpanded} className="bg-[#EFF0F3] p-[5px] rounded-full">
                        <BsChevronBarUp className="text-2xl" />
                    </button>
                </div>
            </div>

            {/* expand nav button: only shows on xsm */}
            {!expanded && <div className="mt-[40px] w-fit xsm:flex mx-auto absolute right-[20px] bottom-[20px] sm:hidden">
                <button onClick={toggleExpanded} className="bg-[#FF7272] p-[10px] rounded-full z-50">
                    <BsChevronBarDown className="text-3xl text-white" />
                </button>
            </div>}
        </div>
    )
}

export default ProfileSidebar