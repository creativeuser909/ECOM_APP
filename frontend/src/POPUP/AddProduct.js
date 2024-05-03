import React, { useEffect, useState } from "react";
import ProductCategory from "../POPUP/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import ImageToBase64 from "../ImageConverter/ImageToBase64";
import UploadAndStoreProduct from "../Store_Product_At/UploadAndStoreProduct";

const AddProduct = ({ onClose }) => {
	const [AllImages, setAllImages] = useState([]);
	const [imageProcessing, setImageProcessing] = useState(true);

	const [data, setData] = useState([]);
	const [ifImage, setIfImage] = useState(false);
	const [imagePreview, setImagePreview] = useState(null);

	async function displayImages(files) {
		const images = [];

		for (let i = 0; i < files.length; i++) {
			const Image = await ImageToBase64(files[i]);
			if (Image) {
				images.push(Image);
				printdata(Image)
			}
		}

		setAllImages((prev) => {
			return [...prev, ...images];
		});
		setImageProcessing(false);
	}
	const handleOnchnge = (e) => {
		const { name, value } = e.target;
		setData((prev) => {
			return {
				...prev,
				[name]: value
			};
		});
	};
	useEffect(() => {
	}, [imageProcessing, AllImages, ifImage, data]);

	const printdata = async (Image) =>{
		try {
			const response = await UploadAndStoreProduct(Image);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
	}
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
							id="productName"
							onChange={handleOnchnge}
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
						/>
						<label>Brand Name</label>
						<input
							type="text"
							name="brandName"
							id="brandName"
							onChange={handleOnchnge}
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
						/>
						<label>Category</label>
						<select
							name="category"
							id="category"
							onChange={handleOnchnge}
							className="mb-2 w-full border border-gray-300 rounded-md p-2">
							{ProductCategory.map((category) => (
								<option
									key={category.id}
									value={category.value}>
									{category.label}
								</option>
							))}
						</select>
						<label>Upload Product Image</label>
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
									name="UploadProductImage"
									id="UploadProductImage"
									className="hidden"
									multiple
									onChange={(e) =>
										displayImages(e.target.files)
									}
								/>
							</div>
						</label>
						<div
							className="mt-4 grid grid-cols-3 gap-4"
							id="displayImages">
							{!imageProcessing &&
								AllImages.map((image, i) => (
									<div
										key={i}
										className="w-[120px] h-[120px] bg-slate-600 rounded relative"
										onClick={() => {
											setImagePreview(image);
											setIfImage(true);
										}}>
										<img
											src={image}
											alt="product"
											className="rounded w-full h-full object-cover cursor-pointer"
										/>
										<MdCancel
											className="absolute top-0 right-0 cursor-pointer text-2xl"
											onClick={() => {
												const updatedImages = [
													...AllImages
												];
												updatedImages.splice(i, 1);
												setAllImages(updatedImages);
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
						onClick={() => {
							setData((prev) => {
								return {
									...prev,
									images: AllImages
								};
							});
						}}>
						Upload
					</button>
					<button
						className="bg-red-600 text-white rounded px-4 py-2"
						onClick={() => {
							onClose();
						}}>
						Cancel
					</button>
				</div>
			</div>
			{ifImage && (
				<div className="relative h-[500px] rounded shadow-md flex items-center justify-center">
					<img
						src={imagePreview}
						alt="Product_image"
						className="h-full rounded"
					/>
					<MdCancel
						className="absolute top-2 right-2 cursor-pointer text-2xl"
						onClick={() => setIfImage(false)}
					/>
				</div>
			)}
		</div>
	);
};

export default AddProduct;
