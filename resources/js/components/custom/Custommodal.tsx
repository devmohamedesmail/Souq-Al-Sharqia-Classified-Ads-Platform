import React from 'react'
import { IoMdClose } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";



function Custommodal({message,modalname , children = null}:any) {
    return (
        <dialog id="my_modal_3" className="modal" ref={modalname}>
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"><IoMdClose /></button>
                </form>
                <div className="flex flex-col justify-center items-center">
                    {/* <p>✅</p> */}
                    <p><IoCheckmarkCircleSharp size={100} color='green' /></p>
                    <p className='arabic-font text-lg'>{message}</p>
                     {children}
                </div>

            </div>
        </dialog>
    )
}

export default Custommodal