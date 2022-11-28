import { sortPosts } from "./index";

export const sortPostsAction = (order, type) => (dispatch) => {
  dispatch(sortPosts({ order, type }));
};