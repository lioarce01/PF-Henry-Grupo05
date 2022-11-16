import React, { useState } from "react"
import { useGetSheltersQuery } from "../../redux/api/shelters"
import { useGetUsersQuery } from "../../redux/api/users"

const AdminDashboard = () => {
	const [user, setUser] = useState("")
	const [shelter, setShelter] = useState("")
	const { data: users, userLoading, userRefetch } = useGetUsersQuery(user)
	const {
		data: shelters,
		shelterLoading,
		shelterRefetch,
	} = useGetSheltersQuery(shelter)

	console.log(users)

	const handleUserInput = (e) => {
		e.preventDefault()
		setUser(e.target.value)
	}

	const handleShelterInput = (e) => {
		e.preventDefault()
		setShelter(e.target.value)
	}

	const handleUserSearch = (e) => {
		e.preventDefault()
	}

	const handleShelterSearch = (e) => {
		e.preventDefault()
	}

	return (
		<div className="flex flex-col w-full h-full min-h-screen bg-red-100 ">
			<div className="flex flex-col justify-center w-full lg:flex-row">
				<div className="flex flex-col w-full lg:w-[500px] items-center mx-2">
					<h2 className="py-4 text-2xl font-bold">Users</h2>
					<div className="flex flex-row p-2 my-2">
						<input
							type="text"
							className="px-2 py-2 mr-2 rounded-md outline-none"
							placeholder="search a user"
							onChange={handleUserInput}
							value={user}
						/>
						<button
							className="px-2 py-1 transition duration-300 border-2 border-red-700 rounded-md hover:bg-red-700 hover:text-white"
							onClick={handleUserSearch}>
							Search
						</button>
					</div>
					<div className="flex flex-row bg-red-200 h-[600px] overflow-y-scroll rounded-md w-[85%] md:w-[500px] lg:w-full my-4">
						<ul className="flex flex-col w-full p-2">
							{userLoading ? (
								<div>Loading...</div>
							) : (
								users?.map((user) => (
									<li
										key={user.id}
										className="flex flex-row items-center justify-between p-2">
										<div className="flex flex-col">
											<span className="font-bold">{user.name}</span>
										</div>
										<div className="flex flex-row">
											<button className="px-2 py-1 mr-1 text-white bg-blue-500 rounded-md">
												Edit
											</button>
											<button className="px-2 py-1 text-white bg-red-500 rounded-md">
												Delete
											</button>
										</div>
									</li>
								))
							)}
						</ul>
					</div>
				</div>

				<div className="flex flex-col w-full lg:w-[500px] items-center mx-2 ">
					<h2 className="py-4 text-2xl font-bold">Shelters</h2>
					<div className="flex flex-row p-2 my-2">
						<input
							type="text"
							className="px-2 py-2 mr-2 rounded-md outline-none"
							placeholder="search a shelter"
							onChange={handleShelterInput}
							value={shelter}
						/>
						<button
							className="px-2 py-1 transition duration-300 border-2 border-red-700 rounded-md hover:bg-red-700 hover:text-white"
							onClick={handleShelterSearch}>
							Search
						</button>
					</div>
					<div className="flex flex-row bg-red-200 h-[600px] overflow-y-scroll rounded-md w-[85%] md:w-[500px] lg:w-full my-4">
						<ul className="flex flex-col w-full p-2">
							{shelterLoading ? (
								<div>Loading...</div>
							) : (
								shelters?.map((shelter) => (
									<li
										key={shelter.id}
										className="flex flex-row items-center justify-between p-2">
										<div className="flex flex-col">
											<span className="font-bold">{shelter.name}</span>
										</div>
										<div className="flex flex-row">
											<button className="px-2 py-1 mr-1 text-white bg-blue-500 rounded-md">
												Edit
											</button>
											<button className="px-2 py-1 text-white bg-red-500 rounded-md">
												Delete
											</button>
										</div>
									</li>
								))
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AdminDashboard
