import { useEffect, useState, useRef } from "react"
import { dispatch, useDispatch, useSelector } from "react-redux"
import { selectShelters } from "../../redux/slices/manageShelters";
import { useLazyGetSheltersQuery } from "../../redux/api/shelters"
import { sortSheltersAction } from "../../redux/slices/manageShelters/actions"

const ONGFilters = ({sortShelters}) => {
	const dispatch = useDispatch()
	const sorting = useSelector(state => state.manageShelters.sort)

	const [getShelters, {data: shelters}] = useLazyGetSheltersQuery()

	const listGroup = useRef()
	const listDetail = useRef()
	const listOrder = useRef()

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
		getShelters("")
	}, [getShelters])

	useEffect(() => {
		dispatch(sortSheltersAction(queriesSelected.order, queriesSelected.orderType, queriesSelected.group, queriesSelected.groupType))
	}, [queriesSelected])

	useEffect(() => {
		sortShelters(sorting)
	}, [sorting])

	return (
		<div className="w-[285px]">
			{/* select box: CRITERIO FILTRO */}
			<select
				className="bg-white w-[100px]"
				name="group"
				onChange={(e) => handleSelect(e)}
				defaultValue={"Default"}
				ref={listGroup}>
				<option value="Default" disabled>Filter by:</option>
				<option value="All">All</option>
				<option value="country">Country</option>
				<option value="city">City</option>
				<option value="animals">Animals</option>
			</select>

			{/* select box: DETALLE FILTRO */}
			<select
				className="bg-white w-[180px] ml-[5px]"
				name="groupType"
				onChange={(e) => handleSelect(e)}
				defaultValue={"DEFAULT"}
				ref={listDetail}>
				<option value="DEFAULT" disabled>
					{listGroup.current?.value ? (listGroup.current?.value !== 'Default' && listGroup.current?.value !== 'All'
					? `By ${listGroup.current?.value.charAt(0).toUpperCase() + listGroup.current?.value.slice(1)}:` : 'By:') : null}
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
				className="bg-white w-[100px] mt-[5px]"
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
			<button className="text-black w-[60px] mt-[5px] ml-[5px] float-right" onClick={handleReset}>
				Reset
			</button>
		</div>
	)
}

export default ONGFilters
