// fetch 1 --- Astronomy Picture of the Day  ---

const nasaContainer = document.getElementById("nasa-content");

fetch(
  "https://api.nasa.gov/planetary/apod?api_key=6frLuiwshUlB9itTmR6XFs2wBcAY29vgwzMRG9vO",
)
  .then((response) => response.json())
  .then((data) => {
    console.log("Data recieved:", data);

    if (data.media_type === "image") {
      const apodImage = document.createElement("img");
      const apodTitle = document.createElement("h2");

      apodImage.src = data.url;
      apodTitle.textContent = data.title;
      nasaContainer.appendChild(apodTitle);
      nasaContainer.appendChild(apodImage);
    }

    ///video media type handling
    else if (data.media_type === "video") {
      const vdescription = document.createElement("p");
      const videoLink = document.createElement("a");
      const videoTitle = document.createElement("h2");

      const videoPlayer = document.createElement("video");
      videoPlayer.src = data.url;
      videoPlayer.controls = true;
      videoPlayer.classList.add("video-player");

      vdescription.textContent = data.explanation;
      videoTitle.textContent = data.title;
      videoLink.href = data.url;
      videoLink.textContent = "Watch Nasa's APOD Video of the Day";
      videoLink.target = "_blank"; // opens in new tab

      nasaContainer.appendChild(videoTitle);
      nasaContainer.appendChild(vdescription);
      nasaContainer.appendChild(videoPlayer);
      nasaContainer.appendChild(videoLink);
    }
  })
  .catch((error) => {
    console.error("Error fetching NASA APOD data:", error);
  });

//fetch 2 --- weather  ---
const countriesContainer = document.getElementById("country-content");
const button = document.getElementById("searchBtn");
const input = document.getElementById("countryInput");

button.addEventListener("click", () => {
  const name = input.value;

  fetch(`https://restcountries.com/v3.1/name/${name}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Process the country data as needed
      const countryInfo = data[0]; // Assuming you want the first country in the response
      const countryDescription = document.getElementById("country-description");

      countryDescription.innerHTML = `
  <h2>${countryInfo.name.common}</h2>
  <p>Capital: ${countryInfo.capital}</p>
  <p>Population: ${countryInfo.population}</p>
  <img src="${countryInfo.flags.png}" width="200">
  <p>Region: ${countryInfo.region}</p>
  <p>Subregion: ${countryInfo.subregion}</p>
  <p>Languages: ${Object.values(countryInfo.languages).join(", ")}</p>
  <p>Currencies: ${Object.values(countryInfo.currencies)
    .map((currency) => currency.name)
    .join(", ")}</p>
  <p>Timezones: ${countryInfo.timezones.join(", ")}</p>
  <p>Area: ${countryInfo.area} km²</p>
  <p>Calling Codes: ${countryInfo.idd.root}${countryInfo.idd.suffixes[0]}</p>
  <p>Top Level Domain: ${countryInfo.tld.join(", ")}</p>
    <p>Bordering Countries: ${countryInfo.borders ? countryInfo.borders.join(", ") : "None"}</p>
    <p>Independent: ${countryInfo.independent ? "Yes" : "No"}</p>
    <p>UN Member: ${countryInfo.unMember ? "Yes" : "No"}</p>
    <p>Start of Week: ${countryInfo.startOfWeek}</p>
    <p>Maps: <a href="${countryInfo.maps.googleMaps}" target="_blank">Google Maps</a> | <a href="${countryInfo.maps.openStreetMaps}" target="_blank">OpenStreetMap</a></p>

`;
    })
    .catch((error) => {
      console.error("Error fetching country data:", error);
    });
});
