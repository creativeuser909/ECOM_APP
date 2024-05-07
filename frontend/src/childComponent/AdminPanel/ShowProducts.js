import React, { useEffect, useState } from "react";
import AddProduct from "../../POPUP/AddProduct";
import { MdModeEdit } from "react-icons/md";
import UpdateProductDetail from "../../POPUP/UpdateProductDetail";
import { MdDelete } from "react-icons/md";
import functionList from "../../childComponent/AdminPanel/FunctionList";
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

	const adminPanelMainDiv = document.querySelectorAll(".adminPanelMainDiv");
	const adminPanelMainDivHeight = Array.from(adminPanelMainDiv).reduce(
		(acc, cur) => acc + cur.offsetHeight,
		0
	);

	console.log(
		"Total height of all 'allProducts' divs: " + adminPanelMainDivHeight + "px"
	);

	useEffect(() => {
		functionList.getProductList({ setAllProducts });
	}, [deletingProduct]);
	return (
		<div className="showAllProductMainDiv w-full">
			<div className="showAllProductHeaderDiv flex w-full bg-emerald-500">
				<div className="pt-2 pb-2 shadow-md rounded items-center w-full h-[max-content] flex justify-between bg-zinc-500">
					<h1 className="ml-4">All Product</h1>
					<button
						className="mr-4 rounded bg-slate-400 p-4 shadow-md"
						onClick={uploadPorduct}>
						Upload Product
					</button>
				</div>
			</div>
			{allProducts && (
				<div className="w-full h-[calc(100vh-192px)] overflow-y-scroll">
					<div className="w-[fit-content] flex flex-wrap gap-4 m-4 justify-normal">
						{allProducts.map((product) => (
							<div
								key={product.productId}
								className="w-[250px] h-[250px] rounded shadow-md relative flex items-center justify-center">
								<div className="w-full h-full p-2 rounded">
									<img
										src={product.images[0]}
										alt="Product"
										className="h-[70%] m-auto rounded"
									/>
									<div className="text-sm mt-[-4px] ml-6">
										<p>{product.productName}</p>
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
			)}
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
