import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

const Modal = ({ isOpen, setIsOpen, image }) => {
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-20 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-700/60" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                {image && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-medium text-gray-900"
                      >
                        {image.description ? image.description : image.url}
                      </Dialog.Title>
                      <img
                        alt={image.altText ? image.altText : image.url}
                        src={`https://raw.githubusercontent.com/hackclub/dinosaurs/main/${image.url}`}
                        className={"mt-4"}
                        title={image.altText ? image.altText : image.url}
                      />
                    </p>
                  </div>
                )}

                <div className="mt-4 flex items-center w-full justify-end">
                  <button
                    type="button"
                    className="px-4 py-2 font-medium bg-gradient-to-r from-green-200 hover:from-green-300 via-blue-300 hover:via-blue-400 to-purple-300 hover:to-purple-400 rounded-md"
                    onClick={closeModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Modal;
