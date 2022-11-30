import { Link } from "react-router-dom"

const ProfileFooter = ({ id }) => {
    const image = "https://cdn-icons-png.flaticon.com/512/1152/1152755.png"

    return (
			<div className="flex flex-col items-center mt-[40px] pb-[40px]">
				<div className="flex flex-row mt-[5px]">
					<Link
						to="/about"
						className="text-[#838788] dark:text-[#b3b8b9] mr-[10px] font-semibold hover:underline text-lg"
					>
						About
					</Link>
					<Link
						to="/home"
						className="text-[#838788] dark:text-[#b3b8b9] mr-[10px] font-semibold hover:underline text-lg"
					>
						Home
					</Link>
					{!id ? (
						<Link
							to={`/home`}
							className="text-[#838788] dark:text-[#b3b8b9] mr-[10px] font-semibold hover:underline text-lg"
						>
							Profile
						</Link>
					) : (
						<Link
							to={`/users/${id}`}
							className="text-[#838788] dark:text-[#b3b8b9] mr-[10px] font-semibold hover:underline text-lg"
						>
							Profile
						</Link>
					)}
				</div>

				<div className="flex flex-row mt-[5px]">
					<Link
						to="/termsAndConditions"
						className="text-[#838788] dark:text-[#b3b8b9] mr-[10px] font-semibold hover:underline text-lg"
					>
						Privacy & Terms
					</Link>
				</div>

				<div className="flex flex-row mt-[5px]">
					<Link
						to="/"
						className="text-[#838788] dark:text-[#b3b8b9] mr-[10px] font-semibold hover:underline text-lg"
					>
						Landing
					</Link>
					<Link
						to="/learnMore"
						className="text-[#838788] dark:text-[#b3b8b9] mr-[10px] font-semibold hover:underline text-lg"
					>
						Learn
					</Link>
				</div>

				<div className="flex xsm:flex-col xl:flex-row items-center xsm:mt-[20px] xl:mt-[10px]">
					<img className="w-5 h-5" src={image} />
					<h3 className="ml-[10px] lg:text-[1rem] xl:text-[1.2rem] font-bold text-[#454747] dark:text-[#b3b8b9] hover:underline">
						© 2022 PawsFounders, Inc.
					</h3>
				</div>
			</div>
		)
}

export default ProfileFooter