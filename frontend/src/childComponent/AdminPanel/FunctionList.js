const DeleteProduct = async (data) => {
    console.log(data)
   try {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/delete-product", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    if(result.success) {
        getProductList();
    }
   } catch (error) {
       console.log(error);
   }
}

const getProductList = async () => {
    console.log("hello")
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
        console.log(data);
        return data
    } catch (error) {
        console.log(error);
    }
};

const UpdateProductDetail = async (data) => {
    console.log(data);
}

const functionList = { DeleteProduct, UpdateProductDetail, getProductList};

export default functionList;