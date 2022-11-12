import axios from "axios";

export const getTimeAgo = (date) => {
  const now = new Date();
  const time = new Date(date);
  const diff = now - time;
  const diffInHours = diff / 1000 / 60 / 60;
  if (diffInHours < 24) {
    return `${Math.floor(diffInHours)} hours ago`;
  } else {
    return `${Math.floor(diffInHours / 24)} days ago`;
  }
};

export const uploadImage = async (preset, file) => {
  try {
    const data = new FormData();
     data.append("file", file);
    data.append("upload_preset", preset);
     const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
    data
    );
  return { response: response.data, image: response.data.secure_url };
  } catch (error) {
    return{ error: 'Error: an unexpected error has occurred'}
  }
  
};

