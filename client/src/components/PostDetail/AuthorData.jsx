import React from "react";
import { getTimeAgo } from "../../utils";
import { Link } from "react-router-dom";

const AuthorData = ({ details }) => {
  return (
    <>
      <img
        src={details.author.profilePic}
        alt="avatar"
        className="object-cover mr-4 rounded-full shadow w-14 h-14"
      />
      <div className="flex items-center ">
        <Link
          to={`/${details.shelterId}/profile`}
          className="object-cover w-max "
        >
          <div className="flex flex-col items-start">
            <h2 className="-mt-1 text-lg font-semibold text-gray-900">
              {details.author.name}
            </h2>
            <small className="text-sm text-gray-700">
              {getTimeAgo(details.createdAt)}
            </small>
          </div>
        </Link>
      </div>
    </>
  );
};

export default AuthorData;
