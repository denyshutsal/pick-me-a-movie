"use strict";

const submitBtn = document.querySelector("#submit-btn");
const requestInput = document.querySelector("#request-input");
const ul = document.querySelector("#results");
const mainTitle = document.querySelector(".main-title");

// Displaying search results
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();

  fetchData();
});

function fetchData() {
  let title = requestInput.value;

  if (!title) {
    mainTitle.innerHTML = "There are no movies that matched your query.";
    ul.innerHTML = "";
    return;
  }

  const url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=1`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjg4NjY3NzgzZmEwZmRhOWMwNGQ0NDhjNzNlZWRmNCIsInN1YiI6IjY0ZGNiZGU3MDAxYmJkMDQxOTJkNjg3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RiKCIZZhjGYUzJhJsmeyM97iFaOd3VVRvtRHTeqROeA",
    },
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      let results = data.results;
      ul.innerHTML = "";
      mainTitle.innerHTML = title;

      results.map(function (item) {
        const d = new Date(`${item.release_date}`);
        const year = d.getFullYear();
        const day = d.getDay();
        const month = d.toLocaleString("default", { month: "long" });

        const isPoster = item.poster_path;
        const isDate = item.release_date
          ? `${month} ${day}, ${year}`
          : `No date`;

        ul.innerHTML += `
        <li class="results-li">
          <div class="results-img-wrapper ${!isPoster ? "noposter" : ""}">
            <img class="results-img" src="https://image.tmdb.org/t/p/w500${
              item.poster_path
            }" alt="${item.title}" width='150' height='225'>
          </div>
          <div>
            <h3 class="results-title">${item.title}</h3>
            <span class="results-date">${isDate}</span>
          </div>
        </li>`;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
// end Displaying search results
// --------------------------------------------------------------------------------------

// Default Output - Trends
const url = `https://api.themoviedb.org/3/trending/movie/week?language=en-US`;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMjg4NjY3NzgzZmEwZmRhOWMwNGQ0NDhjNzNlZWRmNCIsInN1YiI6IjY0ZGNiZGU3MDAxYmJkMDQxOTJkNjg3ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.RiKCIZZhjGYUzJhJsmeyM97iFaOd3VVRvtRHTeqROeA",
  },
};

fetch(url, options)
  .then((response) => response.json())
  .then((data) => {
    let results = data.results;

    results.map(function (item) {
      const d = new Date(`${item.release_date}`);
      const year = d.getFullYear();
      const day = d.getDay();
      const month = d.toLocaleString("default", { month: "long" });

      const isPoster = item.poster_path;
      const isDate = item.release_date ? `${month} ${day}, ${year}` : `No date`;

      ul.innerHTML += `
      <li class="results-li">
      <div class="results-img-wrapper ${!isPoster ? "noposter" : ""}">
          <img class="results-img" src="https://image.tmdb.org/t/p/w500${
            item.poster_path
          }" alt="${item.title}" width='150' height='225'>
        </div>
        <div>
          <h3 class="results-title">${item.title}</h3>
          <span class="results-date">${isDate}</span>
        </div>
      </li>`;
    });
  })
  .catch(function (error) {
    console.log(error);
  });
