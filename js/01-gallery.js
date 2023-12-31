import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);
const container = document.querySelector(".gallery");
// {
//     preview:
//       'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
//     original:
//       'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
//     description: 'Hokkaido Flower',
//   },

function createMarkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
  <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
}

container.insertAdjacentHTML("beforeend", createMarkup(galleryItems));
container.addEventListener("click", openModal);

function openModal(evt) {
  evt.preventDefault();
  if (evt.target === evt.currentTarget) {
    return;
  }
  const instance = basicLightbox.create(`
  	<img src="${evt.target.dataset.source}" alt="${evt.target.alt}" />
  `);
  instance.show();
  const visible = instance.visible();

  if (visible === true) {
    document.addEventListener("keydown", closeModal);
  } else {
    document.removeEventListener("keydown", closeModal);
  }

  function closeModal(evt) {
    if (evt.key === "Escape") {
      instance.close();
    }
  }
}
