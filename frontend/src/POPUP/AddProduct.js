import React, { useEffect, useState } from "react";
import ProductCategory from "../POPUP/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import ImageToBase64 from "../ImageConverter/ImageToBase64";

const AddProduct = ({ onClose }) => {
	const [AllImages, setAllImages] = useState([]);
	const [imageProcessing, setImageProcessing] = useState(true);

	async function displayImages(files) {
		const images = [];

		for (let i = 0; i < files.length; i++) {
			const Image = await ImageToBase64(files[i]);
			if (Image) {
				images.push(Image);
			}
		}

		setAllImages(images);
		setImageProcessing(false);
	}

	useEffect(() => {}, [imageProcessing, AllImages]);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50">
			<div className="h-[500px] w-[500px] bg-emerald-300 rounded shadow-md">
				<h1 className="font-poppins font-bold">Upload Products</h1>
				<div className="border m-[auto] w-[80%] flex justify-center items-center">
					<div className="w-full ">
						<label>Product Name</label>
						<input
							type="text"
							name="name"
							id="name"
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
						/>
						<label>Brand Name</label>
						<input
							type="text"
							name="name"
							id="name"
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
						/>
						<label>Category</label>
						<select
							name="category"
							id="category"
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
										className="w-[120px] h-[120px] bg-slate-600 rounded relative">
										<img
											src={image}
											alt="product"
											className="rounded w-full h-full object-cover"
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
				<button
					onClick={() => {
						onClose();
					}}>
					Cancel
				</button>
			</div>
		</div>
	);
};

export default AddProduct;
