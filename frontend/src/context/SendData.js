import React, { createContext, useEffect, useState } from "react";
export const UserDataContext = createContext();
export const SendData = ({ children }) => {
	const [showUserPanel, setShowUserPanel] = useState(true);
	const [showProductPanel, setShowProductPanel] = useState(false);
	const [allProducts, setAllProducts] = useState([]);
	const [allUsers, setAllUsers] = useState([]);

	const [userData, setUserData] = useState({
		token: localStorage.getItem("token") ?? "",
		firstname: localStorage.getItem("firstname") ?? "",
		email: localStorage.getItem("email") ?? "",
		profilePic: localStorage.getItem("profilePic") ?? "",
		role: localStorage.getItem("role") ?? ""
	});
	const [productsList, setProductsList] = useState([]);
	const [productDetail, setProductDetail] = useState({
		productName: "",
		brandName: "",
		category: "Select Category",
		description: "",
		price: 0,
		quantity: 0,
		sellingPrice: 0,
		productId: "",
		images: [],
		removedImages: [],
		signature: "",
		userId: ""
	});

	const [categoriesList, setCategoriesList] = useState([]);

	const [initialized, setInitialized] = useState(true);
	const isTokenAvialable = localStorage.getItem("token") ?? "";
	useEffect(() => {
		if (isTokenAvialable && initialized) {
			const fetchData = async () => {
				try {
					const token = localStorage.getItem("token");
					if (token) {
						const dataResponse = await fetch("/api/user-details", {
							method: "POST",
							credentials: "include",
							headers: {
								"Content-Type": "application/json",
								Authorization: `Bearer ${token}`
							},
							body: JSON.stringify({ token })
						});

						if (!dataResponse.ok) {
							localStorage.clear();
							throw new Error("Failed to fetch user details");
						}

						const user_data = await JSON.parse(
							JSON.stringify(dataResponse.json())
						).user;
						if (user_data) {
							localStorage.setItem(
								"profilePic",
								user_data.profilePic
							);
							localStorage.setItem(
								"firstname",
								user_data.firstname
							);
							localStorage.setItem("email", user_data.email);
							localStorage.setItem("role", user_data.role);
							setUserData((prev) => {
								return {
									...prev,
									firstname: user_data.firstname,
									email: user_data.email,
									profilePic: user_data.profilePic,
									role: user_data.role
								};
							});
						}
						setInitialized(false);
					}
				} catch (error) {
					localStorage.clear();
					document.location.reload();
					console.error(
						"Error fetching user details:",
						error.message
					);
				}
			};
			fetchData();
		}
	}, [isTokenAvialable, initialized, userData]);

	return (
		<UserDataContext.Provider
			value={{
				userData,
				setUserData,
				showUserPanel,
				setShowUserPanel,
				showProductPanel,
				setShowProductPanel,
				allProducts,
				setAllProducts,
				allUsers,
				setAllUsers,
				productDetail,
				setProductDetail,
				productsList,
				setProductsList,
				categoriesList,
				setCategoriesList
			}}>
			{children}
		</UserDataContext.Provider>
	);
};

export default SendData;
