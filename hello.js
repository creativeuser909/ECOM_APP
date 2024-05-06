const url = "https://res.cloudinary.com/dcvg9vrez/image/upload/v1714991857/airpodes/puwhbioexxizj0mbnvuz.webp";
const parts = url.split("/");
console.log(parts[8].split(".")[0])
console.log(parts[4])
console.log(parts[5])
console.log(parts[7])

const public_id = `${parts[7]}/${parts[8].split(".")[0]}`
console.log(public_id)