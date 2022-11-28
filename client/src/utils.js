import axios from "axios";

export const getTimeAgo = (date) => {
  const now = new Date();
  const time = new Date(date);
  const diff = now - time;
  const seconds = Math.floor(diff / 1000);
  const diffInMinutes = Math.floor(diff / 1000 / 60);
  const diffInHours = diff / 1000 / 60 / 60;
  const diffInDays = diffInHours / 24;
  const diffInWeeks = diffInDays / 7;

  if (diffInWeeks > 1) {
    return `${Math.floor(diffInWeeks)}w`;
  } else if (diffInDays > 1) {
    return `${Math.floor(diffInDays)}d`;
  } else if (diffInHours > 1) {
    return `${Math.floor(diffInHours)}h`;
  } else if (diffInMinutes > 1) {
    return `${Math.floor(diffInMinutes)}m`;
  } else if (seconds > 1) {
    return `${Math.floor(seconds)}s`;
  } 
  return "Now";
};

export const uploadImage = async (preset, file) => {
  try {
    const data = new FormData();
     data.append("file", file);
    data.append("upload_preset", preset);
     const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dxxqabghy/upload`,
    data
    );
  return { response: response.data, image: response.data.secure_url };
  } catch (error) {
    return{ error: 'Error: an unexpected error has occurred'}
  }
  
};