import { postsMountNode } from "./appController.js";
import { allCars } from "./crud.js";

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
