import React, { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/SendData";
import moment from "moment/moment";
import { MdModeEdit } from "react-icons/md";
import UpdateUserDetails from "../POPUP/UpdateUserDetails";
import AddProduct from "../POPUP/AddProduct";
const AdminPanel = () => {
	const [userData] = useContext(UserDataContext);
	const [allUsers, setAllUsers] = useState(null);
	const [selectedUser, setSelectedUser] = useState(null);
	const [product, setProduct] = useState(false);
	const [showUsers, setShowUsers] = useState(true);
	const [showPorduct, setShowPorduct] = useState(false);
	const [uploadProductPanel, setUploadProductPanel] = useState(false);
	const getAllUsers = async () => {
		try {
			const response = await fetch("/api/getUsers", {
				method: "GET",
				credentials: "include"
			});
			const data = await response.json();
			setAllUsers(data);
		} catch (error) {
			console.log(error);
		}
	};
	const editUserDetails = (user) => {
		setSelectedUser(user);
	};
	useEffect(() => {
		getAllUsers();
	}, []);
	const uploadPorduct = () => {
		setUploadProductPanel(true);
	};
	return (
		<div className="flex w-full min-h-[calc(100vh-120px)]">
			{/* Left Sidebar */}
			<div className="w-[20%] min-w-[200px] border shadow-md">
				{/* Admin Details section */}
				<div className="h-[25%] min-h-[175px] w-full">
					<div className="flex justify-center items-center mt-4">
						{userData.profilePic ? (
							<img
								src={userData.profilePic}
								alt="Profile"
								className="h-16 w-16 rounded-full cursor-pointer"
							/>
						) : (
							<img
								src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
								alt="profile"
								className="h-16 w-16 rounded-full cursor-pointer"
							/>
						)}
					</div>
					<div className="justify-center items-center  mt-4 text-center">
						<p className="text-2xl">{userData.firstname}</p>
						<p>{userData.email}</p>
					</div>
				</div>

				{/* Menu section */}
				<div className="flex-col w-full">
					<div
						className="pl-6 cursor-pointer hover:bg-slate-400 rounded"
						onClick={() => {
							setShowUsers(true);
							setShowPorduct(false);
							getAllUsers()}}>
						<p>All Users</p>
					</div>
					<div className="pl-6 cursor-pointer hover:bg-slate-400 rounded" onClick={()=>{
						setShowUsers(false);
						setShowPorduct(true);
					}}>
						<p>Products</p>
					</div>
				</div>
			</div>
			{/* Table Section */}
			{
				showUsers ? (
			<div className="w-[100%]">
				<table className="w-full userTable">
					<thead className="text-center">
						<th>SN.</th>
						<th>Name</th>
						<th>Email</th>
						<th>Role</th>
						<th>Created Date</th>
						<th>Action</th>
					</thead>
					{allUsers && (
						<tbody>
							{allUsers.map((user, index) => (
								<tr key={index + 1}>
									<td className="text-center">{index + 1}</td>
									<td>{user?.firstname}</td>
									<td className="text-center">
										{user.email}
									</td>
									<td className="text-center">{user.role}</td>
									<td className="text-center">
										{moment(user.createdAt).format("ll")}
									</td>
									<td className="text-center flex items-center justify-center">
										<div
											className="w-[30px] h-[30px] items-center rounded-full bg-green-400 text-center flex justify-center hover:bg-green-500"
											onClick={() =>
												editUserDetails(user)
											}>
											<MdModeEdit />
										</div>
									</td>
								</tr>
							))}
						</tbody>
					)}
				</table>
			</div>

				) : (
					<div className="flex w-full bg-emerald-500">
						<div className="pt-2 pb-2 shadow-md rounded items-center w-full h-[max-content] flex justify-between bg-zinc-500">
							<h1 className="ml-4">All Product</h1>
							<button className="mr-4 rounded bg-slate-400 p-4 shadow-md" onClick={uploadPorduct}>Upload Product</button>
						</div>
					</div>
				)
			}
			{selectedUser && (
				<UpdateUserDetails
					user={selectedUser}
					onClose={() => setSelectedUser(null)}
				/>
			)}
			{uploadProductPanel &&
				<AddProduct onClose={() => setUploadProductPanel(false)}/>
			}
		</div>
	);
};

export default AdminPanel;
