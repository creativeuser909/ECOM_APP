import React, { useContext, useEffect, useRef, useState } from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { GrSearch } from "react-icons/gr";
import { IoCart } from "react-icons/io5";
import { FaCircleUser } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import Logo from "./Logo.js";
import { UserDataContext } from "../context/SendData.js";
import UserMenu from "./UserMenu.js";

const Header = () => {
	const {userData} = useContext(UserDataContext);
	const [showMenu, setShowMenu] = useState(false);
	const userIconRef = useRef(null);
	useEffect(() => {
		const handleMouseOver = (e) => {
			try {
				if (
					userIconRef.current &&
					userIconRef.current.contains(e.target)
				) {
					setShowMenu(true);
				} else {
					setShowMenu(false);
				}
			} catch (error) {}
		};

		document.addEventListener("mouseover", handleMouseOver);
		return () => {
			document.removeEventListener("mouseover", handleMouseOver);
		};
	});
	return (
		<header className="h-16 shadow-md bg-white flex justify-between items-center">
			<section className="w-[20%] items-center ml-4">
				<div>
					<Link to={"/"}>
						<Logo w={90} h={50} />
					</Link>
				</div>
			</section>
			<div className="sm:hidden text-3xl mr-4">
				<GiHamburgerMenu />
			</div>
			<section className="hidden sm:flex w-[60%] justify-center items-center">
				<input
					type="text"
					placeholder="Search Product here..."
					className="w-[60%] outline-none pl-3 border rounded-l-full h-8 focus-within:shadow"
				/>
				<div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
					<GrSearch />
				</div>
			</section>

			<section className="hidden w-[20%] min-w-[250px] sm:flex justify-between mr-4 h-[100%] items-center">
				<div
					ref={userIconRef}
					className="user_icon h-[100%] items-center justify-center">
					<div className="text-5xl h-[100%] relative flex justify-center items-center">
						{userData.token && userData.profilePic ? (
							<img
								src={userData.profilePic}
								alt="Profile"
								className="h-12 w-12 rounded-full cursor-pointer"
							/>
						) : (
							<FaCircleUser className="cursor-pointer" />
						)}
					</div>
					{showMenu && (
						<div className="user_icon absolute translate-x-[-38%] translate-y-[-6%]">
							<UserMenu />
						</div>
					)}
				</div>
				<div className="text-3xl relative w-[20%] flex justify-center items-center">
					<span>
						<IoCart className="text-5xl" />
					</span>
					<div className="flex justify-center items-center text-sm absolute top-[-80%] left-[15%] right-0 bottom-0">
						<p className="text-white bg-red-600 w-5 h-5 rounded-full flex justify-center items-center">
							0
						</p>
					</div>
				</div>
				<div className="w-[50%] flex justify-center items-center">
					<Link to={userData.token ? "/logout" : "/login"}>
						{userData.token && userData.email ? (
							<button className="button logout ">Logout</button>
						) : (
							<button className="button login ">Login</button>
						)}
					</Link>
				</div>
			</section>
		</header>
	);
};

export default Header;
