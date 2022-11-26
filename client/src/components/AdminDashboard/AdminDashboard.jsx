import React, { useState } from "react";
import { useGetSheltersQuery } from "../../redux/api/shelters";
import {
  useConvertAdminMutation,
  useGetUsersQuery,
} from "../../redux/api/users";
import {
  useDisableShelterMutation,
  useEnableShelterMutation,
} from "../../redux/api/shelters";
import {
  useDisableUserMutation,
  useEnableUserMutation,
} from "../../redux/api/users";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/manageUsers";
import toast, { Toaster } from "react-hot-toast";
import TicketList from "../TicketList";
import { useGetTicketsQuery } from "../../redux/api/tickets";

const AdminDashboard = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [user, setUser] = useState("");
  const [shelter, setShelter] = useState("");
  const { data: users, userLoading } = useGetUsersQuery({user, enable: true});
  const { data: shelters, shelterLoading } = useGetSheltersQuery({name: shelter})
  const {data: tickets, isLoading, error,} = useGetTicketsQuery()
  
	const [disableShelter] = useDisableShelterMutation()
	const [enableShelter] = useEnableShelterMutation()
	const [disableUser] = useDisableUserMutation()
	const [enableUser] = useEnableUserMutation()
	const [convertAdmin, { data }] = useConvertAdminMutation()
	const { userDetail } = useSelector(selectUser)

	const handleUserInput = (e) => {
		e.preventDefault()
		setUser(e.target.value)
	}

	const handleShelterInput = (e) => {
		e.preventDefault()
		setShelter(e.target.value)
	}

  const disableUserHandler = (id) => {
    disableUser({ userId: id });
  };

  const enableUserHandler = (id) => {
    enableUser({ userId: id });
  };

  const disableShelterHandler = (id) => {
    disableShelter({ shelterId: id });
  };

  const enableShelterHandler = (id) => {
    enableShelter({ shelterId: id });
  };

  const convertUserToAdmin = async (id) => {
    const accessToken = await getAccessTokenSilently();
    const myPromise = convertAdmin({
      adminId: userDetail.id,
      userId: id,
      accessToken,
    });
    toast.promise(myPromise, {
      loading: "Converting to admin..",
      success: `${data.payload.name} is now admin`,
      error: "Error when fetching",
    });
  };

  const removeAdmin = async (id) => {
    const accessToken = await getAccessTokenSilently();
    const myPromise = convertAdmin({
      adminId: userDetail.id,
      userId: id,
      accessToken,
      removeAdmin: true,
    });

    toast.promise(myPromise, {
      loading: "Removing admin..",
      success: `${data.payload.name} is no longer admin`,
      error: "Error when fetching",
    });
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen bg-red-100 ">
      <Toaster />
      <div className="flex flex-col justify-center w-full lg:flex-row">
        <div className="flex flex-col w-full lg:w-[500px] items-center mx-2">
          <h2 className="py-4 text-2xl font-bold">Users</h2>
          <div className="flex flex-row p-2 my-2">
            <input
              type="text"
              className="px-2 py-2 mr-2 rounded-md outline-none"
              placeholder="search an user"
              onChange={handleUserInput}
              value={user}
            />
            <button className="px-2 py-1 transition duration-300 border-2 border-red-700 rounded-md hover:bg-red-700 hover:text-white">
              Search
            </button>
          </div>
          <div className="flex flex-row bg-red-200 h-[600px] overflow-y-scroll rounded-md w-[85%] md:w-[500px] lg:w-full my-4">
            <ul className="flex flex-col w-full p-2">
              {userLoading ? (
                <div>Loading...</div>
              ) : (
                users?.map((user) => (
                  <li
                    key={user.id}
                    id={user.id}
                    className="flex flex-row items-center justify-between p-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold">{user.name}</span>
                    </div>
                    <div className="flex flex-row">
                      {user.role === "Admin" ? (
                        <button
                          onClick={() => removeAdmin(user.id)}
                          className="px-2 py-1 mr-1 text-white bg-red-500 rounded-md"
                        >
                          remove admin
                        </button>
                      ) : (
                        <button
                          onClick={() => convertUserToAdmin(user.id)}
                          className="px-2 py-1 mr-1 text-white bg-blue-500 rounded-md"
                        >
                          convert to admin
                        </button>
                      )}
                      {user.enable === true ? (
                        <button
                          className="px-2 py-1 text-white bg-red-500 rounded-md"
                          onClick={() => disableUserHandler(user.id)}
                        >
                          Disable
                        </button>
                      ) : (
                        <button
                          className="px-2 py-1 text-white bg-green-500 rounded-md"
                          onClick={() => enableUserHandler(user.id)}
                        >
                          Enable
                        </button>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-[500px] items-center mx-2 ">
          <h2 className="py-4 text-2xl font-bold">Shelters</h2>
          <div className="flex flex-row p-2 my-2">
            <input
              type="text"
              className="px-2 py-2 mr-2 rounded-md outline-none"
              placeholder="search a shelter"
              onChange={handleShelterInput}
              value={shelter}
            />
            <button className="px-2 py-1 transition duration-300 border-2 border-red-700 rounded-md hover:bg-red-700 hover:text-white">
              Search
            </button>
          </div>
          <div className="flex flex-row bg-red-200 h-[600px] overflow-y-scroll rounded-md w-[85%] md:w-[500px] lg:w-full my-4">
            <ul className="flex flex-col w-full p-2">
              {shelterLoading ? (
                <div>Loading...</div>
              ) : (
                shelters?.map((shelter) => (
                  <li
                    key={shelter.id}
                    id={shelter.id}
                    className="flex flex-row items-center justify-between p-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold">{shelter.name}</span>
                    </div>
                    <div className="flex flex-row">
                      <button className="px-2 py-1 mr-1 text-white bg-blue-500 rounded-md">
                        Edit
                      </button>
                      {shelter.enable === true ? (
                        <button
                          className="px-2 py-1 text-white bg-red-500 rounded-md"
                          onClick={() => disableShelterHandler(shelter.id)}
                        >
                          Disable
                        </button>
                      ) : (
                        <button
                          className="px-2 py-1 text-white bg-green-500 rounded-md"
                          onClick={() => enableShelterHandler(shelter.id)}
                        >
                          Enable
                        </button>
                      )}
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
      <TicketList tickets={tickets} />
    </div>
  );
};

export default AdminDashboard;
