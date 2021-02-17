import { testData } from "./create.js";
import { allCars } from "./create.js";
import { renderCarList } from "../render.js";

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
