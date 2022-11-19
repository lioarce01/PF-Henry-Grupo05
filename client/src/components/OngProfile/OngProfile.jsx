import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDisableShelterMutation, useEnableShelterMutation, useGetShelterByIdQuery } from "../../redux/api/shelters";
import OngFormUpdate from "./OngFormUpdate";
import NavBar from "../Navbar/Navbar";
import CreatePostModal from "../Home/ModalCreatePost";
import Spinner from "../Spinner/Spinner";
import ModalDonate from "./Donate/ModalDonate";
import MapView from "../Maps/MapView/MapView";
import { useSelector } from "react-redux";
import Posts from "./Posts";
import ShelterStats from "./ShelterStats";
import Description from "./Description";
import Swal from "sweetalert2";

const OngDetail = () => {
  const { id } = useParams();
  let [isOpenDonate, setIsOpenDonate] = useState(false);
  const navigate = useNavigate();
  const {
    data: details,
    isLoading,
    refetch: shelterRefetch,
	error
  } = useGetShelterByIdQuery(id);
  if (error){
	Swal.fire({icon:'error',
			   title: 'Invalid Shelter ID',
  				})
				navigate('/home')
  } 
  const { userDetail } = useSelector((state) => state.localStorage.userState);
  const [isOpen, setIsOpen] = useState(false);
  const closeModalDonate = () => setIsOpenDonate(false);
  const closeModal = () => setIsOpen(false);
  console.log('error', error)
 
  useEffect(()=>{
      shelterRefetch() 
  },[isOpen])

  return (
		<div className="w-full bg-[#fff5f4]">
			<NavBar />
			{isLoading ? (
				<Spinner />
			) : (
				<div className="flex flex-col w-full lg:flex-row">
					<div className="flex flex-col items-center w-full">
						{details?.description?.length > 0 && (
							<OngFormUpdate
								name={details?.name}
								country={details?.country}
								city={details?.city}
								address={details?.address}
								website={details?.website}
								description={details?.description}
								setIsOpenDonate={setIsOpenDonate}
								shelter={details}
							/>
						)}
						<ShelterStats
							shelterId={id}
							details={details}
							userDetail={userDetail}
							shelterRefetch={shelterRefetch}
						/>
					</div>
					<div className="flex flex-col w-full mt-16">
						<div className="flex flex-col items-center mb-4">
							<Description id={id} details={details} />
							<MapView
								name={details?.name}
								lat={details?.lat}
								lon={details?.lon}
								id={id}
								shelter={details}
							/>
							<div className="overflow-y-scroll h-[50rem] mt-10">
								<Posts setIsOpen={setIsOpen} details={details} />
							</div>
						</div>
					</div>
					<CreatePostModal isOpen={isOpen} closeModal={closeModal} />

					<ModalDonate
						isOpen={isOpenDonate}
						closeModal={closeModalDonate}
						name={details.name}
						id={id}
					/>
				</div>
			)}
		</div>
		// 			<CreatePostModal isOpen={isOpen} closeModal={closeModal} />

		// 			<ModalDonate
		// 				isOpen={isOpenDonate}
		// 				closeModal={closeModalDonate}
		// 				name={details.name}
		// 				id={id}
		// 			/>
		// 		</div>
		// 	) : (
		// 		<Spinner />
		// 	)}
		// </div>
	)
};

export default OngDetail;
