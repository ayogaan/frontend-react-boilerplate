import useFetch from "../../customHooks/useFetch";
import ButtonLink from "../../components/button";
import AxiosInstance from "../../Helpers/AxiosInstance";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DataTable from 'react-data-table-component';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CreateHumanProcess from "./CreateHumanProcess";

const HumanProcess  = () =>{
    const navigate  = useNavigate();
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
        
        {
            name: 'Action',
            button: true,
            cell: (row) => <span className='flex gap-1 w-full'>
                <button className='bg-yellow-400 hover:bg-yellow-500 px-3 py-2 text-white' onClick={() => handleEdit(row)}>Edit</button>
                <button className='bg-red-400 hover:bg-red-500 px-3 py-2 text-white' onClick={() => handleDelete(row)}>Delete</button>
                </span>,
            width: '150px'
        },


        
    ];  
    
    const handleEdit = (row) => {
        navigate('/settings/human-process/'+row.id);
        // Implement your edit logic here
        // setEditData(row);
        // navigate('/blog/'+row.id)
    };
    
const handleDelete = (row) => {
        // Implement your delete logic here
        AxiosInstance.delete('human/'+row.id).then(
            res=>{
                attendanceHistory.fetchData(`human?page=`+currentPage+'&pageSize='+perPage)
                toast(res.data.message);
                
            }
        ).catch(res=>{toast(res.data.message)})
    };

    useEffect(()=>{}, [attendanceHistory.data])


    return (
        <div className="w-full flex justify-end text-gray-700 py-10 px-3 bg-gray-100 h-screen">
            <ToastContainer/>
            <div className="w-full md:w-10/12 pt-10 px-5">
           
            <br />
            <ButtonLink to="/settings/human-process/tambah" type="primary">Tambah Proses</ButtonLink>
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
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10]}
            />

            </div>
            <div className="relative"></div>
        </div>
        
    )
}

export default HumanProcess;