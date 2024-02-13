import { useEffect, useState } from 'react'
import image from './Abstraction.png'
import logo from './Vector.png'
import blind from './blind.png'
import './loginChallenge.css'
import instance from '../../Helpers/AxiosInstance'
import { useNavigate } from 'react-router-dom'
const LoginChallenge = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showErrAlert, setShowErrAlert] = useState(false);
    const [errMessage, setErrMessage] = useState('');
    const [localToken, setLocalToken] = useState('');
    const navigate = useNavigate()
    
    useEffect(() => {
        console.log(localToken);
        if (localToken !== '') {
        navigate('/');
        }
    }, [localToken]);
    
    const handleInputChange = (e) => {
        const inputValue = Number(e.target.value);

        if (!isNaN(inputValue) && inputValue >= 0) {
            setFormData({
            ...formData,
            [e.target.name]: inputValue
            });
        }else{
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
                });
        }
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        
    
        try {
        const response = await instance.post('/user/login', {
            email: formData.email,
            password: formData.password,
        });
    
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        setLocalToken(localStorage.getItem('jwtToken'));
        } catch (err) {
        console.log(err);
        setErrMessage(err?.response?.data?.message);
        setShowErrAlert(true);
        if(err?.response?.status === 401){
            //window.location = '/login';
            navigate("/login");
        }
        }
    };

    return (
    <div className="flex w-full h-screen bg-color">
        {/* <img className="absolute" src="" alt="" /> */}
        <div className="w-4/12 pl-5 pr-10 py-10 flex flex-col gap-8 items-between justify-between">
            <img className='logo w-[40px] h-40px' src={logo} alt="" />
            <p className="text-3xl text-white">Find 3D Objects, Mockups and Illustration here.</p>
            <img className='relative left-[100px] w-[120%]'  src={image}></img>
        </div>
        <div className="rounded-l-[40px] shadow w-8/12 bg-white py-10 flex flex-col gap-5 items-start">
            <div className='flex w-full text-gray-400 justify-end px-10'>
                English
            </div>
            <div className='mx-auto w-8/12 py-5 px-10'>
            
            <p className='mb-5 font-semibold text-2xl font-medium'>Create Account</p>
            <div className='flex justify-between gap-8 mb-5'>
                <button className='w-1/2 py-2 rounded-lg border px-3 flex justify-center items-center shadow gap-3'> <img className='w-8' src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/> <span> Sign Up with Google </span> </button>
                <button className='w-1/2 py-2 rounded-lg border px-3 flex justify-center items-center shadow gap-3'> <img className='w-8' src="https://img.icons8.com/fluency/48/facebook-new.png" alt="facebook-new"/> <span>Sign Up with Facebook</span> </button>
                
            </div>
            <div className='flex justify-center text-gray-600 text-2xl my-5 py-2'> - OR -</div>
            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>

                    <input className='p-2 border-b-2 text-xl' type="text" placeholder='Email'
                    onChange={handleInputChange}
                    value = {formData.email}
                    name = "email"
                    />
                    <div className=' border-b-2 text-xl flex items-center justify-between' >
                    <input  type="text" className='w-full p-2' placeholder='Password'
                    onChange={handleInputChange}
                    value = {formData.password}
                    name = "password"
                    />
                    <img src={blind} alt="" />
                    </div>
                    <input className='p-2 bg-color hover:bg-cyan-600 font-semibold rounded-lg text-white text-xl mt-8' type="submit" value="Create Account" /> 
                    
                    <p>Allready have an account? <span className='font-color'>Log in</span></p>
            </form>
            </div>
        </div>
    </div>
    )
}

export default LoginChallenge;