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
		<>
			<SendData>
				<ToastContainer />
				<Header />
				<main className="mainClass min-h-[calc(100vh-120px)]">
					<Outlet />
				</main>
				<Footer />
			</SendData>
		</>
	);
}

export default App;
