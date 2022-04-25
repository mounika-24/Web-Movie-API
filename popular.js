const resultsContainerEl = document.getElementById("resultsContainer");
const searchButtonEl = document.getElementById("searchButton");
const startYearEl = document.getElementById("startYear");
const endYearEl = document.getElementById("endYear");
const spinnerContentDiv = document.getElementById("spinnerContent");

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'unogsng.p.rapidapi.com',
        'X-RapidAPI-Key': 'a63eb48effmshe37c2906f27e17dp1e847cjsnfa1d75471916'
    }
};

function displayResultCards(content, containerEl) {
    let {
        title,
        img,
        netflixid,
        poster,
        imdbrating,
        titledate
    } = content;
    console.log(title);
    if (poster === null && img !== null) {
        poster = img;
    } else if (poster === null && img === null) {
        poster = "https://res.cloudinary.com/mamidala24/image/upload/v1650820094/Poster_not_available_vnozxz.png";
    }

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

const popularSearchUrl = `https://unogsng.p.rapidapi.com/search?start_year=1972&orderby=rating&limit=10&subtitle=english&audio=english&country_andorunique=unique&offset=0&end_year=2022`;

const getHomeContent = async (url, containerEl) => {
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
        const popularContent = results;
        for (let content of popularContent) {
            displayResultCards(content, containerEl);
        }
        //console.log(results[1]);
    } catch (err) {
        console.error(err.messages);
    }
};

getHomeContent(popularSearchUrl, resultsContainerEl);

searchButtonEl.addEventListener("click", function() {
    const start_year = startYearEl.value;
    const end_year = endYearEl.value;
    console.log(start_year);
    console.log(end_year);
    let searchUrl = `https://unogsng.p.rapidapi.com/search?start_year=${start_year}&orderby=rating&limit=100&subtitle=english&audio=english&country_andorunique=unique&offset=0&end_year=${end_year}`;
    resultsContainerEl.textContent = "";
    getHomeContent(searchUrl, resultsContainerEl);
});