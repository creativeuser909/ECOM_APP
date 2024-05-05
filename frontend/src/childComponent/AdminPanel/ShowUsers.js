import React, { useEffect, useState } from "react";
import moment from "moment"; // Importing moment correctly
import { MdModeEdit } from "react-icons/md";
import UpdateUserDetails from "../../POPUP/UpdateUserDetails";

const ShowUsers = () => {
    const [allUsers, setAllUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    const editUserDetails = (user) => {
        setSelectedUser(user);
    };

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

    useEffect(() => {
        getAllUsers();
    }, []);

    return (
        <div className="w-full">
            <div className="w-full">
                <table className="w-full userTable">
                    <thead className="text-center">
                        <tr>
                            <th>SN.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Created Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers && allUsers.map((user, index) => (
                            <tr key={index + 1}>
                                <td className="text-center">{index + 1}</td>
                                <td>{user.firstname}</td>
                                <td className="text-center">{user.email}</td>
                                <td className="text-center">{user.role}</td>
                                <td className="text-center">{moment(user.createdAt).format("ll")}</td>
                                <td className="text-center flex justify-center">
                                    <div
                                        className="w-[30px] h-[30px] items-center rounded-full bg-green-400 text-center flex justify-center hover:bg-green-500 cursor-pointer"
                                        onClick={() => editUserDetails(user)}
                                    >
                                        <MdModeEdit />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedUser && (
                <UpdateUserDetails
                    user={selectedUser}
                    onClose={() => setSelectedUser(null)}
                />
            )}
        </div>
    );
};

export default ShowUsers;
