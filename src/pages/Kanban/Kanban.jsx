import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Kanban = () =>{

    return(
    
            <div className="w-full flex justify-end text-gray-700 py-10 px-3 bg-gray-100 h-screen">
                <ToastContainer/>
                <div className="w-full md:w-10/12 pt-10 px-5">
                    Board
                </div>
            </div>
            
        
    )
}

export default Kanban