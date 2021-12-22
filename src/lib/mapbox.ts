//@ts-ignore
const MAPBOX_TOKEN =
  "pk.eyJ1Ijoid2FzZDEyIiwiYSI6ImNrd2FvNmdrZjI1NjQycGxqZ29ldGEzaWYifQ.UDM7Ur0JGtFmJe3WPidyQQ";

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
