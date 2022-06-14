const mapId = "map";
const initialCoordinates = [40.4169473, -3.7057172]; // Plaza Sol en Madrid [lat, lng]
const map = L.map(mapId).setView(initialCoordinates, 13);



const MAPBOX_API = `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${API}`;

const ATTRIBUTION =
  'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
// Este token será el que obtengamos en la web de Mapbox
const ACCESS_TOKEN = API;

L.tileLayer(MAPBOX_API, {
  attribution: ATTRIBUTION,
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: ACCESS_TOKEN,
}).addTo(map);

function searchCity() {
  let city = document.getElementById("cityName").value.toLowerCase();

  fetch("./coordenatesspain.json")
    .then((res) => res.json())
    .then((res) => {
      let coordenatesCity = res.filter((cities) => cities.ciudad == city);

      if (coordenatesCity != "") {
        let cleanLat = coordenatesCity[0].latitud * 100;
        let cleanLon = coordenatesCity[0].longitud * 100;

        const plazaMayorCoordinates = [cleanLat, cleanLon];
        L.marker(plazaMayorCoordinates).addTo(map);
      } else {
        alert("Introduce una ciudad válida");
      }
    });
}
