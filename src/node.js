//header
const inputSearch = document.getElementById("inputSearch");
const btnSearch = document.getElementById("btnSearch");
const inicioA = document.getElementById("inicioA");
const categorieA = document.getElementById("categorieA");
const navCategorie = document.getElementById("navCategorie");
const menu = document.getElementById("menu");
const navOption = document.getElementById("navOption");

//main
const carousel = document.getElementById("carousel");

const movieCard = document.getElementById("movieCard");

const homeSection = document.getElementById("home");
const btnMore = document.getElementById("btnMore");
const moviesHome = document.getElementById("moviesHome");

const searchSection = document.getElementById("search");
const result = document.getElementById("result");
const searchResult = document.getElementById("searchResult");

const categoriesSection = document.getElementById("categories");
const categoriesResult = document.getElementById("categoriesResult");
const categoryTilte = document.getElementById("categoryTilte");

const trendSection = document.getElementById("trends");
const moviesTrends = document.getElementById("moviesTrends");

const descriptionSection = document.getElementById("desciption");
const desciptionThumbnail = document.getElementById("desciptionThumbnail");
const desciptionTitle = document.getElementById("desciptionTitle");
const punctuationNumber = document.getElementById("punctuationNumber");
const desciptionText = document.getElementById("desciptionText");
const desciptionGenders = document.getElementById("desciptionGenders");

const related = document.getElementById("relatedMovies");
const Relatedcard = document.getElementById("relatedCard");

const favoritesSection = document.getElementById("favorites");
const moviesFavorites = document.getElementById("moviesFavorites");

const footerSection = document.querySelector("footer");

const svgTemplate = `
      <svg id=star xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="30" height="30" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path class="svg-path" d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="white"></path>
      </svg>
    `;
