import React from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import ONGCard from "./ONGCard"
import ONGFilters from "./ONGFilters"
import SearchBar from "../Navbar/SearchBar"
import {
	useGetSheltersQuery,
	useSortSheltersMutation,
} from "../../redux/api/shelters"
import Spinner from "../Spinner/Spinner"
import { useState } from "react"

const Ongs = () => {
	const { search } = useSelector((state) => state.manageShelters)
	const [sortShelters, { data: sorted }] = useSortSheltersMutation()
	const {
		data: shelters,
		isLoading,
		error,
		isSuccess,
		refetch,
	} = useGetSheltersQuery(search)

	useEffect(() => {
		refetch()
	}, [])

	return (
		<div className="h-screen mt-5 rounded-md lg:right-0 lg:fixed">
			<h2 className="pt-2 text-2xl font-bold text-center">Explore Shelters</h2>
			<div className="flex items-center h-[47.5rem] bg-[#EEEEE6] shadow-xl border-2 border-[#dbdbd5] w-[90%] mt-5 overflow-auto flex-col py-10 rounded-md">
				<SearchBar />
				<div className="flex items-end justify-end w-full py-1 pr-10">
					<ONGFilters sortShelters={sortShelters} />
				</div>
				<div className="w-full">
					{isSuccess ? (
						shelters.length ? (
							sorted ? (
								sorted.map((shelter) => {
									return (
										<ONGCard
											key={shelter.id}
											id={shelter.id}
											image={shelter.profilePic}
											name={shelter.name}
											description={shelter.description}
											budget={shelter.budget}
											followers={shelter.userFollowers?.length}
										/>
									)
								})
							) : (
								shelters.map((shelter) => {
									return (
										<ONGCard
											key={shelter.id}
											id={shelter.id}
											image={shelter.profilePic}
											name={shelter.name}
											description={shelter.description}
											budget={shelter.budget}
											followers={shelter.userFollowers?.length}
										/>
									)
								})
							)
						) : (
							<div className="flex justify-center mt-12 text-4xl text-center">
								<p>Not found</p>
							</div>
						)
					) : (
						<div className="mt-[140px]">
							<Spinner />
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default Ongs
