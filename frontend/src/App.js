import "./App.css";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SendData } from "./context/SendData.js";
function App() {
	return (
		<div className="flex flex-col h-screen">
			<SendData>
				<ToastContainer />
				<Header />
				<Outlet />
				<Footer />
			</SendData>
		</div>
	);
}

export default App;
