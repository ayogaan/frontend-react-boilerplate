//import axios from "axios";
import { useEffect, useState } from "react"
import AxiosInstance from "../Helpers/AxiosInstance";
import { useNavigate } from "react-router-dom";
const useFetch = (url) => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [status, setStatus] =useState();
    const [lastPage, setLastPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = () =>{
        setLoading(true);
        console.log(url)
        AxiosInstance.get(url)
        .then((res)=>{
            
            setData(res.data.data);
            setStatus(res.status)
            setLastPage(res.data.totalItems);
        }).catch((err)=>{
            if(err?.response?.status === 401){
                //window.location = '/login';
                setStatus(401)
                navigate("/login");
            }
            

            setError(err);
        }).finally(()=>{
            setLoading(false)
        })
   
    }
    useEffect(() => {
        fetchData(url);
      }, [url]);

    
    return {data,lastPage, loading, error, fetchData, status}
}

export default useFetch;