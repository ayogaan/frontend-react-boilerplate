import Footer from "./footer"
import NavbarLanding from "./navbarlanding"

import heroImg from './hero graphics.png'
import AOS from "aos";
import 'aos/dist/aos.css';
import { useEffect } from "react"

const Hero = ()=>{
    useEffect(() => {
        AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          mirror: false,
        });
    
        AOS.refresh();
    
        return () => {
            
        };
      }, []);
    return (
    <>
    <NavbarLanding></NavbarLanding>
    <div className="w-10/12 mx-auto">
        <div className="flex justify-center items-center">
            <div className="w-1/2" data-aos="fade-up">
            <h1 className="font-manrope font-semibold text-5xl mb-5">
            Selamat Datang di Kalkulator Jejak Karbon!
            </h1>
            <p className="mb-5">
            Dengan kalkulator jejak karbon kami, Anda dapat mengukur dampak lingkungan dari aktivitas harian di rumah industri Anda. Mulailah menghitung hari ini dan temukan cara untuk membuat perubahan positif!
            </p>
            <div className="flex gap-1">
            <button className=" border-2 border-green-900 px-2 py-1 text-green-900 hover:bg-green-900 hover:text-white">Explore</button>
            <button className=" border-2 border-green-900 px-2 py-1 hover:text-green-900 bg-green-900 hover:bg-white text-white">Sign Up</button>
            
            </div>
            </div>
            <div className="w-1/2 relative flex justify-end items-center p-5">
                <img data-aos="fade-up" className="z-10 w-3/4" src="https://images.unsplash.com/photo-1620580554973-2c6a1dc0c217?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <img data-aos="fade-down" className="w-3/4 absolute top-10 left-10 z-20" src={heroImg} alt="" />
            </div>
        </div>

        
    </div>
    <div className="bg-green-900 text-white font-manrope">
    <div className="w-10/12 mx-auto flex flex-col justify-center items-center py-10 px-5">    
            <small>Mudah digunakan</small>
            <h1>How We Work</h1>
            <br />
            <br />
            <div className="flex justify-center items-center gap-5">
                <div data-aos="fade-up" className="w-1/3 gap-5 items-center justify-center flex flex-col">
                    <img className=" rounded top-10 left-10 z-20" src={heroImg} alt="" />
                    <p>Register</p>
                </div>
                <div data-aos="fade-up" className="w-1/3 gap-5 items-center justify-center flex flex-col">
                    <img className=" rounded top-10 left-10 z-20" src={heroImg} alt="" />
                    <p>Masukan Data</p>
                </div>
                <div data-aos="fade-up" className="w-1/3 gap-5 items-center justify-center flex flex-col">
                    <img className=" rounded top-10 left-10 z-20" src={heroImg} alt="" />
                    <p>Dapatkan Hasil</p>
                </div>
            </div>
    </div>
    </div>

    <div className="w-10/12 mx-auto py-10 font-manrope" data-aos="fade-up">
        <div className="flex-col justify-center items-center">
        <div className="w-full rounded-lg h-[300px]" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1913&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }} />

            <div className="flex gap-5">
                <div className="w-1/2">
                    <h1 className="text-3xl">
                    Bergabunglah dengan Kami dalam Melakukan Perubahan Positif!
                    </h1>
                    <br />
                    <button className=" border-2 border-green-900 px-2 py-1 hover:text-green-900 bg-green-900 hover:bg-white text-white">Sign Up Now !</button>
                </div>
                <div className="w-1/2">
                <ul className="flex flex-col gap-1 text-lg items-end">
                    <li>✅ Kurangi Dampak Lingkungan</li>
                    <li>✅ Penuhi Tanggung Jawab Lingkungan</li>        
                    <li>✅ Identifikasi Sumber Pencemaran</li>
                </ul>
                
                </div>
            </div>
        </div>

        
    </div>
    <Footer/>
    </>

    )

}

export default Hero