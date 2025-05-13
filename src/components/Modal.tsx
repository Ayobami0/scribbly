import React, { useEffect } from "react"

export const Modal = React.forwardRef<HTMLDialogElement, { children: React.ReactNode }>(({ children }, ref) => {
  const close = (e: React.MouseEvent) => {
    if (e.target != ref?.current) return;
    ref?.current?.close()
  }
  return <>
    <dialog
      ref={ref}
      className="w-screen h-screen fixed top-[0] left-[0] z-50 bg-black/45"
      onClick={close}
    >
      <div className="bg-white p-6 rounded-xl shadow-lg absolute left-[50%] top-[50%] -translate-[50%]">
        {children}
      </div>
    </dialog>
  </>
});

