import React from "react";
import functionList from "../Function/FunctionList";
import { useEffect } from "react";
import { useContext } from "react";
import { UserDataContext } from "../context/SendData";
const Home = () => {
	const { categoriesList, setCategoriesList } = useContext(UserDataContext);
	useEffect(() => {
		functionList.GetProductCategory({
			setCategoriesList
		});
	},[setCategoriesList]);

	useEffect(() => {}, [categoriesList]);
	return <div className="bg-orange-400">Home</div>;
};

export default Home;
