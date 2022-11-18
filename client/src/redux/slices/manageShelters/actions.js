import { sortShelters, searchShelters } from "./index";

export const sortSheltersAction = (order, orderType, filter) => (dispatch) => {
  dispatch(sortShelters({ order, orderType, filter }));
};

export const searchSheltersAction = (search) => (dispatch) => {
  dispatch(searchShelters(search));
};
