import React, { useEffect, useState } from "react";
import AddProduct from "../../POPUP/AddProduct";
import { MdModeEdit } from "react-icons/md";
import UpdateProductDetail from "../../POPUP/UpdateProductDetail";
import { MdDelete } from "react-icons/md";
import functionList from "../../Function/FunctionList";
import DeletingAnimation from "../../POPUP/DeletingAnimation";
import { UserDataContext } from "../../context/SendData";
import { useContext } from "react";

// const ShowProducts = ({ setShowPorduct }) => {
const ShowProducts = () => {
	const { setProductDetail, allProducts, setAllProducts } =
		useContext(UserDataContext);
	const [uploadProductPanel, setUploadProductPanel] = useState(false);
	const [updateProductPanel, setUpdateProductPanel] = useState(false);
	const [deletingProduct, setDeletingProduct] = useState(false);
	const uploadPorduct = () => {
		setUploadProductPanel(true);
	};

	useEffect(() => {
		functionList.getProductList({ setAllProducts });
	}, [deletingProduct, setAllProducts]);
	return (
		<div className="w-full flex flex-col relative">
			<div className="w-full">
				<div className="pt-2 pb-2 shadow-md rounded items-center w-full h-[max-content] flex justify-between">
					<h1 className="ml-4 font-semibold text-xl">All Product</h1>
					<button
						className="mr-4 bg-green-400 rounded p-2 shadow-md text-lg font-semibold"
						onClick={uploadPorduct}>
						Upload Product
					</button>
				</div>
			</div>
			<div className="w-full h-full relative">
				<div className="absolute inset-0 overflow-y-scroll flex flex-wrap gap-6 justify-start ml-6 mr-4">
					{allProducts?.map((product, index) => (
						<div
							key={index}
							className="w-[250px] h-[300px] rounded shadow-md relative flex items-center justify-center">
							<div className="h-full p-2 rounded ">
								<img
									src={product.images[0]}
									alt="Product"
									className="h-[60%] m-auto rounded"
								/>
								<div className="text-sm">
									<p>{product.productName}</p>
									<p className="text-ellipsis line-clamp-1">
										{product.description}
									</p>
									<p className="font-semibold">
										{functionList.displayCurrency(
											product.sellingPrice
										)}
									</p>
								</div>
							</div>
							<div className="absolute bottom-0 right-0 bg-green-600 rounded-full p-2">
								<MdModeEdit
									className="text-2xl text-white cursor-pointer"
									onClick={() => {
										setProductDetail(product);
										setUpdateProductPanel(true);
									}}
								/>
							</div>
							<div className="absolute bottom-0 left-0 bg-red-600 rounded-full p-2">
								<MdDelete
									className="text-2xl text-white cursor-pointer"
									onClick={() => {
										setDeletingProduct(true);
										functionList.DeleteProduct({
											product,
											setDeletingProduct
										});
									}}
								/>
							</div>
						</div>
					))}
				</div>
			</div>

			{uploadProductPanel && (
				<AddProduct onClose={() => setUploadProductPanel(false)} />
			)}
			{updateProductPanel && (
				<UpdateProductDetail
					onClose={() => setUpdateProductPanel(false)}
				/>
			)}
			{deletingProduct && <DeletingAnimation />}
		</div>
	);
};

export default ShowProducts;
