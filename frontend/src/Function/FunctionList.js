const DeconsteProduct = async ({ product, setDeconstingProduct }) => {
	console.log(product);
	try {
		const token = localStorage.getItem("token");
		const response = await fetch("/api/deconste-product", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(product)
		});

		const result = await response.json();
		console.log(result);
		if (result) {
			setDeconstingProduct(false);
		}
	} catch (error) {
		console.log(error);
	}
};

const getProductList = async ({ setAllProducts }) => {
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
		minimumFractionDigits: 2
	});
	return formatter.format(sellingPrice);
};

const resetProductDetail = ({ setProductDetail, productDetail }) => {
	setProductDetail({
		productName: "",
		brandName: "",
		category: "Select Category",
		description: "",
		price: 0,
		quantity: 0,
		sellingPrice: 0,
		productId: "",
		images: [],
		removedImages: [],
		signature: "",
		userId: ""
	});
	return productDetail;
};

const GetProductCategory = async ({setCategoriesList}) => {
	try {
		const response = await fetch("/api/get-product-category", {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			}
		});
		const data = await response.json();
		console.log(data);
		setCategoriesList(data);
	} catch (error) {
		
	}
}


const functionList = {
	DeconsteProduct,
	getProductList,
	displayCurrency,
	resetProductDetail,
	GetProductCategory,
};

export default functionList;
