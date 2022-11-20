import React from "react";
import { getTimeAgo } from "../../utils";
import { Link } from "react-router-dom";

const AuthorData = ({ details }) => {
  return (
		<div className="flex flex-row">
			<img
				src={details.author.profilePic}
				alt="avatar"
				className="object-cover mr-4 rounded-full shadow w-14 h-14"
			/>
			<div className="flex flex-col justify-center">
				<Link to={`/${details.shelterId}/profile`} className="object-cover">
					<div className="flex flex-col items-start">
						<h2 className="-mt-1 text-lg font-semibold text-gray-900">
							{details.author.name}
						</h2>
					</div>
				</Link>
				<div className="flex flex-row">
					<small className="px-2 py-1 h-[28px] text-sm text-white font-semibold rounded-md bg-[#6D91E9]">
						{getTimeAgo(details.createdAt)}
					</small>
				</div>
			</div>
		</div>
	)
};

export default AuthorData;
