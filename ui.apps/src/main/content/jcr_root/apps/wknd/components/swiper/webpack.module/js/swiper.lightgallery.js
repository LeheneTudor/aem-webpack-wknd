import "scss/lightgallery";
import lightGallery from "lightgallery";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

function initGallery(swiper) {
  const galleryEl = swiper[0].el.querySelector(".js-gallery");

  const dynamicGallery = lightGallery(galleryEl, {
    dynamic: true,
    plugins: [lgZoom, lgThumbnail],
    dynamicEl: [...swiper[0].imagesToLoad].map((img, index) => {
      return {
        src: img.getAttribute("src"),
        thumb: img.getAttribute("src"),
        subHtml: `<h4>Image ${index} title</h4><p>Image ${index} descriptions.</p>`,
      };
    }),
  });

  dynamicGallery.openGallery(2);
}

export { initGallery };
