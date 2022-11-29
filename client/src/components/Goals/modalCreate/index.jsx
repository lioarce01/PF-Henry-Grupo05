import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useSelector } from "react-redux"
import FormCreate from "./FormCreate"

const ModalCreate = ({ isOpen, closeModal, shelterId, shelterRefetch }) => {
	const { darkmode } = useSelector((state) => state.localStorage.manageTheme)
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className={darkmode ? "relative z-50 dark" : "relative z-50"}
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
					<div className="flex items-center justify-center min-h-full p-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="w-full max-w-md overflow-hidden text-left align-middle transition-all bg-white dark:bg-[#27242C] transform shadow-lg shadow-[#E06161] dark:shadow-[#E06161] rounded-2xl">
								<FormCreate
									shelterId={shelterId}
									closeModal={closeModal}
									shelterRefetch={shelterRefetch}
								/>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	)
}

export default ModalCreate