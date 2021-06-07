import axios from "axios";

export const GetProfileDataAPIMethod = (success) => {
  return axios
    .get("https://316project.azurewebsites.net/api/profile/checkOnline", {
      withCredentials: true,
    })
    .then(checkStatus)
    .then(success);
};

export const uploadImageToCloudinaryAPIMethod = (formData, success) => {
  //const cloudName = "nilson01"; // Cloudinary account
  const cloudName = "dtkgfy2wk";
  return fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
    // We do NOT want to set the default headers – the formData will automatically set the
    // headers to tell the server of the data type (which is different than the JSON
    // standard all the other API calls have been sending.
    method: "POST",
    body: formData,
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(success);
};

export const getprofileurlAPIMethod = (success) => {
  return axios
    .get("https://316project.azurewebsites.net/api/profile/profileHeader", {
      withCredentials: true,
    })
    .then(checkStatus)
    .then(success);
};

export const getBinomoDealsAPIMethod = (amount, success) => {
  return axios
    .get(`https://316project.azurewebsites.net/api/profile/fetchBinomoDeals/${amount}`, {
      withCredentials: true,
    })
    .then(checkStatus)
    .then(success);
};


export const changeProfileAPIMethod = (data, success) => {
  return axios
    .post("https://316project.azurewebsites.net/api/profile/settings", data, {
      withCredentials: true,
      credentials: 'include',
    })
    .then(checkStatus)
    .then(success);
};

export const changePasswordAPIMethod = (data, success) => {
  return axios
    .post("https://316project.azurewebsites.net/api/profile/changePassword", data, {
      withCredentials: true,
      credentials: 'include',
    })
    .then(checkStatus)
    .then(success);
};
export const checkPasswordAPIMethod = (data, success) => {
  return axios
    .post("https://316project.azurewebsites.net/api/profile/checkPassword", data, {
      withCredentials: true,
      credentials: 'include',
    })
    .then(checkStatus)

    .then(success);
};

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const res = await parseJSON(response);
    const error = new Error(`HTTP Error: ${response.statusText}`);
    error.status = response.statusText;
    error.response = res.message ? res.message : res;

    throw error;
  }
}
function parseJSON(response) {
  return response.json();
}
