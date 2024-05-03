import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Triangle } from "../UI/Triangle.svg";
import { UserDataContext } from "../context/SendData";
import { useContext } from "react";
const UserMenu = () => {
	const [userData] = useContext(UserDataContext);
	return (
		<>
			<div>
				<Triangle className="ml-[50%] translate-x-[-50%] mb-[-5px]" />
			</div>
			<div className="user_icon inline-flex bg-green-300 text-center text-sm w-[max-content] gap-[20px] py-2 px-6 rounded shadow-md relative">
				{userData.email && userData.token && userData.role === "ADMIN" ? (
					<Link to={"/admin"}>Admin</Link>
				) : (
					<Link to={"/login"}>Login</Link>
				)}
			</div>
		</>
	);
};

export default UserMenu;
