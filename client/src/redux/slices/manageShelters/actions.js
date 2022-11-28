import { carouselShelters, setAnimals } from './index'

export const carouselSheltersAction = (render) => (dispatch) => {
  dispatch(carouselShelters(render));
};
export const setAnimalsAction = (animals) => (dispatch) => {
  dispatch(setAnimals(animals));
};