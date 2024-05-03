import React, { useState } from "react";

const UpdateUserDetails = ({ user, onClose }) => {
    const [updatedUser, setUpdatedUser] = useState({ ...user });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const fetchData = async () => {
                const response = await fetch("/api/update-user-details", {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedUser)
                });
                if (!response.ok) {
                    throw new Error("Failed to update user details");
                }
                return response.json();
            };
            
            const data = await fetchData();
            console.log("Updated user details:", data);
        } catch (error) {
            console.error(error);
        }
        document.location.reload();
        onClose();
    };
    

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg w-[500px]">
                <h2 className="text-lg font-semibold mb-4">Update User Details</h2>
                <div className="mb-4">
                    <label className="block mb-2">First Name</label>
                    <input
                        type="text"
                        name="firstname"
                        value={updatedUser.firstname}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Last Name</label>
                    <input
                        type="text"
                        name="lastname"
                        value={updatedUser.lastname}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Role</label>
                    <select
                        name="role"
                        value={updatedUser.role}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="ADMIN">Admin</option>
                        <option value="GENERAL">General</option>
                    </select>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Update
                    </button>
                    <button
                        onClick={onClose}
                        className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserDetails;