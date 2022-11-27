import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useDisableShelterMutation,
  useEnableShelterMutation,
  useGetShelterByIdQuery,
} from "../../redux/api/shelters";
import OngFormUpdate from "./OngFormUpdate";
import NavBar from "../Navbar/Navbar";
import CreatePostModal from "../Home/Modals/ModalCreatePost";
import Spinner from "../Spinner/Spinner";
import ModalDonate from "./Donate/ModalDonate";
import MapView from "../Maps/MapView/MapView";
import { useDispatch, useSelector } from "react-redux";
import Posts from "./Posts";
import ShelterStats from "./ShelterStats";
import Description from "./Description";
import Swal from "sweetalert2";
import { useLazyGetUserByIdQuery } from "../../redux/api/users";
import { setUserAction } from "../../redux/slices/manageUsers/actions";
import Goals from "../Goals/Goals";

const OngDetail = () => {
  const { id } = useParams();
  let [isOpenDonate, setIsOpenDonate] = useState(false);
  const navigate = useNavigate();
  const {
    data: details,
    isLoading,
    refetch: shelterRefetch,
    error,
  } = useGetShelterByIdQuery(id);
  if (error) {
    Swal.fire({ icon: "error", title: "Invalid Shelter ID" });
    navigate("/home");
  }
  const { userDetail } = useSelector((state) => state.localStorage.userState);
  const [isOpen, setIsOpen] = useState(false);
  const closeModalDonate = () => setIsOpenDonate(false);
  const closeModal = () => setIsOpen(false);
  const [enableShelter] = useEnableShelterMutation();
  const [getUser] = useLazyGetUserByIdQuery()
  const dispatch = useDispatch()

  const enable = async (id) => {
	await enableShelter(id).unwrap()
	let newUser = await getUser(userDetail.id).unwrap()
	dispatch(setUserAction(newUser, true))
  }

  useEffect(() => {
    shelterRefetch();
  }, [isOpen]);

  useEffect(() => {
    if(details?.enable === false) {
		Swal.fire({
			title: "Your shelter is disabled, do you want to activate it?",
			showDenyButton: true,
			confirmButtonText: "Yes",
			denyButtonText: "No",
			customClass: {
			  actions: "my-actions",
			  confirmButton: "order-2",
			  denyButton: "order-3",
			},
		  }).then((result) => {
			if (result.isConfirmed) {
			  enable({shelterId: id})
			  Swal.fire("Your shelter is now enabled!", "", "success");
			} else if (result.isDenied) {
			  Swal.fire("Your shelter is still disabled", "", "info");
			}
		  });
	}
  }, [details]);

  return (
		<div className="w-full h-screen bg-[#fff5f4]">
			{/* <NavBar /> */}
			{isLoading ? (
				<div
					className={
						isLoading
							? "w-screen h-screen flex flex-col place-content-center"
							: "fixed top-0"
					}
				>
					<Spinner />
				</div>
			) : (
				<div className="flex flex-col w-full lg:flex-row lg:justify-between lg:px-4">
					<div className="flex flex-col items-center w-full  lg:order-1 lg:mt-4 lg:w-[25%] lg:min-w-[250px] lg:ml-1 ">
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
					<div className="flex flex-col w-full mt-4 lg:order-3 lg:w-[30%] lg:min-w-[300px] lg:mt-4 ">
						<div className="flex flex-col items-center mb-4 lg:mb-0">
							<Description id={id} details={details} />
							<MapView
								name={details?.name}
								lat={details?.lat}
								lon={details?.lon}
								id={id}
								shelter={details}
							/>
						</div>
					</div>
					<div className="flex flex-col items-center w-full mt-8 lg:relative lg:left-2 lg:order-2 lg:w-[40%] lg:min-w-[400px] lg:mt-4">
						<Goals
							goals={details?.goals}
							setIsOpenDonate={setIsOpenDonate}
							shelterName={details?.name}
							shelterId={details?.id}
							shelterRefetch={shelterRefetch}
						/>
						<Posts setIsOpen={setIsOpen} details={details} />
					</div>
					<CreatePostModal isOpen={isOpen} closeModal={closeModal} />

					{/* <ModalDonate
            isOpen={isOpenDonate}
            closeModal={closeModalDonate}
            name={details.name}
            id={id}
          /> */}
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
