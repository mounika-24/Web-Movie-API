const mainPageEl = document.getElementById("mainPage");
const samplePopularContainerEl = document.getElementById("homepagePopular");
const sampleLatestContainerEl = document.getElementById("homepageLatest");
const mainSearchInputEl = document.getElementById("mainSearchInput");
const mainSearchButtonEl = document.getElementById("mainSearchButton");
const homePageContainer = document.getElementById("sectionHomePage");
const searchResultsPage = document.getElementById("searchResults");
const spinnerContentDiv = document.getElementById("spinnerContent");
const spinnerLatestDiv = document.getElementById("spinnerLatest");
const spinner = document.getElementById("spinnerSearch");

let popularContent = [];
let latestContent = [];
/// default query parameters for home page.
// upon search needed parameters to store{id, title,vtype,nfid-netflixId,synopsis,year,imbdid,poster,imdbrating,countryList as clist, releasedate as titledate}

function loadHomePage() {
    window.location.reload();
}

function displaySampleCards(content, containerEl) {
    let {
        title,
        img,
        netflixid,
        poster,
        imdbrating,
        titledate
    } = content;
    //console.log(title);
    if (poster === null && img !== null) {
        poster = img;
    } else if (poster === null && img === null) {
        poster = "https://res.cloudinary.com/mamidala24/image/upload/v1650820094/Poster_not_available_vnozxz.png";
    }

    spinnerLatestDiv.classList.add("d-none");
    spinnerContentDiv.classList.add("d-none");
    let Samplediv = document.createElement("div");
    containerEl.appendChild(Samplediv);
    Samplediv.onclick = function(netflixid) {
        displayContentDetails(netflixid);
    };
    Samplediv.classList.add("sample-div");

    let posterContainer = document.createElement("div");
    Samplediv.appendChild(posterContainer);

    let samplePoster = document.createElement("img");
    samplePoster.src = poster;
    samplePoster.classList.add("sample-poster");
    posterContainer.appendChild(samplePoster);

    let sampledetailsConteainer = document.createElement("div");
    posterContainer.appendChild(sampledetailsConteainer);

    let titleEL = document.createElement("h1");
    sampledetailsConteainer.appendChild(titleEL);
    titleEL.classList.add("sample-title");
    titleEL.textContent = title;

    let ratingEl = document.createElement("p");
    ratingEl.textContent = "IMDB Rating: " + imdbrating;
    sampledetailsConteainer.appendChild(ratingEl);

    let dateEl = document.createElement("p");
    dateEl.textContent = titledate;
    sampledetailsConteainer.appendChild(dateEl);



}

function displaySearchResult(result) {
    let {
        title,
        img,
        netflixid,
        synopsis,
        poster,
        titledate
    } = result;
    //console.log(title);
    if (poster === null && img !== null) {
        poster = img;
    } else if (poster === null && img === null) {
        poster = "https://res.cloudinary.com/mamidala24/image/upload/v1650820094/Poster_not_available_vnozxz.png";
    }

    spinner.classList.add("d-none");
    const resultContainer = document.createElement("div");
    resultContainer.classList.add("result-conatiner");
    searchResultsPage.appendChild(resultContainer);

    const posterContainer = document.createElement("div");
    posterContainer.classList.add("result-poster-container");
    resultContainer.appendChild(posterContainer);

    const posterEl = document.createElement("img");
    posterEl.src = poster;
    posterEl.classList.add("result-poster");
    posterContainer.appendChild(posterEl);

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("result-details");
    resultContainer.appendChild(detailsContainer);

    const resultTitleEL = document.createElement("h1");
    resultTitleEL.textContent = title;
    detailsContainer.appendChild(resultTitleEL);

    const resultYearEL = document.createElement("p");
    resultYearEL.textContent = titledate;
    detailsContainer.appendChild(resultYearEL);

    const resultSynopsisEl = document.createElement("p");
    resultSynopsisEl.textContent = synopsis;
    detailsContainer.appendChild(resultSynopsisEl);
}
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'unogsng.p.rapidapi.com',
        'X-RapidAPI-Key': 'a63eb48effmshe37c2906f27e17dp1e847cjsnfa1d75471916'
    }
};
const popularSearchUrl = `https://unogsng.p.rapidapi.com/search?start_year=1972&orderby=rating&limit=10&subtitle=english&audio=english&country_andorunique=unique&offset=0&end_year=2022`;
const latestSearchUrl = 'https://unogsng.p.rapidapi.com/search?start_year=1972&orderby=dateDesc&limit=10&subtitle=english&audio=english&offset=0&end_year=2022';

const getHomeContent = async (url, containerEl) => {
    spinnerLatestDiv.classList.remove("d-none");
    spinnerContentDiv.classList.remove("d-none");
    console.log(popularSearchUrl);
    try {
        const response = await fetch(url, options);
        const jsonData = await response.json();
        //console.log(jsonData);
        //console.log(jsonData[0])
        let {
            results
        } = jsonData;
        popularContent = results;
        for (let content of popularContent) {
            displaySampleCards(content, containerEl);
        }
        //console.log(results[1]);
    } catch (err) {
        console.error(err.messages);
    }
};

getHomeContent(popularSearchUrl, samplePopularContainerEl);
getHomeContent(latestSearchUrl, sampleLatestContainerEl);

const getSearchResults = async (url) => {
    try {
        const response = await fetch(url, options);
        const jsonData = await response.json();
        let {
            results,
            total
        } = jsonData;
        console.log(total);
        for (let result of results) {
            displaySearchResult(result);
        }
    } catch (err) {
        console.error(err.messages);
    }
};

mainSearchButtonEl.addEventListener("click", function() {
    spinner.classList.remove("d-none");
    let search_q = mainSearchInputEl.value;
    let search_url = `https://unogsng.p.rapidapi.com/search?start_year=1972&orderby=rating&limit=50&subtitle=english&query=${search_q}&audio=english&offset=0&end_year=2022`;
    console.log(search_q);
    console.log(search_url);
    getSearchResults(search_url);
});

const getEpisodes = async (netflixid) => {
    //let netflixid = 0;
    try {
        const response = await fetch(`https://unogsng.p.rapidapi.com/episodes?netflixid=${netflixid}`, options);
        const jsonData = await response.json();
        console.log(jsonData);
    } catch (err) {
        console.error(err);
    }
};
//getEpisodes(70153392);