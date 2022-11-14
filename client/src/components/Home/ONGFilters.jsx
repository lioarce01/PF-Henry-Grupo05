import { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getSheltersAction, sortSheltersAction } from "../../redux/reducers/dataBack/manageShelters/manageSheltersActions"

const ONGFilters = () => {
	const listGroup = useRef()
	const listDetail = useRef()
	const listOrder = useRef()

	const dispatch = useDispatch()
	const shelters = useSelector((state) => state.manageShelters.sheltersCopy)

	const [queriesSelected, setQueriesSelected] = useState({
		group: undefined,
		groupType: undefined,
		order: undefined,
		orderType: undefined,
	})

	const detailsOptions = queriesSelected.group
		? Array.from(new Set(shelters.map((s) => s[queriesSelected.group])))
		: null

	const handleSelect = e => {
		if (e.target.value === "All") {
			if (queriesSelected.order) {
				setQueriesSelected({
					...queriesSelected,
					group: undefined,
					groupType: undefined,
				})
			} else {
				setQueriesSelected({
					group: undefined,
					groupType: undefined,
					order: "name",
					orderType: "asc",
				})
			}
		} else {
			setQueriesSelected({
				...queriesSelected,
				[e.target.name]: e.target.value.split(",")[0],
			})

			if (e.target.name === "order")
				setQueriesSelected({
					...queriesSelected,
					order: e.target.value.split(",")[0],
					orderType: e.target.value.split(",")[1],
				})
		}
	}

	const handleReset = () => {
		listGroup.current.selectedIndex = 0
		listDetail.current.selectedIndex = 0
		listOrder.current.selectedIndex = 0

		setQueriesSelected({
			group: undefined,
			groupType: undefined,
			order: "name",
			orderType: "asc",
		})
	}

	useEffect(() => {
		dispatch(getSheltersAction())
	}, [dispatch])

	useEffect(() => {
		dispatch(sortSheltersAction(queriesSelected))
	}, [queriesSelected])

	return (
		<div className="relative left-[25px]">
			{/* select box: CRITERIO FILTRO */}
			<select
				className="bg-white"
				name="group"
				onChange={(e) => handleSelect(e)}
				defaultValue={"All"}
				ref={listGroup}>
				<option value="All">All</option>
				<option value="country">Country</option>
				<option value="city">City</option>
				<option value="animals">Animals</option>
			</select>

			{/* select box: DETALLE FILTRO */}
			<select
				className="ml-2 bg-white"
				name="groupType"
				onChange={(e) => handleSelect(e)}
				defaultValue={"DEFAULT"}
				ref={listDetail}>
				<option value="DEFAULT" disabled>
					By:
				</option>
				{detailsOptions
					? detailsOptions.map((op) => (
						<option value={op} key={op}>
							{op}
						</option>
					))
					: null}
			</select>

			{/* select box: ORDENAMIENTO */}
			<select
				className="ml-2 bg-white"
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
			<button className="bg-white ml-2 w-[60px]" onClick={handleReset}>
				Reset
			</button>
		</div>
	)
}

export default ONGFilters
