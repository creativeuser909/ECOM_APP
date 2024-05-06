import React, { useEffect, useState } from "react";
import AddProduct from "../../POPUP/AddProduct";
import { MdModeEdit } from "react-icons/md";
import UpdateProductDetail from "../../POPUP/UpdateProductDetail";
import { MdDelete } from "react-icons/md";
import functionList from "../../childComponent/AdminPanel/FunctionList";

const ShowProducts = ({setShowPorduct}) => {
	const [uploadProductPanel, setUploadProductPanel] = useState(false);
	const [updateProductPanel, setUpdateProductPanel] = useState(false);
	const [allProducts, setAllProducts] = useState(null);
	const [data, setData] = useState(null);
	const uploadPorduct = () => {
		setUploadProductPanel(true);
	};
	const getProductList = async () => {
		try {
			const token = localStorage.getItem("token");
			const response = await fetch("/api/get-products", {
				method: "POST",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`
				}
			});

			const data = await response.json();
			console.log(data);
			setAllProducts(data);
			setShowPorduct(data)
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProductList();
	}, []);
	return (
		<div className="w-full h-full">
			<div className="flex w-full bg-emerald-500">
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
				<div className="w-full flex justify-center items-center">
					<div className="w-[fit-content] flex flex-wrap gap-4 m-4 justify-normal">
						{allProducts.map((product) => (
							<div
								key={product.productId}
								className="w-[250px] h-[250px] rounded shadow-md relative flex items-center justify-center">
								<img src={product.images[0]} alt="Product" />
								<div className="absolute bottom-0 right-0 bg-green-600 rounded-full p-2">
									<MdModeEdit
										className="text-2xl text-white cursor-pointer"
										onClick={() => {
											setData(product);
											setUpdateProductPanel(true);
										}}
									/>
								</div>
								<div className="absolute bottom-0 left-0 bg-red-600 rounded-full p-2">
									<MdDelete
										className="text-2xl text-white cursor-pointer"
										onClick={() => {
											setData(product);
											const deleteProduct =
												functionList.DeleteProduct(
													product
												);
											if (deleteProduct) {
												getProductList();
											}
										}}
									/>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{uploadProductPanel && (
				<AddProduct
					onClose={() => setUploadProductPanel(false)}
					getProductList={getProductList}
				/>
			)}
			{updateProductPanel && (
				<UpdateProductDetail
					onClose={() => setUpdateProductPanel(false)}
					productDetail={data}
				/>
			)}
		</div>
	);
};

export default ShowProducts;
