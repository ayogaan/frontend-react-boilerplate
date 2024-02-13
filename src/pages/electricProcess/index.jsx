import useFetch from "../../customHooks/useFetch";
import ButtonLink from "../../components/button";
import AxiosInstance from "../../Helpers/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateHumanProcess from "./CreateElectricProcess";

const ElectricProcess  = () =>{
    const navigate  = useNavigate();
    const [currentPage,setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const attendanceHistory = useFetch(`electric?page=`+currentPage+'&pageSize='+perPage);

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
            name: 'Total Alat',
            selector: (row) => row.total_tools,
            sortable: true,
        },

        

        {
            name: 'besar watt',
            selector: (row) => row.watt_number,
            sortable: true,
        },

        {
            name: 'Waktu Kerja',
            selector: (row) => row.working_time,
            sortable: true,
        },
        
        {
            name: 'Action',
            button: true,

            cell: (row) => <span className='flex items-center gap-1 w-full p-2'>
                <button className=   {row.is_active ? 'bg-blue-400 hover:bg-blue-500 px-3 py-2 text-white' : 'bg-gray-400 hover:bg-gray-500 px-3 py-2 text-white'} onClick={() => handleActivate(row)}> { row.is_active ? "Aktif" : "Tidak Aktif"}</button>
                <button className='bg-yellow-400 hover:bg-yellow-500 px-3 py-2 text-white' onClick={() => handleEdit(row)}>Edit</button>
                <button className='bg-red-400 hover:bg-red-500 px-3 py-2 text-white' onClick={() => handleDelete(row)}>Delete</button>
                </span>,
            width: '250px'
        },


        
    ];  
    
    const handleEdit = (row) => {
        navigate('/settings/electric-process/'+row.id);
        // Implement your edit logic here
        // setEditData(row);
        // navigate('/blog/'+row.id)
    };
    
    const handleDelete = (row) => {
        AxiosInstance.delete('electric/'+row.id).then(
            res=>{
                attendanceHistory.fetchData(`human?page=`+currentPage+'&pageSize='+perPage)
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
            <div className="w-full md:w-10/12 pt-10 px-5">
           
            <br />
            <ButtonLink to="/settings/electric-process/tambah" type="primary">Tambah Proses</ButtonLink>
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
            <div className="relative"></div>
        </div>
        
    )
}

export default ElectricProcess;