import React, { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { BsSun } from "react-icons/bs"
import { HiMoon } from "react-icons/hi"
import { GrHomeRounded } from "react-icons/gr"
import PostFilters from "../Home/PostFilters"
import { useSelector } from "react-redux"
import ModalCreatePost from "../Home/Modals/ModalCreatePost"
import ProfilePanel from "./ProfilePanel"

function classNames(...classes) {
	return classes.filter(Boolean).join(" ")
}

const Navbar = () => {
	const location = useLocation()
	const [isOpen, setIsOpen] = useState(false)
	const [toggle, setToggle] = useState(false)
	const { userDetail, isAuth } = useSelector(
		(state) => state.localStorage.userState
	)

	const handleToggle = () => setToggle(! toggle)
	const closeModal = () => setIsOpen(false)

	return (
		<div className={`${location.pathname === "/home" ? "absolute z-49 flex flex-row items-center w-full h-20 px-4 bg-none" : "relative z-49 flex flex-row items-center w-full h-20 px-4 bg-none"}`}>
			<div className="flex flex-row justify-between w-full">
				<div className="flex flex-row items-center">
					<div className="flex flex-row items-center justify-center ml-[10px]">
						<Link to="/">
							<span className="font-bold lg:text-[1.8rem] text-[#201008]">
								Paws
							</span>
							<span className="font-bold lg:text-[1.8rem] text-[#d45f37]">
								Founding
							</span>
						</Link>
					</div>

					<div
						className={`${location.pathname === "/home" &&
							"pb-[5px] border-b-[3px] border-[#d45f37]"
							} flex flex-row items-center justify-center ml-4 lg:ml-[100px] md:ml-[120px]`}>
						<Link to="/home">
							<GrHomeRounded className="text-[#201008] w-[25px] h-[25px] flex flex-row" />
						</Link>
					</div>
				</div>

				<div className="flex flex-row items-center">
					{location.pathname === "/home" && (
					<div className="mr-[130px] flex flex-row">
						<div className="flex mr-[20px] mt-[2px]">
							<PostFilters />
						</div>
						{isAuth && userDetail?.Shelter?.length > 0 && userDetail?.Shelter[0].enable === true ? (
						<button
							onClick={() => setIsOpen(true)}
							className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-[#D45F37] border border-transparent rounded-[30px] shadow-sm hover:bg-[#e0643a] transition duration-300">
							Create Post
						</button>) : null}
					</div>)}
					
					<div className="mr-[250px]">
						{toggle ? (
							<button
								className="hover:bg-[#D45F37] p-[5px] rounded-full transition duration-300"
								onClick={handleToggle}>
								<BsSun className="text-xl text-[#201008] w-[25px] h-[25px] hover:text-white" />
							</button>
						) : (
							<button
								className="hover:bg-[#D45F37] p-[5px] rounded-full transition duration-300"
								onClick={handleToggle}>
								<HiMoon className="text-xl text-[#201008] w-[25px] h-[25px] hover:text-white" />
							</button>
						)}
					</div>
					
					<ProfilePanel />
				</div>
			</div>

			<ModalCreatePost isOpen={isOpen} closeModal={closeModal} />
		</div>
	)
}

export default Navbar
