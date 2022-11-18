import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { useLazyGetUserByIdQuery } from "../../redux/api/users";
import UserProfileCardPost from "./UserProfileCardPost";
import ONGCard from "../Home/ONGCard";
import Spinner from "../Spinner/Spinner";
import UpdateProfileButton from "./UpdateProfileButton";
import Footer from "../Landing/Footer/Footer";
import { useSelector } from "react-redux";
import ModalUserSheltersFollowed from "./ModalUserSheltersFollowed";
import { RiImageEditFill } from "react-icons/ri"
import { uploadImage } from "../../utils";
import { useUpdateUserMutation } from "../../redux/api/users";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfile = () => {
	const { userId } = useParams();
	const [getUserById, { data: details }] = useLazyGetUserByIdQuery();
	const { userDetail, isAuth } = useSelector((state) => state.localStorage.userState)
	const [isOpen, setIsOpen] = useState(false);
	const [updateUser, {}] = useUpdateUserMutation();
	const { getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		getUserById(userId);
	}, [getUserById, userId]);
	console.log(details, isOpen);

	const manageSheltersFollowedButton = () => {
		setIsOpen(true)
	}

	const updateUserImage = async (e) => {
		const { image } = await uploadImage("preset_posts", e.target.files[0])
		let accessToken = await getAccessTokenSilently();
		updateUser({ accessToken, userId, updatedUser: {profilePic: image}})
	}

	return (
		<div className="bg-[#fff5f4]">
			<Navbar />
			<div className="mt-8 grid grid-cols-3 grid-rows-1 w-5/6 h-4/6 mx-auto">
				<div class="mt-16 bg-[#f3a199cc] max-w-md rounded-[3em] mx-auto shadow-[16px_30px_25px_-12px_rgba(255,196,181,1)] max-h-[43.5rem]">
					<div className="group/item z-1">
						<img class="rounded-t-[3em] min-h-[30rem] min-w-[27rem] object-cover bg-[#f5d0cccb] z-1" src={details?.profilePic} alt="profilePic" />
						{
							isAuth && userDetail.id === userId &&
							<div className="group/edit invisible opacity-0 group-hover/item:visible z-2 group-hover/item:opacity-100 duration-500 translate-y-[-4.5rem] translate-x-[23.5rem] bg-[#ffffff60] backdrop-blur-sm w-[4rem] h-[4rem] rounded-full absolute align-middle">
							<button className="text-[3rem] text-center text-slate-100 translate-x-2 translate-y-2" onClick={updateUserImage}>
								<RiImageEditFill />
							</button>
						</div>
						}
					</div>
					<div class="p-5 h-auto">
						<div class="flex flex-col h-full justify-between">
							<div className="dark:text-black shadow-white">
								<div className="flex flex-row justify-center">
									<h5 class="mb-2 text-2xl font-bold tracking-tight drop-shadow-md text-center shadow-white">
										{details?.name} 
									</h5>
									<UpdateProfileButton userId={userId}/>
								</div>
								<h6 class="mb-3 font-normal text-gray-700 drop-shadow-md text-center">
									{details?.email}
								</h6>
							</div>
							<div className="flex flex-row justify-center gap-6 content-end mt-4">
								<button className="p-2 mb-3 font-bold text-gray-700 drop-shadow-md text-center rounded-md hover:bg-[#f7dfdc88] duration-300" onClick={manageSheltersFollowedButton}>
									<span>
										{details?.shelterFollow?.length}
									</span>
									<span className="ml-2 font-normal">
										following
									</span>
								</button>
								<span className="p-2 mb-3 font-bold text-gray-700 drop-shadow-md text-center">
									<span>
										Role:
									</span>
									<span className="ml-2 font-normal">
										{details?.role}
									</span>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div>
					<h5 class="mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black drop-shadow-md text-end">Posts</h5>
					{
						details?.posts?.length > 0 ?
							<div class="ml-4 overflow-auto w-[60rem] max-h-[43.5rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#dd7d5d] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md">
								{details?.posts?.map((post) => {
									return (
										<UserProfileCardPost
											key={post.id}
											id={post.id}
											profilePic={details.profilePic}
											postImage={post.image}
											author={details.name}
											content={post.content}
											likes={post.likes}
											createdAt={post.createdAt}
											authorId={post.authorId}
										/>
									);
								})}
							</div>
							:
							(
								<div>
									<h6>User has no Posts</h6>
								</div>
							)
					}
				</div>
			</div>
			<Footer />
			<ModalUserSheltersFollowed
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		</div>
	);
};

export default UserProfile;
