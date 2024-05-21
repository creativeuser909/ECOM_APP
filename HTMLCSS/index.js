function returnDiv() {
	for (let i = 1; i <= 10; i++) {
		const newDiv = document.createElement("div");
		newDiv.className = `slides slide-${i}`;
		newDiv.style.cssText = `order: ${i};`;
		newDiv.innerHTML = `Slide ${i}`;
		document.querySelector(".slidesContainer").appendChild(newDiv);
	}
}

returnDiv();

let index = 1;
function slideLeft() {
	const nextDiv = document
		.querySelector(`.slides.slide-${index + 1}`)
		.getBoundingClientRect();
	const slidesContainer = document.querySelector(`.slidesContainer`);
	console.log(nextDiv);
	const sliderDiv = document
		.querySelector(`.sliderDiv`)
		.getBoundingClientRect();
	console.log(nextDiv.right, sliderDiv.right);
	const slide = nextDiv.right - sliderDiv.right;
	console.log(slide);
	const slideAmount = nextDiv.left - sliderDiv.left;
	const currentLeft = parseInt(slidesContainer.style.left || "0", 10);
	slidesContainer.style.left = `${currentLeft - slideAmount}px`;
	// document.querySelector(`.slidesContainer`).style.left += `-${slide}px`;
	index++;
}
