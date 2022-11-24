import { carouselShelters } from './index'

export const carouselSheltersAction = (render) => (dispatch) => {
  dispatch(carouselShelters(render));
};