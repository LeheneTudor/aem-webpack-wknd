const PAGE = {
  language: document.querySelector("[lang]").getAttribute("lang").split("-")[0],
  country: document.querySelector("[lang]").getAttribute("lang").split("-")[1],
};

export { PAGE };
