import { useState } from "react";
import AxiosInstance from "../../Helpers/AxiosInstance";
import { useNavigate } from "react-router-dom";
import ButtonLink from "../../components/button";

const Login = () =>{
    const navigate =useNavigate();
    const [formData, setFormData] = useState({email: "", password:""})
    const [error, setError] = useState(null);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === "checkbox" ? checked : value;
        setFormData({
          ...formData,
          [name]: inputValue,
        });
        
      };

      const handleSubmit =()=> {
        
        AxiosInstance.post('user/login', formData)
          .then((response) => {
            const token = response.data.token;
            localStorage.setItem('jwtToken', token);
            navigate('/')
          })
          .catch((error) => {
            console.log(error)
            setError(error.message)
            if(error?.response?.status === 401){
              navigate("/login");
          }
          });
      };
    return (
      <div className="w-screen h-screen flex">
        <div className="w-7/12 h-full bg-no-repeat bg-cover" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1632404954707-4465b1411e9b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
        </div>
        <div className="w-5/12 h-full bg-white flex items-center justify-center">
          <div className="p-10 container">
          <p className="font-bold text-gray-700 mb-8">Masuk</p>
                
                  <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      class="w-full border border-gray-200 border-2 px-4 py-2"
                    />
                  </div>
                
                  <div class="mb-4">
                    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="*********"
                      class="w-full border border-gray-200 border-2 px-4 py-2"
                    />
                  </div>
                  <ButtonLink onclick={handleSubmit} type="primary" >Login</ButtonLink>             
          </div>
        </div>

      </div>
    )
}

export default Login;