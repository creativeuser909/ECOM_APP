// import {v2 as cloudinary} from 'cloudinary';

// const URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image`;


const UploadAndStoreProduct = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  // formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
  formData.append("folder", "product-images");
  formData.append("timestamp", (Date.now() / 1000) | 0);
  return {
    formData
  }
  // const response = await fetch(URL, {
  //   method: "POST",
  //   body: formData
  // });
  // const { public_id, secure_url } = await response.json();
  // return { public_id, secure_url };

};


export default UploadAndStoreProduct