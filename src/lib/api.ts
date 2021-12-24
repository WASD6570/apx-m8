const env = process.env.NODE_ENV === "development";
let API_BASE_URL = "https://mascotas-perdidaas.herokuapp.com";
if (env) {
  API_BASE_URL = "http://localhost:8080";
}
type requestOptionsType = {
  method: "POST" | "GET" | "DELETE";
  body: any;
  authToken?: string;
};

type petInfo = {
  name: string;
  description: string;
  petPicture: any;
  lat: any;
  lng: any;
  isLost: boolean;
};

function requestOptions({ body, method, authToken = "" }: requestOptionsType) {
  return {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `bearer ${authToken}`,
    },
    body: JSON.stringify(body),
  };
}

async function logIn(email: string, password: string): Promise<any> {
  const response = await fetch(
    `${API_BASE_URL}/auth/token`,
    requestOptions({
      body: { email: email, password: password },
      method: "POST",
    })
  );
  const token = await response.json();
  return { token, status: response.status };
}

async function mascotasCercaTuyo({ lat, lng }): Promise<Array<any>> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/pets-around?lat=${lat}&lng=${lng}`
    );
    if (response.status !== 200) {
      throw new Error("error");
    }
    const pets = await response.json();
    return pets.hits;
  } catch (error) {
    window.alert(error.message);
    return;
  }
}

async function reportPet({ name, id, description, email, phone, token }) {
  const body = { name, id, description, email, phone };
  const response = await fetch(
    `${API_BASE_URL}/user/send-report`,
    requestOptions({
      body: body,
      method: "POST",
      authToken: token,
    })
  );
  const parsedResponse = await response.json();
  return response.status;
}

async function createPet(petInfo: petInfo, token: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/user/create-pet`, {
    method: "post",
    headers: {
      Authorization: `bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(petInfo),
  });
  const parsedResponse = await response.json();
  return { status: response.status, pets: parsedResponse };
}

async function getUserPets(token: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/user/reported-pets`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  const parsedResponse = await response.json();
  return parsedResponse.pets;
}

async function createUser(email: string, password: string): Promise<any> {
  const response = await fetch(`${API_BASE_URL}/signin`, {
    method: "post",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const token = await response.json();
  return { token, status: response.status };
}

async function updatePet(petInfo, token) {
  const response = await fetch(`${API_BASE_URL}/user/update-pet`, {
    method: "post",
    headers: {
      Authorization: `bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(petInfo),
  });
  const pets = await response.json();
  return { status: response.status, pets: pets };
}

export {
  logIn,
  mascotasCercaTuyo,
  reportPet,
  createPet,
  getUserPets,
  createUser,
  updatePet,
  API_BASE_URL,
};
