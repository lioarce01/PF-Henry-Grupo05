import SubsCard from "./SubsCard"
import { TbReportMoney } from "react-icons/tb"
import { AiFillStar } from "react-icons/ai"
import { useSelector } from "react-redux"

const SubscriptorsBar = () => {
	const { isAuth, userDetail } = useSelector((state) => state.localStorage.userState)

	return (
		<div className="mt-[40px] absolute flex h-screen w-[350px] bg-white rounded-tr-[30px] shadow-[16px_0px_44px_15px_rgba(255,213,201,0.85)]">
			<div className="w-[350px] pb-[30px] pr-[20px] mt-[20px] mr-[10px] flex flex-col overflow-y-scroll scrollbar-thin scrollbar-thumb-[#dd7d5d] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md">
				<div className="space-y-3 ">
					<div className="items-center flex-1">
						<div className="border-b pb-[25px] mx-[15px]">
							<div className="mt-[10px]">
								<div className="flex flex-col items-start ml-[20px]">
									<h2 className="font-mono font-bold tracking-tight">
										SUBBED SHELTERS
									</h2>
								</div>
								<div className="flex flex-col items-end mt-[-20px]">
									<TbReportMoney className="text-2xl text-[#d45f37]" />
								</div>
							</div>
							<div className="mt-[35px] block mx-auto w-[280px]">
								{isAuth ?
									(userDetail?.following?.map((shelter) => (
										<SubsCard
											key={shelter.id}
											id={shelter.id}
											name={shelter.name}
											goal={shelter.goal}
											image={shelter.profilePic}
										/>
									))) : <h1 className="text-center font-semibold text-[#201008]">Log in to sub to shelters.</h1>}
							</div>
						</div>
						<div className="flex flex-col">
							<div className="mt-[20px]">
								<div className="flex flex-col items-start ml-[35px]">
									<h2 className="font-mono font-bold tracking-tight">
										FOLLOWING
									</h2>
								</div>
								<div className="flex flex-col items-end mr-[15px] mt-[-30px]">
									<AiFillStar className="my-2 text-2xl text-[#d45f37]" />
								</div>
							</div>

							<div className="mt-[20px] block mx-auto pb-[100px]">
								{isAuth ?
									(userDetail?.following?.map((shelter) => (
										<SubsCard
											key={shelter.id}
											id={shelter.id}
											name={shelter.name}
											goal={shelter.goal}
											image={shelter.profilePic}
										/>
									))) : <h1 className="text-center font-semibold text-[#201008]">Log in to follow shelters.</h1>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SubscriptorsBar
