import React from "react";
import "./App.css";
const App = () => {
	return (
		<div className="m-10">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="30"
				height="30"
				viewBox="0 0 139 109"
				fill="none">
				<path
					d="M69.5 0L138.349 108.75H0.650978L69.5 0Z"
					fill="#000000"
				/>
			</svg>
			<div className="user_icon inline-flex bg-green-300 text-center text-sm w-[max-content] gap-[20px] py-2 px-6 rounded shadow-md relative">
				<span>
					<ul>your name</ul>
					<ul>your name</ul>
					<ul>your name</ul>
					<ul>your name</ul>
					<ul>your name</ul>
					<ul>your name</ul>
				</span>
				<span className="user_icon">Your Order</span>
			</div>
		</div>
	);
};

export default App;
