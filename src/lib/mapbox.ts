const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

async function fetchData(value: string, lat, lng): Promise<any> {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${value}.json?access_token=${MAPBOX_TOKEN}&proximity=${lng},${lat} `
    );
    const json = await response.json();
    return json.features[0];
  } catch (error) {
    window.alert("no pudimos encontrar el lugar de busqueda");
  }
}

function initSearchForm({ value, lat, lng }, callback?) {
  return fetchData(value, lat, lng);
}

export { initSearchForm };
