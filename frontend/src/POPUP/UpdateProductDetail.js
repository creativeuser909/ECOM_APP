import React, { useState, useEffect } from "react";
import ProductCategory from "../POPUP/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import ImageToBase64 from "../ImageConverter/ImageToBase64";
import { toast } from "react-toastify";
import UpdatingAnimation from "./UpdatingAnimation";
const UpdateProductDetail = ({ onClose, productDetail }) => {
	const [data, setData] = useState({
		productName: productDetail.productName,
		brandName: productDetail.brandName,
		category: productDetail.category,
		description: productDetail.description,
		price: productDetail.price,
		quantity: productDetail.quantity,
		sellingPrice: productDetail.sellingPrice,
		productId: productDetail.productId,
		images: productDetail.images,
		removedImages: [],
		signature: productDetail.signature,
	});
	const [imagePreview, setImagePreview] = useState(false);
	const [showImage, setShowImage] = useState(null);
	const [isUpdating, setIsUpdating] = useState(false);
	const [isUpdated, setIsUpdated] = useState(false);

	useEffect(() => {
		const price = parseInt(data.price);
		let sellingPrice;
		if (price < 500) {
			sellingPrice = Math.ceil(price + price * 0.3);
		} else {
			sellingPrice = price + price * 0.3;
			sellingPrice =
				Math.floor(Math.floor(sellingPrice) / 100) * 100 + 99;
		}
		setData((prev) => ({ ...prev, sellingPrice }));
	}, [data.price]);
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
		const newImages = [...data.images, ...images];
		setData({ ...data, images: newImages });
	};
	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};
	const handleSubmit = async () => {
		const token = localStorage.getItem("token");
		try {
			const response = await fetch("/api/update-product", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify(data)
			});
			if (!response.ok) {
				throw new Error("All Fields are required");
			}
			const resData = await response.json();
			toast.success(resData.message);
			console.log(resData);
			setIsUpdating(false);
			setIsUpdated(true);
			setData({
				productName: "",
				brandName: "",
				category: "",
				description: "",
				price: "",
				quantity: "",
				sellingPrice: "",
				images: []
			});
		} catch (error) {
			setIsUpdating(false);
			toast.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		console.log(data);
	}, [data]);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50 gap-5">
			<div className="h-[500px] w-[500px] bg-emerald-300 rounded shadow-md custom-scroll relative">
				<h1 className="uploadProduct font-poppins font-bold text-center text-3xl mt-2 mb-4">
					UPDATE PRODUCT DETAILS
				</h1>
				<div className="m-[auto] w-[80%] flex justify-center items-center ">
					<div className="w-full ">
						<label>Product Name</label>
						<input
							type="text"
							name="productName"
							value={data.productName}
							required
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
						/>
						<label>Brand Name</label>
						<input
							type="text"
							name="brandName"
							value={data.brandName}
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
						/>
						<label>Category</label>
						<select
							name="category"
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2">
							<option value={data.category}>
								{data.category}
							</option>
							{ProductCategory.map((category) => (
								<option
									key={category.id}
									value={category.value}>
									{category.label}
								</option>
							))}
						</select>
						{/* Image Upload */}
						<label>Upload Product Images</label>
						<label
							htmlFor="UploadProductImage"
							className="cursor-pointer">
							<div className="w-full bg-slate-200 rounded flex items-center justify-center mb-2">
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
						{/* End of Image Upload */}
						{/* Display Images */}
						<div
							className="mt-4 grid grid-cols-3 gap-4"
							id="displayImages">
							{data.images.length > 0 &&
								data.images.map((image, index) => (
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
												if (image.startsWith("https")) {
													const removedImages = [
														...data.removedImages,
														image
													];
													setData({
														...data,
														images: data.images.filter(
															(img) =>
																img !== image
														),
														removedImages
													});
												} else {
													setData({
														...data,
														images: data.images.filter(
															(img) =>
																img !== image
														)
													});
												}
												setImagePreview(false);
												setShowImage(null);
											}}
										/>
									</div>
								))}
						</div>
						{/* End of Display Images */}

						<label>Price</label>
						<input
							type="number"
							name="price"
							value={data.price}
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
							required
						/>
						<label>Selling Price</label>
						<input
							type="number"
							name="sellingPrice"
							value={data.sellingPrice}
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
						/>
						<div>
							<h1>Description</h1>
						</div>
						<textarea
							name="description"
							value={data.description}
							onChange={handleOnChange}
							className="w-full min-h-[130px] border border-gray-300 rounded-md p-2"></textarea>
					</div>
				</div>
				{isUpdated ? (
					<div className="flex justify-center gap-6 items-center mt-4 mb-4 pl-4 pr-4">
						<button
							className="bg-blue-600 text-white rounded px-4 py-2"
							onClick={() => {
								onClose();
							}}>
							Done
						</button>
						<MdCancel
							className="absolute top-2 right-0 text-2xl bg-white rounded-full cursor-pointer"
							onClick={() => {
								onClose();
							}}
						/>
					</div>
				) : (
					<div className="flex justify-center gap-6 items-center mt-4 mb-4 pl-4 pr-4">
						<button
							className="bg-blue-600 text-white rounded px-4 py-2"
							onClick={() => {
								handleSubmit();
								setIsUpdating(true);
							}}>
							UPDATE
						</button>
						<button
							className="bg-red-600 text-white rounded px-4 py-2"
							onClick={onClose}>
							Cancel
						</button>
					</div>
				)}
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
			{/* End of Image Preview Div */}
			{isUpdating && <UpdatingAnimation />}
		</div>
	);
};

export default UpdateProductDetail;
