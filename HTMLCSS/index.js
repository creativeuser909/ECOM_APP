async function returnDiv() {
	const image1 = `./assets/desktop/img1.webp`;
	const image2 = `./assets/desktop/img2.webp`;
	const image3 = `./assets/desktop/img3.jpg`;
	const image4 = `./assets/desktop/img4.jpg`;
	const image5 = `./assets/desktop/img6.jpeg`;
	const images = [image1, image2, image3, image4, image5];
	for (let i = 1; i <= 5; i++) {
		const newDiv = document.createElement("div");
		newDiv.className = `slide`;
		const img = document.createElement("img");
		img.src = images[i - 1];
		img.style.cssText = `width: 100%; height: fit-content; top: 50%;
	transform: translateY(-50%); position: relative`;
		newDiv.appendChild(img);
		document.querySelector(".sliderDiv").appendChild(newDiv);
	}
}

returnDiv()
	.then(() => {
		const secondSlide = document
			.querySelectorAll(`.slide`)[1]
			.getBoundingClientRect();

		const sliderDiv = document
			.querySelector(`.sliderDiv`)
			.getBoundingClientRect();

		const value = parseInt(
			secondSlide.right -
				sliderDiv.right +
				(sliderDiv.width - secondSlide.width) / 2
		);
		x = value;
		return value;
	})
	.then((value) => {
		const slides = document.querySelectorAll(`.slide`);
		slides.forEach((slide) => {
			slide.style.cssText = `translate: -${value}px 0px`;
		});
	});

const slideLeft = async () => {
	const slide = document.querySelectorAll(`.slide`);
	const sliderDiv = document.querySelector(".sliderDiv");
	const newDiv = slide[0];

	const initailWidth = `${slide[0].clientWidth}px`;
	document.body.style.setProperty(`--initailWidth`, initailWidth);

	await new Promise((resolve) => {
		slide[0].classList.add(`shrink-slide`);
		setTimeout(resolve, 500);
	});
	slide[0].remove();
	console.log("Done");
	newDiv.classList.remove(`shrink-slide`);
	sliderDiv.appendChild(newDiv);
};

const slideRight = async () => {
	const slide = document.querySelectorAll(`.slide`);
	const sliderDiv = document.querySelector(".sliderDiv");
	const initialHeight = `${slide[4].getBoundingClientRect().height}px`;
	const initailWidth = `${slide[4].getBoundingClientRect().width}px`;

	document.body.style.setProperty(`--initailWidth`, initailWidth);
	document.body.style.setProperty(`--initialHeight`, initialHeight);
	slide[4].classList.remove(`slide`);
	sliderDiv.insertBefore(slide[4], sliderDiv.firstChild);
	await new Promise((resolve) => {
		sliderDiv.children[0].querySelector(`img`).style.height = initialHeight;
		sliderDiv.children[0].classList.add(`grow-slide`);
		setTimeout(() => {
			resolve();
		}, 500);
	});
	sliderDiv.children[0].classList.remove(`grow-slide`);
	sliderDiv.children[0].classList.add(`slide`);
	console.log(sliderDiv.children[0]);
};
