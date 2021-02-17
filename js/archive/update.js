import { testData } from "../create.js";
import { fetchData } from "../create.js";

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

/*
export function updateData(carId, changes) {
  let itemToUpdate = `${testData}${carId}`;
  fetch(itemToUpdate, {
    method: 'PUT',
    body: JSON.stringify(changes),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then(() => {
      fetchData(testData);
    })
    .catch((err) => {
      console.log('error: ', err.message);
    });
}
*/
