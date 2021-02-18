import { postsMountNode, CARS_ENDPOINT } from './appController.js';

export let allCars = [];

// Fetch
export async function fetchData(API_ENDPOINT) {
  try {
    const res = await fetch(API_ENDPOINT);
    const data = await res.json();

    allCars = data;
    // console.log('1. original posts from server', allCars);
    renderCarList(allCars);
  } catch (err) {
    console.log('error:', err.message);
  }
}

// Render
export function renderCarList() {
  if (allCars.length) {
    const list = document.createElement('ul');
    list.classList.add('car-list');

    for (const { name, bhp, avatar_url, _id } of allCars) {
      const li = document.createElement('li');
      li.classList.add('car-item');
      li.innerHTML = `
      <div class="car-wrapper">
      <h3>${name}</h3>
      <p>${bhp} bhp</p>
      <img src="${avatar_url}">
      <div class="buttons">
      <div ><a href="#update-form"><button class="btn btn-update" data-id="${_id}">Update</button></a></div>
      <div><button class="btn btn-delete" data-id="${_id}">Delete</button></div>
      </div>
      </div>
      `;
      list.append(li);
    }
    postsMountNode.innerHTML = '';
    postsMountNode.append(list);
  } else {
    postsMountNode.innerHTML = ` <p class="no-data-entered">No cars added – what are you waiting for! Add some cool cars</p>`;
  }
}

// Create
export async function addCar(data) {
  try {
    const response = await fetch(CARS_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (!response.ok) {
      throw response;
    }
    const newCarData = await response.json();

    allCars.push(newCarData);
    renderCarList(allCars);
  } catch (err) {
    console.log('err', err.message);
  }
}

// Update
export async function updateCar(carId, changes) {
  let itemToUpdate = `${CARS_ENDPOINT}${carId}`;

  try {
    const res = await fetch(itemToUpdate, {
      method: 'PUT',
      body: JSON.stringify(changes),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    fetchData(CARS_ENDPOINT);
  } catch (err) {
    console.log('error:', err.message);
  }
}

// Delete
export async function deleteCar(idToDelete) {
  const itemToDelete = `${CARS_ENDPOINT}${idToDelete}`;

  try {
    const res = await fetch(itemToDelete, {
      method: 'DELETE',
    });
    fetchData(CARS_ENDPOINT);
  } catch (err) {
    console.log('error', err, message);
  }
}
