import React from "react"
import LogoutButton from "./LogoutButton"
import LoginButton from "./LoginButton"
import AdminButton from "./AdminButton"
import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { AiOutlineDown } from "react-icons/ai"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const ProfilePanel = () => {
	const { userDetail, isAuth } = useSelector(
		(state) => state.localStorage.userState
	)
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ")
	}

	const ref = React.createRef()
	return (
		<div>
			{isAuth ? (
				<Menu as="div" className="w-[60px] outline-none">
					<div>
						<Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-800 dark:text-[#F0EEEE] duration-300">
							<h2 className="absolute right-[70px] mt-[10px] mr-[20px] dark:text-[#F0EEEE] duration-300 hidden md:inline">
								{userDetail.name}
							</h2>
							<div className="w-[40px]">
								<img
									src={userDetail.profilePic}
									alt=""
									className="w-[40px] h-[40px] rounded-[15px] object-cover"
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
						leaveTo="transform opacity-0 scale-95"
					>
						<Menu.Items className="absolute right-0 z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#27242C] dark:text-[#F0EEEE]">
							<div className="py-1">
								<Menu.Item>
									{({ active }) => (
										<Link
											to={`/users/${userDetail.id}`}
											className={classNames(
												active
													? "bg-slate-100 text-gray-900 dark:text-[#F0EEEE] dark:bg-[#342f3d]"
													: "text-gray-700 dark:text-[#F0EEEE] dark:bg-[#27242C]",
												"block px-4 py-2 text-sm"
											)}
										>
											Account settings
										</Link>
									)}
								</Menu.Item>
								{userDetail?.role === "Admin" && (
									<Menu.Item as={AdminButton}>
										{({ active }) => (
											<Link
												to={`/admin`}
												className={classNames(
													active
														? "bg-slate-100 text-gray-900 dark:text-[#F0EEEE] dark:bg-[#342f3d]"
														: "text-gray-700 dark:text-[#F0EEEE] dark:bg-[#27242C]",
													"block px-4 py-2 text-sm"
												)}
											>
												Admin Dashboard
											</Link>
										)}
									</Menu.Item>
								)}
								<Menu.Item>
									{({ active }) => (
										<Link
											to={
												userDetail?.Shelter?.length > 0
													? `/${userDetail.Shelter[0].id}/profile`
													: "/createOng"
											}
											className={classNames(
												active
													? "bg-slate-100 text-gray-900 dark:text-[#F0EEEE] dark:bg-[#342f3d]"
													: "text-gray-700 dark:text-[#F0EEEE] dark:bg-[#27242C]",
												"block px-4 py-2 text-sm"
											)}
										>
											{userDetail?.Shelter?.length > 0
												? "Shelter settings"
												: "Create Shelter"}
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
				<div>
					<LoginButton />
				</div>
			)}
		</div>
	)
}

export default ProfilePanel
