import React, { useEffect } from 'react';
import { Dialog, Transition} from "@headlessui/react";
import { Fragment } from "react"
import UserSheltersFollowedCard from './UserSheltersFollowedCard';
import { useLazyGetUserByIdQuery } from '../../redux/api/users';
import Spinner from '../Spinner/Spinner';

function ModalUpdateUser({isOpen, setIsOpen, userId}) {

    const closeModal = () => {
        setIsOpen(false);
    }

    const [getUserById, { data: details }] = useLazyGetUserByIdQuery();
    
    useEffect(() => {
		getUserById(userId);
	}, [getUserById, userId]);
	console.log(details?.following);

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
                <Dialog.Panel className=" max-w-fit transform overflow-hidden rounded-2xl text-left align-middle  transition-all flex flex-row">
                    <div className='w-auto max-w-[60vw] h-auto bg-[#fff5f4] my-auto p-10 overflow-y-scroll z-10 flex flex-row flex-wrap justify-center scrollbar-thin scrollbar-thumb-[#dd7d5d] scrollbar-track-none scrollbar-thumb-height scrollbar-thumb-rounded-md'>
                        <h3 className='text-black font-bold text-[3em] z-20 w-full h-fit mb-0 text-center drop-shadow-md'>Following</h3>
                        { details?.following.length > 0 ?
                            details.following.map((shelter) => {
                                return (
                                    <UserSheltersFollowedCard
                                        profilePic={shelter.profilePic}
                                        name={shelter.name}
                                        city={shelter.city}
                                        description={shelter.description}
                                        id={shelter.id}
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