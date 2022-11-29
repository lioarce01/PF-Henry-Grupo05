import { Transition, Dialog } from '@headlessui/react'
import DescriptionWindow from './DescriptionWindow';
import { Fragment } from "react";
import { useSelector } from 'react-redux';

const ModalDescription = ({ isOpen, closeModal, details, shelterRefetch }) => {
  const { darkmode } = useSelector(state => state.localStorage.manageTheme)
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={darkmode?"relative z-10 dark":"relative z-10"} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black dark:bg-opacity-75 bg-opacity-25" />
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
              <Dialog.Panel className=" transform overflow-hidden bg-transparent  align-middle  transition-all">
                {/* aca se renderizan cosas */}
                <DescriptionWindow details={details} shelterRefetch={shelterRefetch} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default ModalDescription