import { testData } from "../create.js";
import { fetchData } from "../create.js";

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

/*
export function deleteData(idToDelete) {
  const itemToDelete = `${testData}${idToDelete}`;
  fetch(itemToDelete, {
    method: 'DELETE',
  })
    .then(() => {
      fetchData(testData);
    })
    .catch((err) => {
      console.log('error: ', err.message);
    });
}
*/
