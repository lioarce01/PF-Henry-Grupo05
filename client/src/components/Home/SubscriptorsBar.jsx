import React, { useEffect, useState } from "react"
import SubsCard from "./SubsCard"
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs"
import { TbReportMoney } from "react-icons/tb"
import { AiFillHome, AiFillStar } from "react-icons/ai"
import { useGetUserFollowingQuery } from "../../redux/api/users"

const SubscriptorsBar = () => {
	const [open, setOpen] = useState(true)
	const {
		data: following,
		isLoading,
		isSuccess,
		refetch,
	} = useGetUserFollowingQuery("636c0a4f1e78d75d8edfae92")

	console.log("following: ", following)

	return (
		<div className="fixed left-0 flex">
			<div
				className={` ${
					open ? "w-28" : "w-60 "
				} flex flex-col h-[54rem] overflow-y-scroll p-2 bg-[#FAF2E7]`}>
				<div className="space-y-3">
					<div className="flex items-center justify-end">
						{open ? (
							<button
								onClick={() => setOpen(!open)}
								className="px-2 py-1 text-2xl font-bold text-black border-2 mx-2 border-[#fffcf7] hover:bg-[#fffcf7] transition duration-300 rounded-md outline-none">
								{" "}
								<BsArrowBarRight />{" "}
							</button>
						) : (
							<button
								onClick={() => setOpen(!open)}
								className="px-2 py-1 text-2xl font-bold text-black border-2 border-[#fffcf7] hover:bg-[#fffcf7] transition duration-300 rounded-md outline-none">
								{" "}
								<BsArrowBarLeft />{" "}
							</button>
						)}
					</div>
					{open ? (
						<div className="flex-1">
							<div className="flex items-center justify-center py-2 my-2 text-black border-b-2 border-gray-800">
								<span>
									<AiFillHome className="text-2xl" />
								</span>
							</div>
							<div className="flex flex-col items-center justify-center border-b-2 border-gray-800">
								<div className="flex flex-col items-center justify-center">
									<TbReportMoney className="my-2 text-2xl text-black" />
								</div>
								<div className="">
									<SubsCard />
									<SubsCard />
									<SubsCard />
									<SubsCard />
								</div>
							</div>
							<div className="flex flex-col items-center justify-center">
								<div className="flex flex-row py-1">
									<AiFillStar className="my-2 text-2xl text-black" />
								</div>
								<div className="">
									{isSuccess &&
										following.map((shelter) => (
											<SubsCard
												key={shelter.id}
												id={shelter.id}
												image={shelter.profilePic}
											/>
										))}
								</div>
							</div>
						</div>
					) : (
						<div className="items-center flex-1">
							<div className="flex items-center justify-end py-2 my-2 text-black border-b-2 border-gray-800">
								<span className="flex items-center justify-center w-full">
									<AiFillHome className="text-2xl" />
								</span>
							</div>
							<div className="transition duration-300 border-b-2 border-gray-800">
								<div className="flex flex-col items-center justify-center">
									<TbReportMoney className="my-2 text-2xl text-black" />
								</div>
								<div>
									<SubsCard name="ONG NAME" goal={"$5200"} />
									<SubsCard name="ONG NAME" goal={"$5200"} />
									<SubsCard name="ONG NAME" goal={"$5200"} />
									<SubsCard name="ONG NAME" goal={"$5200"} />
								</div>
							</div>
							<div className="flex flex-col">
								<div className="flex flex-row items-center justify-center py-1">
									<AiFillStar className="my-2 text-2xl text-black" />
								</div>
								<div>
									{isSuccess &&
										following.map((shelter) => (
											<SubsCard
												key={shelter.id}
												id={shelter.id}
												name={shelter.name}
												goal={shelter.goal}
												image={shelter.profilePic}
											/>
										))}
								</div>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default SubscriptorsBar
