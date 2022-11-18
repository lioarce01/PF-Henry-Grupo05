import { useGetSheltersQuery, useTopFiveSheltersQuery } from "../../redux/api/shelters"
import { AiOutlineArrowRight } from "react-icons/ai"
import ModalShelters from './ModalShelters' 
import Spinner from "../Spinner/Spinner"
import { Link } from "react-router-dom";
import { useState } from "react";

const Ongs = () => {
	const { data: shelters } = useGetSheltersQuery();
	const { data: topShelters, topIsSuccess } = useTopFiveSheltersQuery("3");

	const [open, setOpen] = useState(false)

	const displayShelters = () => setOpen(true)

	return (
		<div className="h-screen mt-5 lg:right-0 absolute">

			<div className="h-screen rounded-[30px] flex w-[360px] bg-[#f5d9d4] mt-[20px] overflow-auto flex-col scrollbar-none">
				<div className="mt-[30px] px-[20px]">
					<h2 className="flex flex-col items-start font-mono tracking-tight font-bold text-[#201008]">POPULAR SHELTERS</h2>
					<h2 className="flex flex-col items-end font-mono tracking-tight font-bold text-[#e07450] mt-[-25px] hover:underline">MORE</h2>
				</div>

				<div>
					{! topIsSuccess ? (
						<div className="mt-[40px]">
							{topShelters?.map(shelter => {
								return (
									<div key={shelter.id} className="ml-[30px] bg-white mt-[20px] rounded-[40px] pl-[20px] pt-[20px] pr-[20px] pb-[15px] mr-[30px] shadow-[0px_19px_23px_-6px_rgba(235,174,158,1)]">
										<div className="flex flex-row">
											<img src={shelter.profilePic} className="object-cover w-[60px] h-[60px] rounded-[25px] shadow-[0px_12px_10px_-6px_rgba(235,174,158,1)]" />

											<div className="flex flex-col items-start mt-[10px]">
												<h1 className="flex flex-col font-[700] text-[#201008] ml-[15px]">{shelter.name}</h1>
												<p className="flex flex-col ml-[15px] mt-[-5px] text-[#c46241]">{shelter.city}</p>
											</div>

										</div>

										<div className="flex mt-[10px]">
											<p className="flex flex-row w-[250px] ml-[10px] font-semibold text-[#929294] text-[0.9rem]">
												{shelter.description.length > 61 ? (shelter.description.slice(0, 61) + "...") : (shelter.description)}</p>
										</div>

										<div className="flex w-full justify-end">
											<Link to={`/${shelter.id}/profile`}>
												<p className="font-mono flex tracking-tight font-bold text-[#e07450] mt-[10px] hover:underline">READ</p>
											</Link>
										</div>
									</div>
								)
							})}
						</div>
					) : (
						<div>
							<Spinner />
						</div>
					)}

					<div className="pb-[130px]">
						<div className="mt-[40px] px-[20px]">
							<h2 className="flex flex-col items-start font-mono tracking-tight font-bold text-[#201008]">SUGGESTIONS</h2>
							<h2 onClick={displayShelters} 
							className="flex flex-col items-end font-mono tracking-tight font-bold text-[#e07450] mt-[-25px] hover:underline">ALL</h2>
						</div>

						{shelters?.slice(0, 5).map(s => {
							return (
								<div key={s.id} className="flex mt-[20px] ml-[20px]">
									<div className="flex flex-row">
										<img src={s.profilePic} className="object-cover w-[80px] h-[80px] rounded-[25px]"/>
									</div>

									<div className="flex flex-col mt-[15px] w-[190px]">
										<h1 className="flex flex-col font-[700] text-[#201008] ml-[15px]">{s.name}</h1>
										<p className="flex flex-col ml-[15px] mt-[-5px] text-[#a59698] text-[0.9rem] font-[700]">{s.city?.length > 19 ? (s.city?.slice(0,19)+'...') : s.city}</p>
									</div>

									<div className="flex flex-row">
										<Link to={`/${s.id}/profile`}>
											<AiOutlineArrowRight className=
											"text-white bg-[#FF7B79] w-[40px] h-[40px] p-[8px] rounded-full mt-[20px] hover:bg-[#ce5f5d]"/>
										</Link>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>

			{open && <ModalShelters setOpen={setOpen} />}
		</div>
	)
}

export default Ongs