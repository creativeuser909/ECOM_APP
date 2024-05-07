
const DeleteProduct = async ({product, setDeletingProduct}) => {
	console.log(product);
	try {
		const token = localStorage.getItem("token");
		const response = await fetch("/api/delete-product", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(product),
		});

		const result = await response.json();
		console.log(result);
		if (result) {
			setDeletingProduct(false);
		}
	} catch (error) {
		console.log(error);
	}
};

const getProductList = async ({setAllProducts}) => {
	try {
		const token = localStorage.getItem("token");
		const response = await fetch("/api/get-products", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});

		const data = await response.json();
		setAllProducts(data);
		return data;
	} catch (error) {
		console.log(error);
	}
};

const displayCurrency = (sellingPrice) => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "INR",
		minimumFractionDigits: 2,
	})
	return formatter.format(sellingPrice);
}
const functionList = { DeleteProduct, getProductList, displayCurrency };

export default functionList;
