import React, { useState } from 'react'
import loginIcon from '../assets/signin.gif'
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import ImageToBase64 from '../helpers/ImageToBase64';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmpassword: '',
    profilePic : '',

  })
  const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }
  const handleSubmit = (e) => {
        e.preventDefault()
    }


    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        try {
            const base64String = await ImageToBase64(file);
            setData((prev) => ({
                ...prev,
                profilePic: base64String,
            }));
            console.log(base64String);
        } catch (error) {
            console.error("Error converting image to base64:", error);
        }
    }
  
  console.log(data)
  return (
      <section id='login'>
          <div className='mx-auto container p-4'>
              <div className='bg-white p-2 w-full max-w-sm mx-auto rounded py-5 shadow-md px-4'>
                    <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                      <form action="">
                          <label>
                              <input type="file" className='hidden' onChange={handleUploadImage}/>
                            <div className='cursor-pointer'>
                                <img src={data.profilePic || loginIcon} alt='login icon' />
                            </div>
                            <div className='text-[12px] bg-opacity-90 bg-slate-200 container text-center absolute w-full top-[50%] bottom-0 cursor-pointer'>
                                Upload Image
                            </div>
                          </label>
                      </form>
                    </div>
                  <form className='pt-6 mt-4' onSubmit={handleSubmit}>
                      <div className='grid mb-4'>
                          <label>First Name : </label>
                          <div className='bg-slate-100 p-2'>  
                              <input
                                  type='text'
                                  placeholder='First Name'
                                  name='firstname'
                                  required
                                  value={data.firstname}
                                  onChange={handleOnChange}
                                  className='w-full h-full outline-none bg-transparent' />
                          </div>
                      </div>
                      <div className='grid mb-4'>
                          <label>Last Name : </label>
                          <div className='bg-slate-100 p-2'>  
                              <input
                                  type='text'
                                  placeholder='Last Name'
                                  name='lastname'
                                  value={data.lastname}
                                  onChange={handleOnChange}
                                  className='w-full h-full outline-none bg-transparent' />
                          </div>
                      </div>
                      <div className='grid mb-4'>
                          <label>Email : </label>
                          <div className='bg-slate-100 p-2'>  
                              <input
                                  type='email'
                                  placeholder='something@gmail.com'
                                  name='email'
                                  value={data.email}
                                  required
                                  onChange={handleOnChange}
                                  className='w-full h-full outline-none bg-transparent' />
                          </div>
                      </div>
                      <div className='mb-4'>
                          <label>Password : </label>
                          <div className='bg-slate-100 p-2 flex'>  
                              <input
                                  type={showPassword ? "text" : "password"}
                                  placeholder='Enter Password'
                                  name='password'
                                  value={data.password}
                                  required
                                  onChange={handleOnChange}
                                  className='w-full h-full outline-none bg-transparent' />
                              <div className='cursor-pointer' onClick={() => {
                                  setShowPassword((prev) => !prev)
                              }}>
                                  <span>
                                      {showPassword ?<FaEyeSlash />:<FaEye />}
                                  </span>
                              </div>
                          </div>
                      </div>
                      <div>
                          <label>Confirm Password : </label>
                          <div className='bg-slate-100 p-2 flex'>  
                              <input
                                  type={showPassword ? "text" : "password"}
                                  placeholder='Confirm Password'
                                  name='confirmpassword'
                                  value={data.confirmpassword}
                                  required
                                  onChange={handleOnChange}
                                  className='w-full h-full outline-none bg-transparent' />
                              <div className='cursor-pointer' onClick={() => {
                                  setShowPassword((prev) => !prev)}}>
                              </div>
                          </div>
                      </div>
                      <button className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6'>Sign Up</button>
                  </form>
                  <div className='mt-4'>
                      <p>Already have Account? <span className='text-blue-800 font-medium hover:underline hover:text-blue-900'><Link to={'/login'}>Login</Link></span></p>
                  </div>
              </div>
          </div>
    </section>
  )
}

export default SignUp