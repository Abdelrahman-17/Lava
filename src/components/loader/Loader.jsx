import React from 'react'
import loader from '../../assets/loader1.mp4'
import './Loader.css'
const Loader = () => {
    return (
        <>
            <div className="bodyloader">
                <div class="scene" style={{ "--hue": 260, "--saturation": 53, "--lightness": 68 }}>
                    <div class="word">
                        <div class="letter__wrap" style={{ "--index": 0 }}>
                            <div class="letter" data-letter="L"><span class="letter__panel" aria-hidden="true">L</span><span class="letter__panel" aria-hidden="true">W</span><span class="letter__panel" aria-hidden="true">L</span><span class="letter__panel" aria-hidden="true">W</span><span class="letter__panel"></span></div>
                        </div>
                        <div class="letter__wrap" style={{ "--index": 1 }}>
                            <div class="letter" data-letter="o"><span class="letter__panel" aria-hidden="true">o</span><span class="letter__panel" aria-hidden="true">a</span><span class="letter__panel" aria-hidden="true">o</span><span class="letter__panel" aria-hidden="true">a</span><span class="letter__panel"></span></div>
                        </div>
                        <div class="letter__wrap" style={{ "--index": 2 }}>
                            <div class="letter" data-letter="a"><span class="letter__panel" aria-hidden="true">a</span><span class="letter__panel" aria-hidden="true">i</span><span class="letter__panel" aria-hidden="true">a</span><span class="letter__panel" aria-hidden="true">i</span><span class="letter__panel"></span></div>
                        </div>
                        <div class="letter__wrap" style={{ "--index": 3 }}>
                            <div class="letter" data-letter="d"><span class="letter__panel" aria-hidden="true">d</span><span class="letter__panel" aria-hidden="true">t</span><span class="letter__panel" aria-hidden="true">d</span><span class="letter__panel" aria-hidden="true">t</span><span class="letter__panel"></span></div>
                        </div>
                        <div class="letter__wrap" style={{ "--index": 4 }}>
                            <div class="letter" data-letter="i"><span class="letter__panel" aria-hidden="true">i</span><span class="letter__panel" aria-hidden="true">.</span><span class="letter__panel" aria-hidden="true">i</span><span class="letter__panel" aria-hidden="true">.</span><span class="letter__panel"></span></div>
                        </div>
                        <div class="letter__wrap" style={{ "--index": 5 }}>
                            <div class="letter" data-letter="n"><span class="letter__panel" aria-hidden="true">n</span><span class="letter__panel" aria-hidden="true">.</span><span class="letter__panel" aria-hidden="true">n</span><span class="letter__panel" aria-hidden="true">.</span><span class="letter__panel"></span></div>
                        </div>
                        <div class="letter__wrap" style={{ "--index": 6 }}>
                            <div class="letter" data-letter="g"><span class="letter__panel" aria-hidden="true">g</span><span class="letter__panel" aria-hidden="true">.</span><span class="letter__panel" aria-hidden="true">g</span><span class="letter__panel" aria-hidden="true">.</span><span class="letter__panel"></span></div>
                        </div>
                    </div>
                </div>
                {/* <div class="pl">
                    <div class="pl__dot"></div>
                    <div class="pl__dot"></div>
                    <div class="pl__dot"></div>
                    <div class="pl__dot"></div>
                    <div class="pl__dot"></div>
                    <div class="pl__dot"></div>
                    <div class="pl__dot"></div>
                    <div class="pl__dot"></div>
                    <div class="pl__dot"></div>
                    <div class="pl__dot"></div>
                    <div class="pl__dot"></div>
                    <div class="pl__dot"></div>
                    <div class="pl__text">Loading…</div>
                </div> */}
            </div>

        </>
        // <div style={{ zIndex: '444444', background: '#222123' }} className=" h-screen w-screen fixed top-0 left-0 flex justify-center items-center text-center flex-col">
        //     {/* <div className="flex gap-4 items-center mb-8 ">
        //   <img src={icon} className="w-10" />
        //   <h1 className="font-semibold text-slate-700 text-6xl">Lava</h1>
        // </div> */}
        //     <video autoPlay loop muted className='h-full w-full'>
        //         <source src={loader} type="video/mp4" />
        //     </video>
        // </div>
    )
}

export default Loader