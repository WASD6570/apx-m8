const env = process.env.NODE_ENV === "development";
let API_BASE_URL = "";
if (env) {
  API_BASE_URL = "http://localhost:3000";
}

type requestOptionsType = {
  method: "POST" | "GET" | "DELETE";
  body: any;
  authToken?: string;
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
  try {
    const response = await fetch(
      `${API_BASE_URL}/auth/token`,
      requestOptions({
        body: { email: email, password: password },
        method: "POST",
      })
    );
    if (response.status === 400) {
      return false;
    }
    const token = await response.json();
    return token;
  } catch (error) {
    window.alert(error.message);
    return;
  }
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

export { logIn, mascotasCercaTuyo };
