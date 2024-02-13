import useFetch from "../../customHooks/useFetch";
import ButtonLink from "../../components/button";
import AxiosInstance from "../../Helpers/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DetailHumanProcess from "./detailHumanProcess";

const LCA  = () =>{
    const navigate  = useNavigate();
    const [currentPage,setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const attendanceHistory = useFetch(`result?page=`+currentPage+'&pageSize='+perPage);
    const [humanProcess, setHumanProcess] =useState([]);
    const [electricProcess, setElectricProcess] =useState([]);
    const [woodProcess, setWoodProcess] =useState([]);
    const [isShown, setIsShown] = useState(false);
    if(attendanceHistory.status === 401){
        navigate('/landing')
    }    
    const handleCloseModal = () => {
        setIsShown(false);
    };

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
            name: 'Tanggal',
            selector: (row) => row.date,
            sortable: true,
        },


        {
            name: 'Kapasitas Kayu',
            selector: (row) => JSON.parse(row.wood_process_settings).total_woods,
            sortable: true,
        },

        {
            name: 'Konfigurasi Alat',
            selector: (row) => <div className="flex flex-col gap-1 py-1">
                <div className="flex justify-between gap-3 ">
                <p>Total Alat</p> <p>{JSON.parse(row.electric_process_settings).total_tools}</p>
                </div>
                <div className="flex justify-between gap-3">
                <p>Watt</p> <p>{JSON.parse(row.electric_process_settings).watt_number}</p>
                </div>
                <div className="flex justify-between gap-3">
                <p>Waktu kerja</p> <p>{JSON.parse(row.electric_process_settings).working_time}</p>
                </div>
                </div>,
            sortable: true,
        },

        {
            name: 'kapasitas produksi',
            selector: (row) => row.production_capacity,
            sortable: true,
        },

        {
            name: 'Action',
            button: true,

            cell: (row) => <div className='flex items-center gap-1 w-full p-2'>
                <button className='bg-blue-400 hover:bg-blue-500 px-3 py-2 text-white' onClick={() => handleShowHumanProcess(row)}> Human Process</button>
                
                <button className='bg-yellow-400 hover:bg-yellow-500 px-3 py-2 text-white' onClick={() => handleEdit(row)}>Edit</button>
                <button className='bg-red-400 hover:bg-red-500 px-3 py-2 text-white' onClick={() => handleDelete(row)}>Delete</button>
                </div>,
            width: '300px'
        },


        
    ];  

    const handleShowHumanProcess = (row) =>{
        setIsShown(true);
        setHumanProcess(JSON.parse(row.human_process_settings));
        setElectricProcess(JSON.parse(row.electric_process_settings));
        setWoodProcess(JSON.parse(row.wood_process_settings));        
    }
    
    const handleEdit = (row) => {
        navigate('/settings/electric-process/'+row.id);
        // Implement your edit logic here
        // setEditData(row);
        // navigate('/blog/'+row.id)
    };
    
    const handleDelete = (row) => {
        AxiosInstance.delete('result/'+row.id).then(
            res=>{
                attendanceHistory.fetchData(`result?page=`+currentPage+'&pageSize='+perPage)
                toast(res.data.message);
                
            }
        ).catch(res=>{toast(res.message)})
    };

    const handleActivate = (row) => {
        AxiosInstance.post('/electric/set/'+row.id).then(
            res=>{
                attendanceHistory.fetchData(`human?page=`+currentPage+'&pageSize='+perPage)
                toast(res.data.message);
                
            }
        ).catch(res=>{toast(res.message)})
    };

    useEffect(()=>{}, [attendanceHistory.data])

    const emptyImage = (
        <img src="https://cdn.icon-icons.com/icons2/2483/PNG/512/empty_data_icon_149938.png" alt="Empty" style={{ width: '50px', height: '50px' }} />
    );



    return (
        <div className="w-full flex justify-end text-gray-700 py-10 px-3 bg-gray-100 h-screen">
            <ToastContainer/>
            <DetailHumanProcess
                humanProcess={humanProcess}
                electricProcess={electricProcess}
                woodProcess={woodProcess}
                onShow={isShown}
                onClose={handleCloseModal}
                />
            <div className="w-full md:w-10/12 pt-10 px-5">
            <p>AttendanceHistory</p>
            <br />
            <ButtonLink to="/lca/tambah" type="primary">Tambah Perhitungan</ButtonLink>
            <br />
            <br />
            <DataTable
                
                columns={columns}
                data={attendanceHistory?.data ?? []}
                progressPending={attendanceHistory.loading}
                pagination
                paginationServer
                paginationTotalRows={attendanceHistory.lastPage}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                noDataComponent={emptyImage}
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10]}
            />

            </div>
        </div>
        
    )
}

export default LCA;