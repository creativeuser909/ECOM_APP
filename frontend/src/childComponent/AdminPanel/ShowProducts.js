import React, { useEffect, useState } from "react";
import AddProduct from "../../POPUP/AddProduct";
import { MdModeEdit } from "react-icons/md";

const ShowProducts = () => {
	const [uploadProductPanel, setUploadProductPanel] = useState(false);
	const [allProducts, setAllProducts] = useState(null);
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
								className="w-[250px] h-[250px] rounded shadow-md relative">
								<img
									src={product.product.images[0]}
									alt="Product"
								/>
								<div className="absolute bottom-0 right-0 bg-green-600 rounded-full p-2">
									<MdModeEdit className="text-2xl text-white"/>
								</div>
							</div>
						))}
					</div>
				</div>
			)}
			{uploadProductPanel && (
				<AddProduct onClose={() => setUploadProductPanel(false)} />
			)}
		</div>
	);
};

export default ShowProducts;
