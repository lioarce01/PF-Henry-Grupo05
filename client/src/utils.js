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
}