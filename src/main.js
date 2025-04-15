const API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "content-type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});
let slideIndex = 1;

function likedMoviesList() {
  const item = JSON.parse(localStorage.getItem("liked_movies"));
  let movies;

  if (item) {
    movies = item;
  } else {
    movies = {};
  }
  return movies;
}

function likeMovie(movie) {
  const likedMovies = likedMoviesList();

  if (likedMovies[movie.id]) {
    likedMovies[movie.id] = undefined;
  } else {
    likedMovies[movie.id] = movie;
  }
  localStorage.setItem("liked_movies", JSON.stringify(likedMovies));
}

const lazyLoadImages = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const url = entry.target.getAttribute("data-img");
      entry.target.setAttribute("src", url);
    }
  });
});

function createElementMovies(
  container,
  movies,
  {lazyLoad = false, clean = true} = {}
) {
  if (clean) {
    container.innerHTML = "";
  }

  movies.forEach((movie) => {
    const article = document.createElement("article");
    article.classList.add("movie-card");

    const span = document.createElement("span");
    span.innerHTML = svgTemplate;

    const star = span.querySelector("svg .svg-path");
    likedMoviesList()[movie.id] && star.classList.add("like");
    star.addEventListener("click", () => {
      star.classList.toggle("like");
      likeMovie(movie);
      getLikedMovies();
    });

    const movieImg = document.createElement("img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      lazyLoad ? "data-img" : "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );
    movieImg.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });
    movieImg.addEventListener("error", () => {
      movieImg.setAttribute("src", "./assets/icon/filled.svg");
    });
    if (lazyLoad) {
      lazyLoadImages.observe(movieImg);
    }

    article.appendChild(span);
    article.appendChild(movieImg);
    container.appendChild(article);
  });
}
function createElementCategories(container, categories) {
  container.innerHTML = "";
  categories.forEach((category) => {
    const categoryContainer = document.createElement("li");
    const categoryTitle = document.createElement("a");
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`;
    });
    categoryTitle.classList.add("title-category");
    const categoryTitleText = document.createTextNode(category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    container.appendChild(categoryContainer);
  });
}

async function getTrendingMoviesThumbnail() {
  const {data} = await API("trending/movie/day");
  const movies = data.results;
  carousel.innerHTML = "";

  movies.slice(0, 3).forEach((movie) => {
    const container = document.createElement("div");
    container.classList.add("slide");
    const img = document.createElement("img");
    img.setAttribute("alt", movie.title);
    img.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/original" + movie.backdrop_path
    );
    img.addEventListener("error", () => {
      img.setAttribute("src", "./assets/icon/filled.svg");
    });
    const information = document.createElement("div");
    information.classList.add("slide-information");

    const title = document.createElement("h2");
    title.textContent = movie.title;

    const description = document.createElement("p");
    description.textContent = movie.overview;

    information.appendChild(title);
    information.appendChild(description);
    container.appendChild(img);
    container.appendChild(information);
    carousel.appendChild(container);
  });

  showSlides(slideIndex);
  setInterval(() => showSlides((slideIndex += 1)), 10000);
}

function showSlides(slideIndex) {
  let i;
  let slides = document.getElementsByClassName("slide");
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  if (slideIndex < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

async function getMoviesHome() {
  const {data} = await API("trending/movie/day");
  const movies = data.results;

  createElementMovies(moviesHome, movies, {
    lazyLoad: true,
    clean: true,
  });
}

async function getCategories() {
  const {data} = await API("genre/movie/list");
  const categories = data.genres;

  createElementCategories(navCategories, categories);
}

async function getMovieBySearch(query) {
  const {data} = await API("search/movie", {
    params: {
      query,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;
  result.innerHTML = query;
  createElementMovies(searchResult, movies, true);
  console.log(movies);
}
async function getMoviesByCategory(id) {
  const {data} = await API("discover/movie", {
    params: {
      with_genres: id,
    },
  });
  const movies = data.results;
  maxPage = data.total_pages;

  createElementMovies(categoriesResult, movies);
}
async function getTrendingMovies() {
  const {data} = await API("trending/movie/day");
  const movies = data.results;
  maxPage = data.total_pages;

  createElementMovies(moviesTrends, movies, true);
}
async function getMovieById(id) {
  const {data: movie} = await API("movie/" + id);
  descriptionThumbnail.innerHTML = "";
  const poster = document.createElement("img");
  poster.setAttribute("alt", movie.title);
  poster.setAttribute(
    "src",
    "https://image.tmdb.org/t/p/original" + movie.backdrop_path
  );
  descriptionThumbnail.appendChild(poster);
  descriptionTitle.textContent = movie.title;
  descriptionText.textContent = movie.overview;
  punctuationNumber.textContent = movie.vote_average.toFixed(1);
  const genres = movie.genres;
  descriptionGenders.innerHTML = "";
  genres.forEach((genre) => {
    const container = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = genre.name;
    title.setAttribute("id", "id" + genre.id);
    title.addEventListener("click", () => {
      location.hash = `#category=${genre.id}-${genre.name}`;
    });
    container.appendChild(title);
    descriptionGenders.appendChild(container);
  });

  getRelatedMovies(id);
}
async function getRelatedMovies(id) {
  const {data} = await API(`/movie/${id}/similar`);

  const relatedMovies = data.results;
  related.innerHTML = "";
  relatedMovies.forEach((movie) => {
    const article = document.createElement("article");
    article.classList.add("related-card");

    const span = document.createElement("span");
    span.innerHTML = svgTemplate;

    const star = span.querySelector("svg .svg-path");
    likedMoviesList()[movie.id] && star.classList.add("like");
    star.addEventListener("click", () => {
      star.classList.toggle("like");
      likeMovie(movie);
      getLikedMovies();
    });
    const img = document.createElement("img");
    img.setAttribute("alt", movie.title);
    img.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path
    );
    img.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });
    img.addEventListener("error", () => {
      img.setAttribute("src", "./assets/icon/filled.svg");
    });

    article.appendChild(span);
    article.appendChild(img);
    related.appendChild(article);
  });
}
//favorites
function getLikedMovies() {
  const likedMovies = likedMoviesList();
  const moviesArray = Object.values(likedMovies);

  createElementMovies(moviesFavorites, moviesArray, {
    lazyLoad: true,
    clean: true,
  });
}

//pagination

function getPaginatedMoviesByCategory(id) {
  return async function () {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const {data} = await API("discover/movie", {
        params: {
          with_genres: id,
          page,
        },
      });
      const movies = data.results;

      createElementMovies(categoriesResult, movies, {
        lazyLoad: true,
        clean: false,
      });
    }
  };
}

async function getPaginatedTrendingMovies() {
  const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
  const pageIsNotMax = page < maxPage;

  const scrollIfFinal = scrollTop + clientHeight >= scrollHeight - 15;

  if (scrollIfFinal && pageIsNotMax) {
    page++;
    const {data} = await API("trending/movie/day", {
      params: {
        page,
      },
    });
    const movies = data.results;
    createElementMovies(moviesTrends, movies, {
      lazyLoad: true,
      clean: false,
    });
  }
}

function getPaginatedMoviesBySearch(query) {
  return async function () {
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;

    const scrollIsBottom = scrollTop + clientHeight >= scrollHeight - 15;
    const pageIsNotMax = page < maxPage;

    if (scrollIsBottom && pageIsNotMax) {
      page++;
      const {data} = await API("search/movie", {
        params: {
          query,
          page,
        },
      });
      const movies = data.results;

      createElementMovies(searchResult, movies, {
        lazyLoad: true,
        clean: false,
      });
    }
  };
}
