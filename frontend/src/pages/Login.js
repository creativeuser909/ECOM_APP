import React, { useState } from "react";
import loginIcon from "../assets/signin.gif";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
    const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: ""
  });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email === "" || data.password === "") {
      alert("Please fill all the fields");
    } else {
      try {
        const response = await fetch("/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          if(json.message === "Password is incorrect"){
            toast.error("Password is incorrect");
            return;
          }
          if(json.message === "User not found"){
            toast.error("Email is incorrect.");
            return;
          }
          toast.success("Login Successful.");
          navigateTo('/');

        } else {
          throw new Error("Failed to sign up");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  console.log(data);
  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-2 w-full max-w-sm mx-auto rounded py-5 shadow-md px-4">
          <div className="w-20 h-20 mx-auto overflow-hidden rounded-full">
            <img src={loginIcon} alt="login icon" />
          </div>
          <form className="pt-6" onSubmit={handleSubmit}>
            <div className="grid mb-4">
              <label>Email : </label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="something@gmail.com"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label>Password : </label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setShowPassword((prev) => !prev);
                  }}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forget-password"}
                className="block w-fit ml-auto hover:underline transition-transform ease-in-out duration-0.5 hover:text-red-600 text-blue-600 mt-2"
              >
                Forget Password
              </Link>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-105 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>
          <div className="mt-4">
            <p>
              Don't have Account?{" "}
              <span className="text-blue-800 font-medium hover:underline hover:text-blue-900">
                <Link to={"/sign-up"}>Sign Up</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
