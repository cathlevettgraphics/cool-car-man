import { renderCarList } from "./render.js";

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

/*
export function fetchData(dataToFetch) {
  fetch(dataToFetch)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      return response.json();
    })
    .then((data) => {
      allCars = data;
      console.log('1. original posts from server', allCars);
      renderCarList(allCars);
    })
    .catch((err) => {
      console.log('error: ', err.message);
    });
}
*/
