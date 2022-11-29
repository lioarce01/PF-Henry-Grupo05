import { Transition, Dialog } from '@headlessui/react'
import { Fragment } from "react";
import Formulario from "./FormDonate"
import React from 'react'
import { useSelector } from "react-redux"

const ModalDonate = ({ isOpen, closeModal, name, shelterId, goalId }) => {
	const { darkmode } = useSelector((state) => state.localStorage.manageTheme)

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className={darkmode ? "relative z-10 dark" : "relative z-10"}
				onClose={closeModal}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-25" />
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
							<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[#1B1A1F] text-left align-middle shadow-lg shadow-[#E06161] transition-all">
								<Formulario
									closeModal={closeModal}
									name={name}
									shelterId={shelterId}
									goalId={goalId}
								/>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default ModalDonate