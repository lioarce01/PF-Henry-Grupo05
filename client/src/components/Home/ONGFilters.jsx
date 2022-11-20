import { BsSearch } from 'react-icons/bs'
import { useEffect, useState, useRef } from "react"
import { useLazyGetSheltersQuery, useSortSheltersMutation } from "../../redux/api/shelters"

const ONGFilters = ({ setShelters }) => {
	const [getShelters, { data: shelters }] = useLazyGetSheltersQuery()
	const [sortShelters, { data: sortedShelters }] = useSortSheltersMutation()
	const [details, setDetails] = useState(null)

	sortedShelters && setShelters(sortedShelters)

	const listFilter = useRef()
	const listDetail = useRef()
	const listOrder  = useRef()

	const [queriesSelected, setQueriesSelected] = useState({
		order: "name",
		orderType: "asc",
		filter: undefined,
		name: undefined
	})

	const handleFilter = () => {
		if (listFilter.current?.value === 'animals') {
			setDetails(['Dogs', 'Cats', 'Wild Animals', 'Farm Animals', 'Domestic Animals'])
		} else setDetails(Array.from(new Set(shelters?.map(s => s[listFilter.current?.value]))))
	}

	const handleSelect = async e => {
		if (e.target.name === 'filterType')
			setQueriesSelected({
				...queriesSelected,
				filter: {
					...queriesSelected.filter,
					[listFilter.current?.value]: e.target.value
				}
			})

		if (e.target.name === 'order')
			setQueriesSelected({
				...queriesSelected,
				order: e.target.value.split(",")[0],
				orderType: e.target.value.split(",")[1]
			})
	}

	const handleReset = () => {
		listFilter.current.selectedIndex = 0
		listDetail.current.selectedIndex = 0
		listOrder.current.selectedIndex = 0

		setQueriesSelected({
			filter: undefined,
			order: "name",
			orderType: "asc",
		})
	}

	const handleDelete = e => {
		setQueriesSelected({
			...queriesSelected,
			filter: {
				...queriesSelected.filter,
				[e.target.name]: undefined
			}
		})
	}

	// ------------- SEARCH BAR ------------- //

  	const [input, setInput] = useState('')

	const handleChange = (e) => {
		e.preventDefault();
		setInput(e.target.value)
	}
	
	  const handleSubmit = (e) => {
		e.preventDefault();
		getShelters(input)

		setQueriesSelected({
			...queriesSelected,
			name: input
		})

		setInput('')
	}

	// -------------------------------------- //

	useEffect(() => {
		sortShelters(queriesSelected)
	}, [queriesSelected])

	useEffect(() => {
		getShelters(({name: "", enabled: true}))
	}, [])

	return (
		<div className="flex mx-auto items-center">
			<div className="flex flex-col">
				<h1 className="font-bold text-[#201008] ml-[5px] text-[1.2rem]">Browse Shelters:</h1>

				<form onSubmit={(e) => handleSubmit(e)} className="flex flex-row justify-center mt-[20px]">
        			<input type="text" placeholder="Search" className="ml-[-5px] w-[65%] h-10 pl-2 pr-2 mr-4 text-[#201008] bg-[#fcfaf6] rounded-md placeholder-gray-500 placeholder-opacity-50" onChange={handleChange} value={input} />
        			<button className="px-6 py-2 text-[#d36541] transition duration-300 border-2 rounded-md bg-[#fffcf7] hover:border-[#fffcf7] border-[#fffcf7] hover:bg-[#FAF2E7]" onClick={handleSubmit}><BsSearch className='w-5 h-5'/></button>
      			</form>

				<div className="flex flex-col mt-[20px]">
					{/* select box: CRITERIO FILTRO */}
					<select
						className="bg-[#d36541] hover:bg-[#ac5233] w-[180px] py-[5px] pl-[10px] text-white font-semibold rounded-[15px]"
						name="filter"
						onChange={handleFilter}
						defaultValue={"Default"}
						ref={listFilter}>
						<option value="Default" disabled>Filter by:</option>
						<option value="country">Country</option>
						<option value="city">City</option>
						<option value="animals">Animals</option>
					</select>

					{/* select box: DETALLE FILTRO */}
					<select
						className="bg-[#d36541] hover:bg-[#ac5233] w-[180px] py-[5px] pl-[10px] mt-[5px] text-white font-semibold rounded-[15px]"
						name="filterType"
						onChange={(e) => handleSelect(e)}
						defaultValue={"DEFAULT"}
						ref={listDetail}>
						<option value="DEFAULT" disabled>
							{listFilter.current?.value ? (listFilter.current?.value !== 'Default' && listFilter.current?.value !== 'All'
								? `By ${listFilter.current?.value.charAt(0).toUpperCase() + listFilter.current?.value.slice(1)}:` : 'By:') : null}
						</option>
						{details
							? details.map((op) => (
								<option value={op} key={op}>
									{op}
								</option>
							))
							: null}
					</select>

					{/* select box: ORDENAMIENTO */}
					<select
						className="bg-[#d36541] hover:bg-[#ac5233] w-[180px] py-[5px] pl-[10px] mt-[5px] text-white font-semibold rounded-[15px]"
						name="order"
						onChange={(e) => handleSelect(e)}
						defaultValue={"DEFAULT"}
						ref={listOrder}>
						<option value="DEFAULT" disabled>
							Sort
						</option>
						<option value="budget,desc">Budget +</option>
						<option value="budget,asc">Budget -</option>
						<option value="followers,desc">Followers +</option>
						<option value="followers,asc">Followers -</option>
					</select>

					{/* button: RESET */}
					<button className="text-[#201008] font-semibold rounded-[15px] mt-[10px] float-right border border-[#201008] w-[75px] hover:bg-[#201008] hover:text-white transition duration-300" onClick={handleReset}>
						Reset
					</button>

					<div>
						{queriesSelected.filter?.country &&
							<div className="border border-[#c46241] flex flex-row rounded-full w-auto mt-[10px]">
								<button name="country" onClick={e => handleDelete(e)} className="relative bottom-[2px] text-[#c46241] ml-[10px]">x</button>
								<p className="ml-[10px] text-[#c46241] text-[0.9rem] font-semibold">{queriesSelected.filter?.country}</p>
							</div>}

						{queriesSelected.filter?.city &&
							<div className="border border-[#c46241] flex flex-row rounded-full w-auto mt-[10px]">
								<button name="city" onClick={e => handleDelete(e)} className="relative bottom-[2px] text-[#c46241] ml-[10px]">x</button>
								<p className="ml-[10px] text-[#c46241] text-[0.9rem] font-semibold">{queriesSelected.filter?.city}</p>
							</div>}

						{queriesSelected.filter?.animals &&
							<div className="border border-[#c46241] flex flex-row rounded-full w-auto mt-[10px]">
								<button name="animals" onClick={e => handleDelete(e)} className="relative bottom-[2px] text-[#c46241] ml-[10px]">x</button>
								<p className="ml-[10px] text-[#c46241] text-[0.9rem] font-semibold">{queriesSelected.filter?.animals}</p>
							</div>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ONGFilters
