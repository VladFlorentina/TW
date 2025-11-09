import fetch from "node-fetch";

async function getCountryBounds(country) {
  const url = `https://nominatim.openstreetmap.org/search?country=${country}&format=json&limit=1`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "StudentApp/1.0 (contact@example.com)",
    },
  });
  const data = await response.json();

  return {
    minLat: data[0].boundingbox[0],
    maxLat: data[0].boundingbox[1],
    minLon: data[0].boundingbox[2],
    maxLon: data[0].boundingbox[3],
  };
}

async function getAirplanesOverCountry(country) {
  const bounds = await getCountryBounds(country);

  const url = `https://opensky-network.org/api/states/all?lamin=${bounds.minLat}&lomin=${bounds.minLon}&lamax=${bounds.maxLat}&lomax=${bounds.maxLon}`;

  const response = await fetch(url);
  const data = await response.json();

  if (data.states) {
    console.log(`Airplanes over ${country}: ${data.states.length}`);
    data.states.forEach((plane) => {
      console.log(`- ${plane[1]} from ${plane[2]}`);
    });
  } else {
    console.log("No airplanes found");
  }
}

getAirplanesOverCountry("Romania");
