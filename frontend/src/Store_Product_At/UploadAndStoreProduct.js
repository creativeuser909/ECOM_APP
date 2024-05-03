import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dcvg9vrez', 
  api_key: '537394157842915', 
  api_secret: 'F4bNhWH9sjk5sh4gviWPi-GGv3Y' 
});

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });


  