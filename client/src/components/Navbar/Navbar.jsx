import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { BsSun } from "react-icons/bs"
import { HiMoon } from "react-icons/hi"
import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { AiOutlineDown } from "react-icons/ai"
import { GrHomeRounded } from "react-icons/gr"
import { useAuth0 } from "@auth0/auth0-react"
import LogoutButton from "./LogoutButton"
import LoginButton from "./LoginButton"
import { useCreateUserMutation } from '../../redux/api/users';
import ModalCreatePost from "../Home/ModalCreatePost";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ")
}

const Navbar = () => {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const [toggle, setToggle] = useState(false)
	const { user, isAuthenticated } = useAuth0()
	const [createUser, { }] = useCreateUserMutation();

	const handleToggle = () => setToggle(!toggle)
	const closeModal = () => setIsOpen(false)

	useEffect(() => {
		isAuthenticated && createUser({
			name: user.nickname,
			email: user.email,
			profilePic: user.picture
		})
	}, [isAuthenticated, user, createUser])

	return (
		<div className="z-10 flex items-center justify-between w-full p-4 px-10 bg-none h-14 absolute">
			<div className="flex">
				<Link to="/">
					<div className="flex mt-[30px] ml-[-20px]">
						<h1 className="flex flex-row font-bold lg:text-[1.8rem] text-[#201008] ml-[10px]">Paws</h1>
						<h1 className="flex flex-row font-bold lg:text-[1.8rem] text-[#d45f37]">Founding</h1>
					</div>
				</Link>

				<div className={`${location.pathname === "/home" && "pb-[5px] border-b-[3px] border-[#d45f37]"} ml-[100px]`}>
					<Link to="/home">
						<GrHomeRounded className={`text-[#201008] w-[25px] h-[25px] flex flex-row mt-[43px] `} />
					</Link>
				</div>

				{location.pathname === "/home" && (
					<div className="flex">
						<h1 className="text-[#201008] ml-[150px] mt-[40px] font-bold text-[1.5rem]">Homepage</h1>
					</div>
				)}
			</div>

			<div className="flex items-center justify-center">
				<div className="flex w-full">
					{isAuthenticated && location.pathname === "/home" && (
						<button
							onClick={() => setIsOpen(true)}
							className="mr-[100px] mt-[40px] bg-[#ff7b76] hover:bg-[#d6635f] font-semibold text-white py-[8px] px-[27px] hover:border-transparent rounded-[30px]">
							Create Post
						</button>
					)}
				</div>

				<div>
					{toggle ? (
						<button
							className="hover:bg-[#d6635f] p-[5px] rounded-full transition duration-300 mt-[40px] mr-[210px]"
							onClick={handleToggle}>
							<BsSun className="text-xl text-[#201008] w-[25px] h-[25px] hover:text-white" />
						</button>
					) : (
						<button
							className="hover:bg-[#d6635f] p-[5px] rounded-full transition duration-300 mt-[40px] mr-[210px]"
							onClick={handleToggle}>
							<HiMoon className="text-[#201008] w-[25px] h-[25px] hover:text-white" />
						</button>
					)}
				</div>

				{isAuthenticated ? (
					<Menu
						as="div"
						className="w-[120px] relative z-50 inline-block text-left outline-none mt-[40px]">
						<div>
							<Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-800">
								<h2 className="absolute right-[70px] mt-[10px]">{user.nickname}</h2>
								<div className="w-[40px]">
									<img
										src={user.picture}
										alt=""
										className="w-[40px] h-[40px] rounded-[15px]"
									/>
								</div>
								<div className="mr-[-10px]">
									<AiOutlineDown
										className="w-5 h-5 mt-2 ml-2 -mr-1"
										aria-hidden="true"
									/>
								</div>
							</Menu.Button>
						</div>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95">
							<Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<div className="py-1">
									<Menu.Item>
										{({ active }) => (
											<Link
												to={`/users/636c0a5c1e78d75d8edfae96`}
												className={classNames(
													active
														? "bg-slate-100 text-gray-900"
														: "text-gray-700",
													"block px-4 py-2 text-sm"
												)}>
												Account settings
											</Link>
										)}
									</Menu.Item>
									<Menu.Item>
										{({ active }) => (
											<Link
												to={`/createOng`}
												className={classNames(
													active
														? "bg-slate-100 text-gray-900"
														: "text-gray-700",
													"block px-4 py-2 text-sm"
												)}>
												Create Shelter
											</Link>
										)}
									</Menu.Item>
									<Menu.Item>{({ active }) => <LogoutButton />}</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				) : (
					<div className="mt-[35px] mr-[-20px]">
						<LoginButton />
					</div>
				)}
			</div>

			<ModalCreatePost isOpen={isOpen} closeModal={closeModal} />
		</div>
	)
}

export default Navbar
