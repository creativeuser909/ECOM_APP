function returnDiv() {
  for (let i = 1; i <= 10; i++) {
    const newDiv = document.createElement("div");
    newDiv.className = `slides slide-${i}`;
    newDiv.innerHTML = `Slide ${i}`;
    document.querySelector(".slidesContainer").appendChild(newDiv);
  }
}

returnDiv();

let index = 1;
let initial = 0;
let start = false;
function slideLeft() {
  if (index < 10) {
    const nextDiv = document
      .querySelector(`.slides.slide-${index + 1}`)
      .getBoundingClientRect();

    const slidesContainerLeft = parseInt(
      document.querySelector(`.slidesContainer`).getBoundingClientRect().left
    );

    const sliderDiv = document
      .querySelector(`.sliderDiv`)
      .getBoundingClientRect();

    const slide = parseInt(
      nextDiv.right -
        sliderDiv.right +
        3 +
        (sliderDiv.width - nextDiv.width) / 2
    );

    const slidesContainer = document.querySelector(".slidesContainer");
    console.log(slidesContainer.children[0].classList[1]);
    if (!start) {
      slidesContainer.style.cssText = `left: -${initial}px;`;
      start = true;
    }

    setTimeout(() => {
      initial += slide;
      slidesContainer.style.cssText = `transition: all 0.5s ease; left: -${initial}px;
    `;
    }, 0);
    index++;

  }
  if(index>= 10){
    const slidesContainerRight = parseInt(
      document.querySelector(`.slidesContainer`).getBoundingClientRect().right
    );
    const sliderDivRight = document
      .querySelector(`.sliderDiv`)
      .getBoundingClientRect().right;
    if(slidesContainerRight < sliderDivRight){
      const newSlidesContainer = document.createElement("div");
      for (let i = 1; i <= 10; i++) {
        const newDiv = document.createElement("div");
        newDiv.className = `slides slide-${i}`;
        newDiv.innerHTML = `Slide ${i}`;
        document.querySelector(".slidesContainer").appendChild(newDiv);
      }
    }
  }
}
