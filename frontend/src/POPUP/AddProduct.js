import React, { useState, useEffect } from "react";
import ProductCategory from "../POPUP/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import ImageToBase64 from "../ImageConverter/ImageToBase64";

const AddProduct = ({ onClose }) => {
	const [data, setData] = useState({});
	const [images, setImages] = useState([]);
	const [imagePreview, setImagePreview] = useState(false);
	const [selectedImage, setSelectedImage] = useState([]);
	const [isPorcessing, setIsPorcessing] = useState(true);
	const [showImage, setShowImage] = useState(null);
	const onSelectFile = async (event) => {
		const files = event.target.files;
		const images = [];
		for (const file of files) {
			const Image = await ImageToBase64(file);
			if (Image) {
				images.push(Image);
			}
		}
		event.target.value = null;
		event.stopPropagation();
		setSelectedImage(images);
		setImages((prev) => [...prev, ...images]);
		setIsPorcessing(false);
	};
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};
	const handleSubmit = async () => {
		try {
			const response = await fetch("/api/upload-product", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ ...data, images: images })
			});
			if (!response.ok) {
				throw new Error("Failed to add product");
			}
			const resData = await response.json();
			console.log(resData);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {}, [selectedImage, images]);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50 gap-5">
			<div className="h-[500px] w-[500px] bg-emerald-300 rounded shadow-md custom-scroll">
				<h1 className="uploadProduct font-poppins font-bold text-center text-3xl mt-2 mb-4">
					Upload Products
				</h1>
				<div className="m-[auto] w-[80%] flex justify-center items-center ">
					<div className="w-full ">
						<label>Product Name</label>
						<input
							type="text"
							name="productName"
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
						/>
						<label>Brand Name</label>
						<input
							type="text"
							name="brandName"
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
						/>
						<label>Category</label>
						<select
							name="category"
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2">
							{ProductCategory.map((category) => (
								<option
									key={category.id}
									value={category.value}>
									{category.label}
								</option>
							))}
						</select>
						<label>Upload Product Images</label>
						<label
							htmlFor="UploadProductImage"
							className="cursor-pointer">
							<div className="w-full bg-slate-200 rounded flex items-center justify-center">
								<div>
									<FaCloudUploadAlt className="text-6xl m-[auto]" />
									<p>Upload Image</p>
								</div>
								<input
									type="file"
									id="UploadProductImage"
									className="hidden"
									multiple
									onChange={onSelectFile}
									accept="image/*"
								/>
							</div>
						</label>
						<div
							className="mt-4 grid grid-cols-3 gap-4"
							id="displayImages">
							{!isPorcessing &&
								images &&
								images.map((image, index) => (
									<div
										key={index}
										className="w-[120px] h-[120px] bg-slate-600 rounded relative">
										<img
											src={image}
											alt="product"
											className="rounded w-full h-full object-cover "
											onClick={() => {
												setImagePreview(true);
												setShowImage(image);
											}}
										/>
										<MdCancel
											className="absolute top-0 right-0 text-2xl bg-white rounded-full cursor-pointer"
											onClick={() => {
												setImages(
													images.filter(
														(e) => e !== image
													)
												);
												setImagePreview(false);
												setShowImage(null);
											}}
										/>
									</div>
								))}
						</div>
					</div>
				</div>
				<div className="flex justify-center gap-6 items-center mt-4 mb-4 pl-4 pr-4">
					<button
						className="bg-blue-600 text-white rounded px-4 py-2"
						onClick={handleSubmit}>
						Upload
					</button>
					<button
						className="bg-red-600 text-white rounded px-4 py-2"
						onClick={onClose}>
						Cancel
					</button>
				</div>
			</div>
			{/* Image Preview Div */}
			{imagePreview && showImage && (
				<div className="flex items-center justify-center bg-gray-700 bg-opacity-50">
					<div className="relative h-[500px] rounded shadow-md">
						<img
							src={showImage}
							alt="Product_image"
							className="h-full rounded"
						/>
						<MdCancel
							className="absolute top-0 right-0 text-2xl"
							onClick={() => {
								setImagePreview(false);
								setShowImage(null);
							}}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default AddProduct;
