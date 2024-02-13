import { useState } from "react";
import AxiosInstance from "../../Helpers/AxiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () =>{
    const navigate =useNavigate();
    const [formData, setFormData] = useState({username: "", name : "", email: "", password:""})
    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        const inputValue = type === "checkbox" ? checked : value;
        
        setFormData({
          ...formData,
          [name]: inputValue,
        });
        
      };

      const handleSubmit =()=> {
        
        AxiosInstance.post('/user/register', formData)
          .then((result) => {
            // Handle successful registration, e.g., redirect to a login page
            navigate('/login')
            //window.location = '/wait-validation';
          })
          .catch((error) => {
            if(error?.response?.status === 401){
              //window.location = '/login';
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
          <p className="font-bold text-gray-700 mb-8">Daftar</p>
                
                  

                  <div class="mb-4">
                    <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter your username"
                      class="w-full border border-gray-200 border-2 px-4 py-2"
                    />
                  </div>

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
                      type="text"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="*********"
                      class="w-full border border-gray-200 border-2 px-4 py-2"
                    />
                  </div>

                  <div class="mb-4">
                    <label for="password_confirmation" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                      type="text"
                      id="password_confirmation"
                      name="password_confirmation"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter password confirmation"
                      class="w-full border border-gray-200 border-2 px-4 py-2"
                    />
                  </div>
                  <button onClick={handleSubmit} className="text-white w-[200px] px-2 py-2 bg-blue-400 hover:bg-blue-500 rounded mt-4">Register</button>                
          </div>
        </div>

      </div>
        // <div className="w-screen h-screen flex justify-center items-center py-10">
        //     <div className="w-full md:w-1/3 h-full bg-slate-200 shadow-lg border rounded-lg p-10 flex flex-col justify-between">
        //         <p className="text-3xl font-bold">Register</p>
        //         <div>
        //         {/* <div class="mb-4">
        //             <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
        //             <input
        //               type="text"
        //               id="name"
        //               name="name"
        //               placeholder="Enter your name"
        //               value={formData.name}
        //               class="w-full border border-gray-200 border-2 px-4 py-2"
        //               onChange={handleInputChange}
        //             />
        //           </div> */}

        //           <div class="mb-4">
        //             <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username</label>
        //             <input
        //               type="text"
        //               id="username"
        //               name="username"
        //               value={formData.username}
        //               placeholder="enter your username"
        //               class="w-full border border-gray-200 border-2 px-4 py-2"
        //               onChange={handleInputChange}
        //             />
        //           </div>

        //           <div class="mb-4">
        //             <label for="company_name" class="block text-gray-700 text-sm font-bold mb-2">company name</label>
        //             <input
        //               type="text"
        //               id="company_name"
        //               name="company_name"
        //               value={formData.company_name}
        //               placeholder="enter your company_name"
        //               class="w-full border border-gray-200 border-2 px-4 py-2"
        //               onChange={handleInputChange}
        //             />
        //           </div>

        //           <div class="mb-4">
        //             <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
        //             <input
        //               type="text"
        //               id="email"
        //               name="email"
        //               placeholder="Enter your email"
        //               class="w-full border border-gray-200 border-2 px-4 py-2"
        //               value={formData.email}
        //               onChange={handleInputChange}
        //             />
        //           </div>
        //           <div class="mb-4">
        //             <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
        //             <input
        //               type="password"
        //               id="password"
        //               name="password"
        //               placeholder="********"
        //               class="w-full border border-gray-200 border-2 px-4 py-2"
        //               value={formData.password}
        //               onChange={handleInputChange}
        //             />
        //           </div>
        //           </div>
                  
        //           <button onClick={handleSubmit} className="w-full border border-gray-200 border-2 px-4 py-2 bg-blue-400 rounded-full">Register</button>
        //     </div>
        // </div>
    )
}

export default Register;