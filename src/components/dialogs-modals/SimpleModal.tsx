import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Toaster } from "sonner";

interface ModalProps {
  children: React.ReactNode;
}

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalHandle, ModalProps>(({ children }, ref) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      modalRef.current?.showModal();
    },
    close: () => {
      modalRef.current?.close();
    },
  }));

  return (
    <dialog ref={modalRef} className="modal">
      <Toaster theme="dark" richColors />
      <div className="modal-box">
        {children}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={() => modalRef.current?.close()}>
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

Modal.displayName = "Modal";

export default Modal;
