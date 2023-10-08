let page = 1;
let infiniteScroll;
let maxPage;
let clicked = false;

btnSearch.addEventListener("click", () => {
  location.hash = "#search=" + inputSearch.value;
});
btnMore.addEventListener("click", () => {
  location.hash = "#trends=";
});
homeA.addEventListener("click", () => {
  location.hash = "#home";
});
categoriesA.addEventListener("mouseover", (event) => {
  navCategories.classList.remove("inactive");
  event.stopPropagation();
});
navCategories.addEventListener("mouseover", (event) => {
  navCategories.classList.remove("inactive");
});
navCategories.addEventListener("mouseout", () => {
  navCategories.classList.add("inactive");
});
menu.addEventListener("click", () => {
  if (!clicked) {
    navOption.style.display = "block";
    clicked = true;
  } else {
    navOption.style.display = "none";
    clicked = false;
  }
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);
window.addEventListener("scroll", infiniteScroll, false);

function navigator() {
  console.log({ location });
  if (infiniteScroll) {
    window.removeEventListener("scroll", infiniteScroll, { pasive: false });
    infiniteScroll = undefined;
  }

  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage();
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage();
  } else {
    homePage();
  }

  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

  if (infiniteScroll) {
    window.addEventListener("scroll", infiniteScroll, { pasive: false });
  }
}

function homePage() {
  carousel.classList.remove("inactive");
  homeSection.classList.remove("inactive");
  searchSection.classList.add("inactive");
  categoriesSection.classList.add("inactive");
  trendSection.classList.add("inactive");
  descriptionSection.classList.add("inactive");
  favoritesSection.classList.remove("inactive");
  getTrendingMoviesThumbnail();
  getMoviesHome();
  getCategories();
  getLikedMovies();
}
function searchPage() {
  searchSection.classList.remove("inactive");
  carousel.classList.add("inactive");
  homeSection.classList.add("inactive");
  trendSection.classList.add("inactive");
  categoriesSection.classList.add("inactive");
  descriptionSection.classList.add("inactive");
  favoritesSection.classList.add("inactive");
  footerSection.classList.add("inactive");

  let query = location.hash.split("=")[1];
  query = query.replace("%20", " ");
  console.log(query);
  getCategories();
  getMovieBySearch(query);
  infiniteScroll = getPaginatedMoviesBySearch(query);
}
function categoriesPage() {
  categoriesSection.classList.remove("inactive");
  carousel.classList.add("inactive");
  homeSection.classList.add("inactive");
  searchSection.classList.add("inactive");
  trendSection.classList.add("inactive");
  descriptionSection.classList.add("inactive");
  favoritesSection.classList.add("inactive");
  footerSection.classList.add("inactive");

  const [_, categoryData] = location.hash.split("=");
  console.log(categoryData);
  const [categoryId, categoryName] = categoryData.split("-");
  console.log(categoryName);

  categoryTitle.textContent = categoryName;
  getCategories();
  getMoviesByCategory(categoryId);
  infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}
function trendsPage() {
  trendSection.classList.remove("inactive");
  carousel.classList.add("inactive");
  homeSection.classList.add("inactive");
  searchSection.classList.add("inactive");
  categoriesSection.classList.add("inactive");
  descriptionSection.classList.add("inactive");
  favoritesSection.classList.add("inactive");
  footerSection.classList.add("inactive");

  getCategories();
  getTrendingMovies();
  infiniteScroll = getPaginatedTrendingMovies;
}
function movieDetailsPage() {
  descriptionSection.classList.remove("inactive");
  trendSection.classList.add("inactive");
  carousel.classList.add("inactive");
  homeSection.classList.add("inactive");
  searchSection.classList.add("inactive");
  categoriesSection.classList.add("inactive");
  favoritesSection.classList.add("inactive");

  const [_, movieId] = location.hash.split("=");
  getMovieById(movieId);
  getCategories();
}
