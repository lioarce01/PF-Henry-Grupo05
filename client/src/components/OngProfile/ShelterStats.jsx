import React from "react";
import { RiUserFollowLine, RiUserUnfollowLine } from "react-icons/ri";
import { useAddFollowersMutation, useDeleteFollowersMutation, useUpdateShelterMutation } from "../../redux/api/shelters";

function ShelterStats({ shelterId, userDetail, details }) {
    const [unfollow] = useDeleteFollowersMutation()
    const [follow] = useAddFollowersMutation()
    const [updateShelter] = useUpdateShelterMutation();
    
    

    const deleteFollow = () => {
        unfollow({shelterId, userId: userDetail.id })
        updateShelter({id: shelterId, followers: details?.followers})
    }

    const addFollow = () => {
        follow({shelterId, userId: userDetail.id})
        updateShelter({id: shelterId, followers: details?.followers})
    }

  return (
    <>
      <div>
        <h1 className="text-xl">Shelter stats</h1>
      </div>
      <div className="border-2 border-black rounded-md w-[360px] my-2 p-2">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col">
            <p>
              Followers: <span>{details?.followers?.length}</span>
            </p>
            <p>
              Posts: <span>{details?.posts?.length}</span>
            </p>
            <p>
              Donations: <span>{details?.donations?.length}</span>
            </p>
            <p>
              Budget: <span>{details?.budget}</span>
            </p>
            <p>
              Goal: <span>{details?.goal}</span>
            </p>
          </div>
          <div>
            {userDetail?.following?.find(
              (shelter) => shelter.id === details.id
            ) ? (
              <button
                className="bg-transparent hover:bg-[#d32727] bg-[#b90707] text-white transition duration-300 font-semibold hover:text-white py-1 px-4 hover:border-transparent rounded flex flex-row items-center justify-center border"
                onClick={deleteFollow}
              >
                Unfollow{" "}
                <span className="pl-2">
                  <RiUserUnfollowLine />
                </span>
              </button>
            ) : (
              <button
                className="bg-transparent hover:bg-[#24c531] bg-[#22b92f] transition duration-300 text-white font-semibold hover:text-white py-1 px-4 border hover:border-transparent rounded flex flex-row items-center justify-center"
                onClick={addFollow}
              >
                Follow{" "}
                <span className="pl-2">
                  <RiUserFollowLine />
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShelterStats;
