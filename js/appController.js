import { renderCarList } from './render.js';
import { allCars, fetchData, updateCar, deleteCar, addCar } from './crud.js';

import { populate } from './utility.js';

/********************
 *
 * RENDER DATA TO DOM
 *
 ********************/

export const postsMountNode = document.getElementById('posts-target');

export const CARS_ENDPOINT = 'https://carsapp2050.herokuapp.com/api/v1/cars/';

document.addEventListener('DOMContentLoaded', (e) => {
  fetchData(CARS_ENDPOINT);
  renderCarList();
});
/********************
 *
 * CREATE DATA + RENDER
 *
 ********************/

const carForm = document.forms['car-entry-form'];

carForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // CREATE
  const formData = new FormData(carForm);
  const data = Object.fromEntries(formData);

  GrowlNotification.notify({
    title: 'Cool car, man!',
    description: "We've added it to our database",
    type: 'success',
    position: 'top-right',
    closeTimeout: 2500,
  });

  addCar(data);
  carForm.reset();
});

/********************
 *
 * UPDATE + DELETE
 *
 ********************/

const carFormUpdate = document.forms['car-entry-form-update'];
let originalCar;

postsMountNode.addEventListener('click', (e) => {
  const target = e.target;
  // DELETE
  if (target && target.matches('.btn.btn-delete')) {
    const deleteID = target.closest('button').dataset.id;
    const index = allCars.findIndex((item) => item._id === deleteID);
    allCars.splice(index, 1);

    target.closest('li').remove();

    GrowlNotification.notify({
      title: 'Yeah, that car sucked!',
      description: "We've deleted it",
      type: 'error',
      position: 'top-right',
      closeTimeout: 2500,
    });

    deleteCar(deleteID);
  }

  // UPDATE
  if (target && target.matches('.btn.btn-update')) {
    // get car by data-id
    const carId = target.closest('button').dataset.id;
    const carToUpdate = allCars.find((car) => car._id === carId);
    // console.log('The car to update is: ', carToUpdate);
    // Populate update form
    populate(carFormUpdate, carToUpdate);
    // Make carToUpdate accessable
    originalCar = carToUpdate;

    // Show update form > hide create form
    carFormUpdate.classList.add('car-entry-form-update-show');
    carForm.classList.add('car-entry-form-hide');
  }
});

carFormUpdate.addEventListener('submit', (e) => {
  e.preventDefault();
  // Serialise
  const formData = new FormData(carFormUpdate);
  const newData = Object.fromEntries(formData);
  carFormUpdate.reset();

  GrowlNotification.notify({
    title: 'Car looking good!',
    description: 'Updates applied and stored',
    type: 'warning',
    position: 'top-right',
    closeTimeout: 2500,
  });

  updateCar(originalCar._id, newData);
  renderCarList();

  carFormUpdate.classList.remove('car-entry-form-update-show');
  carForm.classList.remove('car-entry-form-hide');
});
