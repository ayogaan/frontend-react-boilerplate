import React, { useState } from 'react';
import AxiosInstance from '../../Helpers/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CreateHumanProcess = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        process_name: "",
        male_resource: "",
        female_resource: "",
        working_time: "",
        user_id: 1
    });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        AxiosInstance.post('human', formData)
            .then((response) => {
                console.log(response)
                toast(response?.data?.message);
                setFormData({
                    process_name: "",
                    male_resource: "",
                    female_resource: "",
                    working_time: "",
                    user_id: 1    
                })
            })
            .catch((error) => {
                console.log(error)
                if(error?.response?.status === 401){
                //window.location = '/login';
                //navigate("/login");
            }
            });
    };

    return (
        <div className='w-full flex justify-end text-gray-700 py-10 px-5'>
        <ToastContainer/>
        <div className='md:w-10/12 w-full pt-10 px-5' >
        <h2 className="text-2xl font-semibold mb-6">Tambah Proses manusia</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="process_name" className="block text-sm font-medium text-gray-600">
                Nama Proses
            </label>
            <input
                type="text"
                id="process_name"
                name="process_name"
                value={formData.process_name}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            </div>

            <div className="mb-4">
            <label htmlFor="male_resource" className="block text-sm font-medium text-gray-600">
                Tenaga Laki Laki
            </label>
            <input
                type="number"
                id="male_resource"
                name="male_resource"
                value={formData.male_resource}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            </div>

            <div className="mb-4">
            <label htmlFor="" className="block text-sm font-medium text-gray-600">
                Tenaga Perempuan
            </label>
            <input
                type="number"
                id="female_reosurce"
                name="female_resource"
                value={formData.female_resource}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            </div>

            <div className="mb-4">
            <label htmlFor="" className="block text-sm font-medium text-gray-600">
                Besar Waktu Kerja
            </label>
            <input
                type="number"
                id="working_time"
                name="working_time"
                value={formData.working_time}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            </div>


            <div className="mb-6">
            <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
                Submit
            </button>
            </div>
        </form>
        </div>
        </div>
    );
};

export default CreateHumanProcess;
