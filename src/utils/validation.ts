import { components } from '../types/routesApi';

export const validateName = (name: string) => {
  if (name.length === 0) {
    return 'Name must be not empty!';
  }
};

export const validateDistance = (distance: number) => {
  if (distance <= 1) {
    return 'Distance must be greater than 1!';
  }
};

export const validateAddedLocation = (
  location: components['schemas']['Location']
) => {
  console.log(location);
  if (
    location.id !== undefined &&
    (location.name !== undefined ||
      location.x !== undefined ||
      location.y !== undefined ||
      location.z !== undefined)
  ) {
    return "You can't specity other field if id is selected";
  }
  if (
    location.id === undefined &&
    (location.name === undefined ||
      location.x === undefined ||
      location.y === undefined ||
      location.z === undefined)
  ) {
    return 'You must specify all other fields if id is not selected';
  }
};
