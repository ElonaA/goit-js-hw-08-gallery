import images from "./gallery-items.js";

const refs = {
  galleryList: document.querySelector("ul.gallery"),
  lightbox: document.querySelector(".lightbox"),
  closeModal: document.querySelector('[data-action="close-lightbox"]'),
  overlay: document.querySelector(".lightbox__overlay"),
  lightBoxImage: document.querySelector(".lightbox__image"),
};

function createGalleryImagesMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return ` 
    <li class = "gallery__item" >
        <a class = "gallery__link" href = "${original}" >
            <img class = "gallery__image"
                src = "${preview}"
                data-source = "${original}"
                alt = "${description}" />
        </a> 
    </li> `;
    })
    .join("");
}

refs.galleryList.insertAdjacentHTML(
  "beforeend",
  createGalleryImagesMarkup(images)
);

function onOpenModal(e) {
  if (e.target.nodeName === "IMG") {
    refs.lightbox.classList.add("is-open");
  }

  window.addEventListener("keydown", onEscKeyPress);
  window.addEventListener("keyup", handleScrolling);
}

function addImagesModal(e) {
  const getOriginalImageSrc = e.target.getAttribute("data-source");
  const getOriginalImageAlt = e.target.getAttribute("alt");

  refs.lightBoxImage.setAttribute("src", getOriginalImageSrc);
  refs.lightBoxImage.setAttribute("alt", getOriginalImageAlt);
}
function removeClassListOnEvent() {
  refs.lightbox.classList.remove("is-open");
  clearLightBoxImage();
}
function onCloseModal(e) {
  if (e.target.nodeName === "I" || e.target.nodeName === "BUTTON") {
    removeClassListOnEvent();
  }

  window.removeEventListener("keydown", onEscKeyPress);
  window.removeEventListener("keyup", handleScrolling);
}
function clearLightBoxImage() {
  refs.lightBoxImage.removeAttribute("src");
  refs.lightBoxImage.removeAttribute("alt");
}

function onOverlayClick(e) {
  if (e.target === refs.overlay) {
    removeClassListOnEvent();
  }
}

function onEscKeyPress(e) {
  const escKeyCode = "Escape";
  const isEscKey = e.code === escKeyCode;

  if (isEscKey) {
    removeClassListOnEvent();
  }
}

refs.galleryList.addEventListener("click", (e) => {
  e.preventDefault();
  onOpenModal(e);
  addImagesModal(e);
});

refs.closeModal.addEventListener("click", onCloseModal);
refs.overlay.addEventListener("click", onOverlayClick);

let imagesOriginalArr = [];
images.forEach((item) => {
  imagesOriginalArr.push(item.original);
});

function handleScrolling(e) {
  let index = imagesOriginalArr.indexOf(refs.lightBoxImage.src);

  if (e.keyCode === 39) {
    if (index < imagesOriginalArr.length - 1) {
      refs.lightBoxImage.setAttribute("src", imagesOriginalArr[index + 1]);
    } else {
      index = -1;
      refs.lightBoxImage.setAttribute("src", imagesOriginalArr[index + 1]);
    }
  }

  if (e.keyCode === 37) {
    if (index === 0) {
      index = imagesOriginalArr.length;
      refs.lightBoxImage.setAttribute("src", imagesOriginalArr[index - 1]);
    } else refs.lightBoxImage.setAttribute("src", imagesOriginalArr[index - 1]);
  }
}
