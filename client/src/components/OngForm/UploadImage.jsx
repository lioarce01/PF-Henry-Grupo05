import React from "react"
import { uploadImage } from "../../utils"

const UploadImage = ({ image, setImage }) => {
	const handlerChange = async (e) => {
		const { image } = await uploadImage("preset_posts", e.target.files[0])
		setImage(image)
	}

	const resetImage = () => setImage(false)

	return (
		<div className="flex flex-col items-center justify-center w-full">
			<label className="text-xl font-bold text-[#000000] tracking-wide after:content-['*'] after:ml-0.5 after:text-red-500">
				Upload image
			</label>
			{image && (
				<button
					type="button"
					onClick={resetImage}
					className="text-black w-fit px-2  mx-auto border border-[#e6b1ae] rounded-xl hover:border-black">
					reset
				</button>
			)}
			<div className="flex items-center justify-center border-2  max-w-[700px] h-auto bg-[#e6b1ae]">
				{image ? (
					<img alt="uplouted" src={image} className="object-cover" />
				) : (
					<label
						draggable="true"
						className="flex flex-col rounded-lg border-[#E1D7D3] border-4  border-dashed w-full h-60 p-10 group text-center cursor-pointer">
						<div className="flex flex-col items-center justify-center w-full h-full text-center ">
							<div className="flex flex-auto w-2/5 mx-auto max-h-48 ">
								<img
									className="object-center has-mask h-36"
									src="https://i.pinimg.com/originals/00/65/ee/0065ee133294c73fe29dbab81dc6acc9.png"
									alt="freepik"
								/>
							</div>
							<div className="text-black pointer-none ">
								<p className="text-[#080706] font-bold">select a file</p> from
								your computer
							</div>
						</div>
						<input
							onChange={handlerChange}
							accept="image/*"
							multiple
							draggable
							type="file"
							className="hidden"
						/>
					</label>
				)}
			</div>
		</div>
	)
}

export default UploadImage
