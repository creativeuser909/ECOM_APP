import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/SendData";

const Logout = () => {
	const {userData, setUserData} = useContext(UserDataContext);
	const navigateTo = useNavigate();
	useEffect(() => {
		localStorage.clear();
        setUserData({
            ...userData,
            firstname: "",
            token: "",
            profilePic: "",
            email: ""
        });
		navigateTo("/")
	});
};

export default Logout;
