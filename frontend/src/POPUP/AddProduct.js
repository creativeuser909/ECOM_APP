import React, { useState, useEffect } from "react";
import ProductCategory from "../POPUP/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import ImageToBase64 from "../ImageConverter/ImageToBase64";
import UploadingAnimation from "./UploadingAnimation";
import { toast } from "react-toastify";
import functionList from "../childComponent/AdminPanel/FunctionList";
import { useContext } from "react";
import { UserDataContext } from "../context/SendData";
const AddProduct = ({ onClose, setShowPorduct }) => {
	const {setAllProducts, productDetail, setProductDetail} = useContext(UserDataContext);
	const [images, setImages] = useState([]);
	const [imagePreview, setImagePreview] = useState(false);
	const [selectedImage, setSelectedImage] = useState([]);
	const [isPorcessing, setIsPorcessing] = useState(true);
	const [showImage, setShowImage] = useState(null);
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);
	const [sellingPrice, setSellingPrice] = useState(0);
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
		setProductDetail((prevproductDetail) => ({
			...prevproductDetail,
			[name]: value
		}));
	};
	const handleSubmit = async () => {
		const token = localStorage.getItem("token");
		try {
			const response = await fetch("/api/upload-product", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ ...productDetail, images })
			});
			if (!response.ok) {
				throw new Error("All Fields are required");
			}
			const resproductDetail = await response.json();
			toast.success(resproductDetail.message);
			console.log(resproductDetail);
			setIsUploading(false);
			setIsUploaded(true);
			setProductDetail({
				productName: "",
				brandName: "",
				category: null,
				description: "",
				price: "",
				quantity: "",
				sellingPrice: ""
			});
			setImages([]);
		} catch (error) {
			setIsUploading(false);
			toast.error(error.message);
			console.error(error);
		}
	};

	useEffect(() => {
		const price = parseInt(productDetail.price);
		let newPrice;
		if (price < 500) {
			newPrice = Math.ceil(price + price * 0.3);
		} else {
			newPrice = price + price * 0.3;
			newPrice = Math.floor(Math.floor(newPrice) / 100) * 100 + 99;
		}
		setSellingPrice(newPrice);
		setProductDetail((prev) => ({ ...prev, sellingPrice: newPrice }));
	}, [productDetail.price]);

	useEffect(() => {}, [selectedImage, images, productDetail]);

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-50 gap-5">
			<div className="h-[500px] w-[500px] bg-emerald-300 rounded shadow-md custom-scroll relative">
				<h1 className="uploadProduct font-poppins font-bold text-center text-3xl mt-2 mb-4">
					Upload Products
				</h1>
				<div className="m-[auto] w-[80%] flex justify-center items-center ">
					<div className="w-full ">
						<label>Product Name</label>
						<input
							type="text"
							name="productName"
							value={productDetail.productName}
							required
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
						/>
						<label>Brand Name</label>
						<input
							type="text"
							name="brandName"
							value={productDetail.brandName}
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
						/>
						<label>Category</label>
						<select
							name="category"
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2">
							<option value=""></option>
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
						{/* End of Display Images */}

						<label>Price</label>
						<input
							type="number"
							name="price"
							value={productDetail.price}
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
							required
						/>
						<label>Selling Price</label>
						<input
							type="number"
							name="sellingPrice"
							value={sellingPrice}
							onChange={handleOnChange}
							className="mb-2 w-full border border-gray-300 rounded-md p-2"
						/>
						<div>
							<h1>Description</h1>
						</div>
						<textarea
							name="description"
							value={productDetail.description}
							onChange={handleOnChange}
							className="w-full min-h-[130px] border border-gray-300 rounded-md p-2"></textarea>
					</div>
				</div>
				{isUploaded ? (
					<div className="flex justify-center gap-6 items-center mt-4 mb-4 pl-4 pr-4">
						<button
							className="bg-blue-600 text-white rounded px-4 py-2"
							onClick={async () => {
								const response = async () => functionList.getProductList({setAllProducts});
								const productDetail = await response();
								if(productDetail){
									onClose();
								}
							}}>
							Done
						</button>
						<button
							className="bg-red-600 text-white rounded px-4 py-2"
							onClick={() => {
								setIsUploaded(false);
							}}>
							Upload Next Product
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
								setIsUploading(true);
							}}>
							Upload
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
			{isUploading && <UploadingAnimation />}
		</div>
	);
};

export default AddProduct;
