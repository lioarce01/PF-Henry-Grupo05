import { BsSearch } from 'react-icons/bs'
import { RiFilterOffFill } from 'react-icons/ri'
import { useEffect, useState, useRef } from "react"
import { useLazyGetSheltersQuery, useSortSheltersMutation } from "../../../redux/api/shelters"

const ONGFilters = ({ setShelters, search }) => {
	// getters for all shelters (updater) and sorted ones.
	const [getShelters, { data: shelters }] = useLazyGetSheltersQuery()
	const [sortShelters, { data: sortedShelters }] = useSortSheltersMutation()

	// did we short shelters? then display the new sorted ones.
	// did we not? then just display them all (parent component)
	sortedShelters && setShelters(sortedShelters)

	// how can we pass so many parameters in an easy way? 
	// through an object! order type and sense, filter and
	// name query (search bar) are stored in here.
	const [queriesSelected, setQueriesSelected] = useState({
		order: "name",
		orderType: "asc",
		filter: undefined,
		name: undefined
	})

	// depending on value choosen at first select box, the second one
	// will show all values for that field for shelters.
	// since there are a few animals filters, they can be hard coded. (maybe scale in a future?)
	const [details, setDetails] = useState(null)

	const handleFilter = () => {
		if (listFilter.current?.value === 'animals') {
			setDetails(['Dogs', 'Cats', 'Wild Animals', 'Farm Animals', 'Domestic Animals'])
		} else setDetails(Array.from(new Set(shelters?.map(s => s[listFilter.current?.value]))))
		listDetail.current.selectedIndex = 0
	}

	// changing queries object based on select box event. 
	// triggers on 2nd and 3rd select boxes changes.
	const handleSelect = e => {
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

	// reset button. cleans searchbar and select boxes,
	// as well as setting the default shelter order.
	const listFilter = useRef()
	const listDetail = useRef()
	const listOrder  = useRef()

	const handleReset = () => {
		listFilter.current.selectedIndex = 0
		listDetail.current.selectedIndex = 0
		listOrder.current.selectedIndex = 0

		setInput('')

		setQueriesSelected({
			filter: undefined,
			order: "name",
			orderType: "asc",
		})
	}

	// sets queries object filters to undefined
	// if the user removes filter tag
	const handleDelete = e => {
		setQueriesSelected({
			...queriesSelected,
			filter: {
				...queriesSelected.filter,
				[e.target.name]: undefined
			}
		})

		listFilter.current.selectedIndex = 0
		listDetail.current.selectedIndex = 0
	}

	// simple react input control. we update, 
	// save and clean state in this sections.
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
		// did queries change? then, update our display.
		sortShelters(queriesSelected)
	}, [queriesSelected])

	useEffect(() => {
		// if a search query is passed by props, search
		// will init with query when component mounts
		if (search) {
			setQueriesSelected({
				...queriesSelected,
				name: search
			})
			
			setInput(search)
		}

		getShelters(({name: "", enabled: true}))
	}, [])

	return (
		<div className="flex mx-auto items-center">
			<div className="flex flex-col">
				<h1 className="font-bold text-[#666768] ml-[5px] text-[1.2rem] dark:text-[#FF7272]">Browse Shelters:</h1>

				<div className="w-[300px] lg:w-[110%] h-[50px] bg-[#EFF0F3] dark:bg-[#000] mt-[15px] rounded-full">
					<form onSubmit={e => handleSubmit(e)} className='flex flex-row w-full items-center h-full dark:bg-[#000] rounded-full'>
						<input value={input} type="text" className="bg-[#EFF0F3] h-full pl-[20px] rounded-full focus:outline-none dark:bg-[#000] dark:text-white"
						placeholder="Type to search shelters..." onChange={e => handleChange(e)} />
						<button className='ml-auto mr-[10px] p-[10px] bg-[#FF7272] rounded-full hover:bg-[#e76464]'>
							<BsSearch className='text-white' />
						</button>
					</form>
				</div>

				<div className="flex flex-col mt-[20px]">
					{/* select box: FILTER CRITERIA */}
					<select
						className="bg-[#FF7272] hover:bg-[#e66363] w-[180px] py-[5px] pl-[10px] focus:outline-none 
						text-white font-semibold rounded-[15px] hover:w-[200px] transition-all duration-500"
						name="filter"
						onChange={handleFilter}
						defaultValue={"Default"}
						ref={listFilter}>
						<option value="Default" disabled>Filter by:</option>
						<option value="country">Country</option>
						<option value="city">City</option>
						<option value="animals">Animals</option>
					</select>

					{/* select box: FILTER DETAILS */}
					<select
						className="bg-[#FF7272] hover:bg-[#e66363] w-[180px] py-[5px] pl-[10px] mt-[5px] focus:outline-none
						text-white font-semibold rounded-[15px] hover:w-[200px] transition-all duration-500"
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

					{/* select box: SORTING */}
					<select
						className="bg-[#FF7272] hover:bg-[#e66363] w-[180px] py-[5px] pl-[10px] mt-[5px] focus:outline-none
						text-white font-semibold rounded-[15px] hover:w-[200px] transition-all duration-500"
						name="order"
						onChange={(e) => handleSelect(e)}
						defaultValue={"DEFAULT"}
						ref={listOrder}>
						<option value="DEFAULT" disabled>
							Sort
						</option>
						<option value="budget,desc">↑ Budget</option>
						<option value="budget,asc">↓ Budget</option>
						<option value="followers,desc">↑ Followers</option>
						<option value="followers,asc">↓ Followers</option>
					</select>

					{/* button: RESET */}
					<button className="text-[#4b5bf0] font-semibold rounded-[15px] mt-[10px] float-right border border-[#4b5bf0] 
							w-fit px-[10px] py-[2px] hover:bg-[#4b5bf0] hover:text-white transition duration-300 flex flex-row" onClick={handleReset}>
						<RiFilterOffFill className='mt-[4px]'/>
						<span className='ml-[5px]'>Reset filters</span>
					</button>

					<div>
						{queriesSelected.filter?.country &&
							<div className="border border-[#979b9c] flex flex-row rounded-full w-fit pr-[10px] mt-[10px]">
								<button name="country" onClick={e => handleDelete(e)} className="relative bottom-[2px] text-[#979b9c] ml-[10px]">x</button>
								<p className="ml-[10px] text-[#979b9c] text-[0.9rem] font-semibold">{queriesSelected.filter?.country}</p>
							</div>}

						{queriesSelected.filter?.city &&
							<div className="border border-[#979b9c] flex flex-row rounded-full w-fit pr-[10px] mt-[10px]">
								<button name="city" onClick={e => handleDelete(e)} className="relative bottom-[2px] text-[#979b9c] ml-[10px]">x</button>
								<p className="ml-[10px] text-[#979b9c] text-[0.9rem] font-semibold">{queriesSelected.filter?.city}</p>
							</div>}

						{queriesSelected.filter?.animals &&
							<div className="border border-[#979b9c] flex flex-row rounded-full w-fit pr-[10px] mt-[10px]">
								<button name="animals" onClick={e => handleDelete(e)} className="relative bottom-[2px] text-[#979b9c] ml-[10px]">x</button>
								<p className="ml-[10px] text-[#979b9c] text-[0.9rem] font-semibold">{queriesSelected.filter?.animals}</p>
							</div>}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ONGFilters
