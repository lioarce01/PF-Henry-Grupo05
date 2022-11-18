import React, { useState } from "react"
import ContentInput from "./ContentInput"
import UploadImage from "./UploadInput"
import { AiOutlineClose } from "react-icons/ai"
import { useAddNewPostMutation } from "../../../redux/api/posts"
import toast from "react-hot-toast"
import { useAuth0 } from "@auth0/auth0-react"
import { useSelector } from "react-redux"



const PostForm = ({ closeModal }) => {
	const [content, setContent] = useState("")
	const [image, setImage] = useState(false)
	const { getAccessTokenSilently } = useAuth0()
	const { userDetail } = useSelector((state) => state.localStorage.userState)

	const [addNewPost, {}] = useAddNewPostMutation()

	const onSubmit = async (e) => {
		e.preventDefault()
		const accessToken = await getAccessTokenSilently()
		if (!image || !content) return alert("content and image are needed")
		const newPost = {
			content,
			image,
			shelterId: userDetail.Shelter[0].id,
			authorId: userDetail.id,
		}
		console.log("shelter: ", userDetail.Shelter[0])
		const myPromise =  addNewPost({ accessToken, newPost })
		toast.promise(myPromise, {
			loading: "Creating post",
			success: "Post created",
			error: "There was an error creating post",
		})
		setContent("")
		setImage(false)
	}

	return (
		<div className="">
			<div className="sm:max-w-lg  max-w-full p-10 bg-[#FAF2E7] rounded-xl z-10">
				<div className="flex items-center justify-end">
					<button onClick={closeModal}>
						<AiOutlineClose className="flex w-6 h-6 " />
					</button>
				</div>
				<div className="text-center">
					<h2 className="text-3xl font-bold text-[#462312]">Create Post</h2>
				</div>
				<form onSubmit={onSubmit} className="mt-8 space-y-3">
					<ContentInput content={content} setContent={setContent} />
					<UploadImage image={image} setImage={setImage} />
					<p className="text-sm text-gray-300">
						<span>File type: types of images</span>
					</p>
					<div>
						<button
							type="submit"
							className="my-5 w-[60%] mx-auto flex justify-center bg-[#ca7c62] text-gray-100 p-3  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-[#462312] shadow-lg cursor-pointer transition ease-in duration-300">
							CREATE
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default PostForm
