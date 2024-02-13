import React, { useEffect, useState } from 'react';
import AxiosInstance from '../../Helpers/AxiosInstance';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useFetch from '../../customHooks/useFetch';
import DataTable from 'react-data-table-component';

const CreateLCA = () => {
    const navigate = useNavigate();
    const activeWoodSetting = useFetch('wood/active');
    const activeElectricSetting = useFetch('electric/active');

    const [currentPage,setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const attendanceHistory = useFetch(`human?page=`+currentPage+'&pageSize='+perPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);

    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);
        setCurrentPage(page);
    };
    const columns = [
        {
            name: 'ID',
            selector: (row) => row.id,
            sortable: true,
            width: '80px'

        },
        {
            name: 'Nama Proses',
            selector: (row) => row.process_name,
            sortable: true,
        },

        {
            name: 'Lama Kerja',
            selector: (row) => row.working_time,
            sortable: true,
        },

        {
            name: 'Tenaga',
            selector: (row) =>  <div>
                                    <div className="flex justify-between w-full gap-3">
                                        <span>Pria</span>
                                        {row.male_resource}
                                    </div>
                                    <div className="flex justify-between w-full gap-3">
                                        <span>Wanita</span>
                                        {row.female_resource}
                                    </div>
                                </div>,
            sortable: true,
        },
        
        
    ];  
    

    useEffect(()=>{
        if(activeElectricSetting.status !== 200 && activeWoodSetting.status !== 200){
            toast("electric or woods setting not activated yet")
        }
    }, [attendanceHistory.data, activeElectricSetting.data, activeWoodSetting.data])


    const [formData, setFormData] = useState({
        production_capacity: "",
        
    });
    const handleInputChange = (e) => {
        setFormData({ ...
            formData, [e.target.name]: +e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        AxiosInstance.post('result', formData)
            .then((response) => {
                console.log(response)
                toast(response?.data?.message);
                setFormData({
                    production_capacity: "",
                    
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
            <label htmlFor="production_capacity" className="block text-sm font-medium text-gray-600">
                Kapasitas Produksi
            </label>
            <input
                type="number"
                id="production_capacity"
                name="production_capacity"
                value={formData.production_capacity}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
            </div>

            <div className='border rounded p-5 mb-5'>
                <div className='flex justify-between items-end gap-5 mb-5'>
                    <p className='block text-sm font-medium text-gray-600'>Kayu digunakan :</p> <p className='text-sm font-small text-400 w-1/12'>{activeWoodSetting.status === 200 ? activeWoodSetting.data.total_woods : ''}</p>
                </div>
                <p className='block text-sm font-medium text-gray-600 mb-5'>Alat Listrik : </p>
                <div className='flex-row pl-5'>
                    <div className='flex justify-between items-end gap-5 mb-5'>
                    <p className='text-sm font-small text-400 w-1/12'>Total Alat</p>  <p className='text-sm font-small text-400 w-1/12'>{activeElectricSetting.status === 200 ? activeElectricSetting.data.total_tools : ''}</p>
                    </div>
                    <div className='flex justify-between items-end gap-5 mb-5'>
                    <p className='text-sm font-small text-400 w-1/12'>Besar Watt</p>  <p className='text-sm font-small text-400 w-1/12'>{activeElectricSetting.status === 200 ? activeElectricSetting.data.watt_number : ''}</p>
                    </div>
                    <div className='flex justify-between items-end gap-5 mb-5'>
                    <p className='text-sm font-small text-400 w-1/12'>Waktu Kerja</p>  <p className='text-sm font-small text-400 w-1/12'>{activeElectricSetting.status === 200 ? activeElectricSetting.data.working_time : ''}</p>
                    </div>    
                </div>
                <p className='block text-sm font-medium text-gray-600 mb-5'>Proses Manusia :</p> 
                
                <DataTable
                
                columns={columns}
                data={attendanceHistory?.data ?? []}
                progressPending={attendanceHistory.loading}
                pagination
                paginationServer
                paginationTotalRows={attendanceHistory.lastPage}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10]}
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

export default CreateLCA;
