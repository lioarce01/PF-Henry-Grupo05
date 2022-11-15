import React, { useState } from "react"
import { Link } from "react-router-dom"
import { BsSun } from "react-icons/bs"
import { HiMoon } from "react-icons/hi"
import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { AiOutlineDown } from "react-icons/ai"
import LogoutButton from "./LogoutButton"
import LoginButton from "./LoginButton"
import { useSelector } from "react-redux"

function classNames(...classes) {
	return classes.filter(Boolean).join(" ")
}

const Navbar = () => {
	const [toggle, setToggle] = useState(false)

	const { userDetail, isAuth } = useSelector(
		(state) => state.localStorage.userState
	)

	const handleToggle = () => {
		setToggle(!toggle)
	}

	const ref = React.createRef()
	return (
		<div className="fixed z-10 flex items-center justify-between w-full p-4 px-10 text-gray-800 bg-[#CA7C62] shadow-lg backdrop-blur-sm h-14">
			<Link to="/">
				<div>
					<img
						src="https://cdn-icons-png.flaticon.com/512/1152/1152755.png"
						alt="/"
						className="w-8 h-8"
					/>
				</div>
			</Link>
			<div className="flex items-center justify-center">
				{toggle ? (
					<button
						className="px-3 py-1.5 mr-6 border-2 border-[#201008] rounded-md hover:bg-[#fffcf7] hover:text-black transition duration-300"
						onClick={handleToggle}>
						<BsSun className="text-xl text-[#201008]" />
					</button>
				) : (
					<button
						className="px-3 py-1.5 mr-6 transition duration-300 border-2 rounded-md border-[#201008] hover:bg-[#fffcf7] hover:text-black duration 300"
						onClick={handleToggle}>
						<HiMoon className="text-xl text-[#201008]" />
					</button>
				)}
				<Link
					to="/home"
					className="pt-1 pb-1 pl-2 pr-2 mr-6 border-2 border-[#201008] text-[#201008] font-bold transition duration-300 rounded-md hover:bg-[#fffcf7] hover:text-black">
					Home
				</Link>
				{isAuth ? (
					<Menu
						as="div"
						className="relative z-50 inline-block text-left outline-none">
						<div>
							<Menu.Button className="inline-flex justify-center w-full px-4 py-1 text-sm font-medium text-gray-800 border-2 border-[#fffcf7] rounded-md shadow-sm outline-none hover:bg-[#fffcf7] transition duration-300 focus:outline-none">
								<img
									src={userDetail.profilePic}
									alt=""
									className="object-cover w-8 h-8 rounded-full"
								/>
								<AiOutlineDown
									className="w-5 h-5 mt-2 ml-2 -mr-1"
									aria-hidden="true"
								/>
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
												to={`/users/${userDetail.id}`}
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
									<Menu.Item>
										{({ active }) => (
											<LogoutButton ref={ref}>Logout</LogoutButton>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				) : (
					<LoginButton />
				)}
			</div>
		</div>
	)
}

export default Navbar
