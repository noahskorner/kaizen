import './modal.css';
import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  children: React.ReactNode;
  onCloseModal: () => void;
}

export const Modal = ({ isOpen, children, onCloseModal }: ModalProps) => {
  return isOpen ? (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
      <div
        onClick={onCloseModal}
        className="absolute bottom-0 left-0 right-0 top-0 z-0 h-full w-full bg-neutral-950 bg-opacity-20 backdrop-blur-[2px]"></div>
      <div className="bg-neutral-0 fixed bottom-0 z-10 h-[90%] w-full overflow-y-auto rounded-xl shadow-md md:relative md:bottom-auto md:h-auto md:max-w-lg md:rounded-md">
        <div className="flex h-full flex-col items-stretch">{children}</div>
      </div>
    </div>
  ) : null;
};
