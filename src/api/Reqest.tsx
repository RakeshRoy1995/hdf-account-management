import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const authToken = localStorage.getItem("customer_login_auth") || "";
const token: any = authToken ? JSON.parse(authToken) : "";

// axios.defaults.headers.common[
//   "Authorization"
// ] = `Bearer ${token?.access_token}`;
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export function loginPassword(data: any) {
  const page_list = `${API_URL}/auth/signin`;

  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    data,
    url: page_list,
  };

  return axios(options);
}

export function registration(data: any) {
  const page_list = `${API_URL}/auth/signup`;

  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    data,
    url: page_list,
  };

  return axios(options);
}

export function submitFormData(api: string, options: any) {
  const option = {
    ...options,
    headers: {
      Authorization: token?.accessToken
        ? `Bearer ${token?.accessToken}`
        : undefined,
      "content-type": "application/json",
    },
    url: api,
  };
  return axios(option);
}

export function submitFIleData(api: string, options: any) {
  const option = {
    ...options,
    headers: {
      Authorization: token?.accessToken
        ? `Bearer ${token?.accessToken}`
        : undefined,
      "content-type": "multipart/form-data",
    },
    url: api,
  };

  return axios(option);
}

export function get_all_data(url: string , params:any = undefined) {
  const page_list = `${API_URL}/${url}`;

  const options = {
    method: "GET",
    headers: {
      Authorization: token?.accessToken
        ? `Bearer ${token?.accessToken}`
        : undefined,
      "content-type": "application/json",
    },
    url: page_list,
    params
  };

  return axios(options);
}

//All Location

export function getDivisionData() {
  const divisionUrl = `${API_URL}/division`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: divisionUrl,
  };
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getDistrictData(divisionId: any) {
  const districtUrl = `${API_URL}/district?divisionId=${divisionId}`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: districtUrl,
  };
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getUpazilaData(districtId: any) {
  const districtUrl = `${API_URL}/upazila?districtId=${districtId}`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: districtUrl,
  };
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getUnionData(upazilaId: any) {
  const districtUrl = `${API_URL}/union/search?upazilaId=${upazilaId}`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: districtUrl,
  };
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getVillageData(unionId: any) {
  const districtUrl = `${API_URL}/village/search?unionId=${unionId}`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: districtUrl,
  };
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getCityCorpData(districtId: any) {
  const districtUrl = `${API_URL}/city-corporation/search?districtId=${districtId}`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: districtUrl,
  };
  // console.log('====================================');
  // console.log("divisionUrl",districtUrl);
  // console.log('====================================');
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}

export function getWardData(districtId: any) {
  const districtUrl = `${API_URL}/ward/search?districtId=${districtId}`; // Replace API_URL with your base URL

  const options = {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token?.accessToken}`,
    },

    url: districtUrl,
  };
  // console.log('====================================');
  // console.log("divisionUrl",districtUrl);
  // console.log('====================================');
  return axios(options)
    .then((response) => response.data)
    .catch((error) => console.error("Error fetching division data:", error));
}
