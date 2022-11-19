import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { useEffect, useState } from "react";
import { useLazyGetUserByIdQuery } from "../../redux/api/users";
import UserProfileCardPost from "./UserProfileCardPost";
import UpdateProfileButton from "./UpdateProfileButton";
import Footer from "../Landing/Footer/Footer";
import { useSelector } from "react-redux";
import ModalUserSheltersFollowed from "./ModalUserSheltersFollowed";
import { RiImageEditFill } from "react-icons/ri"
import { uploadImage } from "../../utils";
import { useUpdateUserMutation } from "../../redux/api/users";
import { useAuth0 } from "@auth0/auth0-react";
import { userSchema } from './validationUserForm';
import { useFormik } from 'formik';

const UserProfile = () => {
	const { userId } = useParams();
	const [getUserById, { data: details }] = useLazyGetUserByIdQuery();
	const { userDetail, isAuth } = useSelector((state) => state.localStorage.userState)
	const [isOpen, setIsOpen] = useState(false);
	const [editMode, setEditMode] = useState(false);
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

	const onSubmit = async (e) => {
		e.preventDefault()
		const accessToken = await getAccessTokenSilently()
		await updateUser({accessToken, userId: userDetail.id, updatedUser: values}).then(res => alert('User Created')).catch(() => alert('error'));
		setEditMode(false);
	}
	const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
		initialValues: {
			name: '',
			email: '',
		},
		validationSchema: userSchema,
		onSubmit,
	})

	const manageCancelButton = () => {
		setEditMode(false)
	}

	return (
		<div className="bg-[#fff5f4]">
			<Navbar />
			<div className="mt-8 grid grid-cols-3 grid-rows-1 w-5/6 h-5/6 mx-auto">
				<div class="mt-16 bg-[#f3a199cc] max-w-md rounded-[3em] mx-auto shadow-[16px_30px_25px_-12px_rgba(255,196,181,1)] overflow-hidden min-w-[23vw]">
					<div className="group/item z-0">
						<img class="rounded-t-[3em] max-h-[45vh] min-w-[23vw] object-cover bg-[#f5d0cccb] z-1 mb-4" src={details?.profilePic} alt="profilePic" />
						{
							isAuth && userDetail.id === userId &&
								<div className="group/edit invisible opacity-0 cursor-pointer group-hover/item:visible z-20 group-hover/item:opacity-100 duration-500 translate-y-[-5.5rem] translate-x-[23rem] bg-[#ffffff60] backdrop-blur-sm w-[4rem] h-[4rem] rounded-full absolute align-middle">
									<button htmlFor="changeUserImg" className="z-20 text-[3rem] text-center text-slate-100 max-w-8 max-h-8 translate-x-2 translate-y-2 cursor-pointer hover:cursor-pointer">
										<RiImageEditFill className="z-30 cursor-pointer hover:cursor-pointer"/>
									</button>
									<input type="file" className="z-40 opacity-0 w-16 h-16 cursor-pointer hover:cursor-pointer translate-y-[-3rem]" name="changeUserImg" onChange={(e) => updateUserImage(e)}/>
								</div>
						}
					</div>
					<div class="container">
						<div class="flex flex-col h-full justify-between">
							{ editMode ?
								<form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-1 text-center">
									<div className="w-fit mx-auto">
										<label className="text-md font-bold">Name: </label>
										<input type="text"
											value={values.name}
											name='name'
											placeholder='Add name...'
											onChange={handleChange}
											onBlur={handleBlur}
											className="bg-transparent placeholder-white font-medium opacity-50"
										/>
										{errors.name && <p className='text-red-500'>{errors.name}</p>}
									</div>
									<div className="">
										<label className="text-md font-bold">Email: </label>
										<input type="email" value={values.email} name='email' placeholder='Add your email..' onChange={handleChange} onBlur={handleBlur} className="bg-transparent" />
										{errors.email && <p className='text-red-500'>{errors.email}</p>}
          							</div>
									<div className="flex flex-row gap-4 justify-center mt-2">
										{errors ? <button class="bg-[#eb8076cc] text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed">Save</button> : <button type="submit">Save</button>}
										<button onClick={manageCancelButton}>Cancel</button>
									</div>
								</form>
								:
								<div className="dark:text-black shadow-white">
									<div className="flex flex-row justify-center">
										<h5 class="mb-2 text-2xl font-bold tracking-tight drop-shadow-md text-center shadow-white">
											{details?.name} 
										</h5>
										<UpdateProfileButton userId={userId} setEditMode={setEditMode} editMode={editMode}/>
									</div>
									<h6 class="mb-3 font-normal text-gray-700 drop-shadow-md text-center">
										{details?.email}
									</h6>
								</div>
							}
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
				<div className="col-span-2">
					<h5 class="mt-2 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-black drop-shadow-md text-center">Posts</h5>
					{
						details?.posts?.length > 0 ?
							<div class="ml-4 overflow-auto max-h-[39rem] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#dd7d5d] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md">
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
				userId={userId}
			/>
		</div>
	);
};

export default UserProfile;
