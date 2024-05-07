import React, { useEffect, useContext } from "react";
import functionList from "../Function/FunctionList";
import { UserDataContext } from "../context/SendData";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Home = () => {
	const { categoriesList, setCategoriesList } = useContext(UserDataContext);

	const settings = {
		arrows: true,
		autoplay: true,
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};
	// Create a function to import all images from a folder
	function importAll(r) {
		const images = [];
		r.keys().forEach((key) => images.push(r(key)));
		return images;
	}
	const images = importAll(
		require.context("../assets/banner/desktop", false, /\.(png|jpe?g|svg)$/)
	);
	console.log(images);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const result = await functionList.GetProductCategory();
				console.log("Fetched data:", result.categoriesList);
				setCategoriesList(result.categoriesList);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchData();
	}, [setCategoriesList]);

	useEffect(() => {
		console.log(categoriesList[0]);
	}, [categoriesList]);

	return (
		<div className="w-full">
			{/* Categories Section */}
			<div className="container mx-auto">
				<div className="flex full justify-start items-center overflow-x-scroll">
					{categoriesList?.map((category) => (
						<Link
							to={`/category/${category.category}`}
							className="justify-center flex items-center">
							<div className="rounded text-center m-4 hover:scale-105 transition-all ease-in-out duration-200">
								<div className="w-[120px] h-[120px] rounded-full bg-white shadow-md">
									<img
										src={category.images[0]}
										alt={category.category}
										className="h-full rounded-full cursor-pointer object-scale-down"
									/>
								</div>
								<h1 className="capitalize">
									{category.category}
								</h1>
							</div>
						</Link>
					))}
				</div>
			</div>
			{/* End of Categories Section */}
			{/* Banners Section */}
			<div className="w-full container mx-auto">
				<Slider {...settings}>
					{images?.map((image, index) => (
						<div key={index} className="mr-4 flex w-full border">
							<img
								src={image}
								alt="banner"
								className="w-full object-cover"
							/>
						</div>
					))}
				</Slider>
			</div>

			{/* End of Banners Section */}
		</div>
	);
};

export default Home;
