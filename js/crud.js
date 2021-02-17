import { postsMountNode } from "./appController.js";
import { testData } from "./appController.js";

export let allCars = [];

// Fetch
export async function fetchData(dataToFetch) {
  try {
    const res = await fetch(dataToFetch);
    const data = await res.json();

    allCars = data;
    console.log("1. original posts from server", allCars);
    renderCarList(allCars);
  } catch (err) {
    console.log("error:", err.message);
  }
}

// Render
export function renderCarList() {
  if (allCars.length) {
    const list = document.createElement("ul");
    list.classList.add("car-list");

    for (const { name, bhp, avatar_url, _id } of allCars) {
      const li = document.createElement("li");
      li.classList.add("car-item");
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
    postsMountNode.innerHTML = "";
    postsMountNode.append(list);
  } else {
    postsMountNode.innerHTML = ` <p class="no-data-entered">No cars added – what are you waiting for! Add some cool cars</p>`;
  }
}

// Create
export async function postData(data) {
  try {
    const response = await fetch(testData, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    if (!response.ok) {
      throw response;
    }
    const newCarData = await response.json();

    allCars.push(newCarData);
    renderCarList(allCars);
  } catch (err) {
    console.log("err", err.message);
  }
}

// Update
export async function updateData(carId, changes) {
  let itemToUpdate = `${testData}${carId}`;

  try {
    const res = await fetch(itemToUpdate, {
      method: "PUT",
      body: JSON.stringify(changes),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    fetchData(testData);
  } catch (err) {
    console.log("error:", err.message);
  }
}

// Delete
export async function deleteData(idToDelete) {
  const itemToDelete = `${testData}${idToDelete}`;

  try {
    const res = await fetch(itemToDelete, {
      method: "DELETE",
    });
    fetchData(testData);
  } catch (err) {
    console.log("error", err, message);
  }
}
