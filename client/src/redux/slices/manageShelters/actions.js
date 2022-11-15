import { sortShelters, searchShelters } from "./index";

export const sortSheltersAction = (order, orderType, group, groupType) => (dispatch) => {
  dispatch(sortShelters({ order, orderType, group, groupType }));
};

export const searchSheltersAction = (search) => (dispatch) => {
  dispatch(searchShelters(search));
};
