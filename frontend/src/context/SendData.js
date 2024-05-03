import React, { createContext, useEffect, useState } from "react";
export const UserDataContext = createContext();
export const SendData = ({ children }) => {
	const [userData, setUserData] = useState({
		token: localStorage.getItem("token") ?? "",
		firstname: localStorage.getItem("firstname") ?? "",
		email: localStorage.getItem("email") ?? "",
		profilePic: localStorage.getItem("profilePic") ?? "",
		role: localStorage.getItem("role") ?? "",
	});
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
		<UserDataContext.Provider value={[userData, setUserData]}>
			{children}
		</UserDataContext.Provider>
	);
};

export default SendData;
