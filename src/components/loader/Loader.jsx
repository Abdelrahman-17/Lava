import React from 'react'
import loader from '../../assets/loader1.mp4'
const Loader = () => {
    return (
        <div style={{ zIndex: '444444', background: '#222123' }} className=" h-screen w-screen fixed top-0 left-0 flex justify-center items-center text-center flex-col">
            {/* <div className="flex gap-4 items-center mb-8 ">
          <img src={icon} className="w-10" />
          <h1 className="font-semibold text-slate-700 text-6xl">Lava</h1>
        </div> */}
            <video autoPlay loop muted className='h-full w-full'>
                <source src={loader} type="video/mp4" />
            </video>
        </div>
    )
}

export default Loader