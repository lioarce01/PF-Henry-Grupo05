import React from 'react'
import LogoutButton from "../../Navbar/LogoutButton"
import LoginButton from "../../Navbar/LoginButton"
import AdminButton from "../../Navbar/AdminButton"
import { Fragment } from "react"
import { Menu, Transition } from "@headlessui/react"
import { AiOutlineDown } from "react-icons/ai"
import { useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"

const ProfilePanel = ({ expanded }) => {
	const { userDetail, isAuth } = useSelector(
		(state) => state.localStorage.userState
	)
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ")
	}
	const location = useLocation()

	const ref = React.createRef()
	return (
		<div>
			{isAuth ? (
				<Menu as="div" className="w-[60px] outline-none">
					<div>
						<Menu.Button className="inline-flex justify-center text-sm font-medium text-gray-800">	
							<div className="flex flex-row">
								<div className="flex h-[60px] w-[60px] rounded-full outline outline-offset-2 outline-2 outline-[#FF7272]">
									<img
										src={userDetail.profilePic}
										alt=""
										className="rounded-full object-cover hover:brightness-75"
									/>
								</div>
								{expanded && (
								<div className='flex flex-row group'>
									<div className="flex flex-col text-left justify-center ml-[15px]">
										<div className='flex flex-row w-[150px]'>
											<h2 className="dark:text-[#f0eeee]">Welcome {userDetail.name.split(' ')[0]}</h2>
											<span className='ml-[5px] animate-waving-hand'>👋</span>
										</div>
										<p className="flex w-[150px] text-[0.8rem] text-[#ACB1B2] group-hover:underline">{userDetail.name}</p>
									</div>
									<div className="flex items-center justify-end ml-[45px]">
										<AiOutlineDown
											className="w-5 h-5 mt-2 ml-2 -mr-1 text-[#979b9c]"
											aria-hidden="true"
										/>
									</div>
								</div>)}
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
						<Menu.Items className="absolute z-10 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							<div className="py-1">
								<Menu.Item>
									{({ active }) => (
										<Link
											to={`/users/${userDetail.id}`}
											className={classNames(
												active ? "bg-slate-100 text-gray-900" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}>
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
														? "bg-slate-100 text-gray-900"
														: "text-gray-700",
													"block px-4 py-2 text-sm"
												)}>
												Admin Dashboard
											</Link>
										)}
									</Menu.Item>
								)}					
								<Menu.Item>
									{({ active }) => (
										<Link

											to={userDetail?.Shelter?.length > 0 ? `/${userDetail.Shelter[0].id}/profile` : "/createOng"}
											className={classNames(
												active ? "bg-slate-100 text-gray-900" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}>
											{userDetail?.Shelter?.length > 0 ? "Shelter settings" : "Create Shelter"}
										</Link>
									)}
								</Menu.Item>
								{userDetail?.Shelter[0] && <Menu.Item>
									{({ active }) => (
										<Link

											to={location.pathname === "/tickets" ? "/home" : "/tickets" }
											className={classNames(
												active ? "bg-slate-100 text-gray-900" : "text-gray-700",
												"block px-4 py-2 text-sm"
											)}>
											{location.pathname === "/tickets" ? "Home" : "My Tickets"}
										</Link>
									)}
								</Menu.Item>}
								
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
