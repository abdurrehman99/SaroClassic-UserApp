import { cloudinary } from "./api/routes";
import axios from "axios";

const { url, uploadPreset } = cloudinary;

export const uploadImagesToCloudnary = async (imagesArray) => {
  return new Promise(async (resolve, reject) => {
    try {
      let uploadedArray = [];
      // console.log("check this img here", imagesArray);
      for (let i = 0; i < imagesArray.length; i++) {
        var formData = new FormData();
        formData.append("file", imagesArray[i]);
        formData.append("folder", "AfricanArt.International");
        formData.append("upload_preset", uploadPreset);
        const uploadImage = await axios.post(url, formData);
        const { secure_url } = uploadImage.data;
        // console.log("check==>", secure_url);
        uploadedArray.push(secure_url);
      }
      resolve(uploadedArray);
    } catch (error) {
      reject(error);
    }
  });
};
