const Base64ToImage = async (base64String) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = (error) => reject(error);
        image.src = base64String;
    });
};

export default Base64ToImage;