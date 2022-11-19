import { sortPosts } from "./index";

export const sortPostsAction = (order, type) => (dispatch) => {
  console.log(order, type)
  dispatch(sortPosts({ order, type }));
};