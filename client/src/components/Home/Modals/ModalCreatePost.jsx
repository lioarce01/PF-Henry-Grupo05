import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Formulario from "../PostForm";
import { useSelector } from "react-redux";

const CreatePostModal = ({ isOpen, closeModal }) => {
  const { darkmode } = useSelector(state => state.localStorage.manageTheme)
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={darkmode?"relative z-50 dark":"relative z-50"} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-75" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-[#1B1A1F] text-left align-middle dark:shadow-[#E06161] shadow-[#FF7272] shadow-xl transition-all">
                <Formulario  closeModal={closeModal}/>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreatePostModal;
