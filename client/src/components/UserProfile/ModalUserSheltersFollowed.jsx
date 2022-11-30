import React, { useEffect } from 'react';
import { Dialog, Transition} from "@headlessui/react";
import { Fragment } from "react"
import UserSheltersFollowedCard from './UserSheltersFollowedCard';
import { useGetUserByIdQuery, useLazyGetUserByIdQuery } from '../../redux/api/users';
import Spinner from '../Spinner/Spinner';
import { useSelector } from 'react-redux';

function ModalUpdateUser({isOpen, setIsOpen, userId}) {

    const closeModal = () => {
        setIsOpen(false);
        userRefetch()
    }

    const { userDetail, isAuth } = useSelector((state) => state.localStorage.userState)
    const [getUserById, { data: details }] = useLazyGetUserByIdQuery();
    const { data: userDetails, refetch: userRefetch } = useGetUserByIdQuery(
		userDetail?.id
	)
    
    useEffect(() => {
		getUserById(userId);
	}, [getUserById, userId]);


    let logedInUserFollowingShelters = isAuth ? userDetails?.following?.map((shelter) => shelter.id) : [];

    const { darkmode } = useSelector(state => state.localStorage.manageTheme)
    // console.log(`Shelters que sigue ${userDetail.name}:`,logedInUserFollowingShelters);
    // console.log(`Shelters que sigue ${details?.name}:`, details?.following?.map(shelter => {return {"name": shelter.name, "id": shelter.id}}));

    return (
    <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
        >
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <Dialog.Panel className={darkmode ? `max-w-fit transform overflow-hidden rounded-2xl text-left align-middle  transition-all flex flex-row dark` : `max-w-fit transform overflow-hidden rounded-2xl text-left align-middle  transition-all flex flex-row`}>
                    <div className='xl:w-auto xl:max-w-[55vw] xl:h-auto xl:max-h-[70vh] sm:w-[85vw] sm:h-auto xsm:w-[80vw] bg-[#EFF0F3] dark:bg-[#3b3742] my-auto p-10 overflow-y-scroll z-10 flex flex-row flex-wrap justify-center scrollbar-thin scrollbar-thumb-[#FF7272] dark:scrollbar-thumb-[#E06161] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md'>
                        <h3 className='text-[#838788] font-bold text-[3em] z-20 w-full h-fit mb-0 text-center drop-shadow-md dark:text-[#AFB3B4]'>Following</h3>
                        { details?.following.length > 0 ?
                            details.following.map((shelter) => {
                                
                                let isFollowing = logedInUserFollowingShelters.includes(shelter.id)

                                return (
                                    <UserSheltersFollowedCard
                                        profilePic={shelter.profilePic}
                                        name={shelter.name}
                                        city={shelter.city}
                                        id={shelter.id}
                                        isFollowing={isFollowing}
                                    />
                                )
                            })
                            :
                            <Spinner/>
                        }
                    </div>
                </Dialog.Panel>
            </Transition.Child>
            </div>
        </div>
        </Dialog>
    </Transition>
    )
}

export default ModalUpdateUser