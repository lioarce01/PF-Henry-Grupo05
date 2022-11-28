import { useDispatch } from "react-redux"
import { useTopFiveSheltersQuery } from "../../../redux/api/shelters"
import { carouselSheltersAction } from '../../../redux/slices/manageShelters/actions'
import Spinner from "../../Spinner/Spinner"
import { Link } from "react-router-dom";
import { BsFillPersonFill } from "react-icons/bs"

const TopShelters = () => {
	const dispatch = useDispatch()
	const { data: topShelters, topIsSuccess } = useTopFiveSheltersQuery("3");

	// formatting budget and goal to show the $ sign,
    // as well as the thousands separator
	const moneyFormat = (num) => {
        return num?.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
			maximumFractionDigits: 0
        })
    }


	return (
		<div className="lg:w-[360px] lg:mr-[60px] lg:ml-auto sm:w-full md:mr-[30px] sm:mr-[15px]">
			<div className="flex flex-row px-[20px]">
				<div className="">
					<h2 className="font-bold text-[#979b9c] dark:text-[#afb3b4] text-[1.3rem]">Trending Shelters</h2>
				</div>
				<div className="ml-auto">
					<button onClick={() => dispatch(carouselSheltersAction('trending'))} 
					className="font-bold text-[#FF7272] hover:underline mt-[5px]">More</button>
				</div>
			</div>

			<div>
				{! topIsSuccess ? (
					<div className="mt-[25px]">
						{topShelters?.map(shelter => {
							return (
								<Link to={`/${shelter.id}/profile`}>
									<div key={shelter.id} className="ml-[20px] bg-white dark:bg-[#1b1a1f] mt-[15px] px-[15px] py-[15px] mr-[20px] lg:hover:ml-[0px]
										rounded-[30px] group shadow-[0px_15px_20px_-20px_rgba(176,176,176,0.75)] transition-all duration-500 dark:shadow-[0px_15px_20px_-20px_rgba(100,100,100,0.4)]">
										<div className="flex flex-row">
											<img
												src={shelter.profilePic}
												className="object-cover w-[60px] h-[60px] rounded-full group-hover:opacity-70 
													outline outline-offset-2 outline-2 outline-[#FF7272] transition-all duration-500"
											/>

											<div className="flex flex-col items-start mt-[10px] ml-[20px]">
												<h1 className="flex flex-col font-semibold text-[#838788] dark:text-[#afb3b4]">
													{(shelter.name.length > 18) ? shelter.name.slice(0, 15) + "..." : shelter.name}
												</h1>
												<p className="flex flex-col mt-[-5px] text-[#ACB1B2] dark:text-[#818586]">
													{moneyFormat(shelter.budget) + " collected"}
												</p>
											</div>

											<div className="flex flex-row ml-auto mt-[12px]">
												<p className="text-[#4b5bf0] dark:text-[#7f8af3] font-bold mr-[2px]">{shelter.followers.length}</p>
												<BsFillPersonFill className="text-[#4b5bf0] dark:text-[#7f8af3] mt-[4px]" />
											</div>
										</div>
									</div>
								</Link>
							)
						})}
					</div>
				) : (
					<div>
						<Spinner />
					</div>
				)}

			</div>
		</div>
	)
}

export default TopShelters