let width;
function returnDiv() {
	return new Promise((resolve) => {
		for (let i = 1; i <= 3; i++) {
			const newDiv = document.createElement("div");
			newDiv.className = `slide`;
			newDiv.innerHTML = `slide${i}`;
			document.querySelector(".slidesContainer").appendChild(newDiv);
		}
		resolve();
	});
}
document.addEventListener("DOMContentLoaded", () => {
	width = parseInt(document.querySelector(".sliderDiv").clientWidth * 0.8);
	console.log(width);
	returnDiv().then(() => {
		const slideWidth = document.querySelectorAll(
			`.slidesContainer .slide`
		)[0].clientWidth;
		const sliderDivWidth = document.querySelector(".sliderDiv").clientWidth;
		const translateValue = slideWidth - (sliderDivWidth - width) / 2 - 20;
		document.querySelector(
			".slidesContainer"
		).style.cssText = `translate: -${translateValue}px; 0px`;
	});
});

const slideLeft = async () => {
	const handleClick = disableMouseClick();
	const newDiv = document
		.querySelector(`.slidesContainer .slide`)
		.cloneNode(true);

	document.querySelector(`.slidesContainer`).appendChild(newDiv);

	document
		.querySelector(`.slidesContainer .slide`)
		.classList.add("shrink-slide");
	await new Promise((resolve) => {
		document
			.querySelector(`.slidesContainer .slide`)
			.addEventListener("animationend", resolve, { once: true });
	}).then(() => {
		document.querySelector(`.slidesContainer`).firstChild.remove();
	});
	enableMouseClick(handleClick);
};

const slideRight = async () => {
	
	const handleClick = disableMouseClick();
	
	const slides = document.querySelectorAll(`.slidesContainer .slide`);
	const newDiv = document
		.querySelectorAll(`.slidesContainer .slide`)
		[slides.length - 1].cloneNode(true);
	newDiv.classList.add("grow-slide");
	document
		.querySelector(`.slidesContainer`)
		.insertBefore(
			newDiv,
			document.querySelector(`.slidesContainer`).firstChild
	);
	await new Promise((resolve) => {
		newDiv.addEventListener("animationend", resolve, { once: true });
	}).then(() => {
		document
			.querySelector(`.slidesContainer`)
			.firstChild.classList.remove("grow-slide");
		document.querySelector(`.slidesContainer`).lastChild.remove();
	});
	enableMouseClick(handleClick);
};


const disableMouseClick = () => {
	const handleClick = (event) => {
		event.stopPropagation();
		event.preventDefault();
	};
	document.addEventListener("click", handleClick, true);
	return handleClick;
};
const enableMouseClick = (handleClick) => {
	document.removeEventListener("click", handleClick, true);
};