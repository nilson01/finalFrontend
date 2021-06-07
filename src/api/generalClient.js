import axios from "axios";
const defaultHeaders = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

export const ContactUsInfoAPIMethod = (userInfo, success) => {
  return fetch(`https://316project.azurewebsites.net/api/admin/ContactUs`, {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify(userInfo),
  })
    .then(checkStatus)
    .then(success);
};

export const getAllNotificationsAPIMethod = (success) => {
  return axios
    .get("https://316project.azurewebsites.net/api/profile/notifications", {
      withCredentials: true,
    })
    .then(checkStatus)
    .then(success);
};

export const signUpAPIInfo = (profile, success) => {
  return axios
    .post(`https://316project.azurewebsites.net/api/profile/register`, profile, {
      withCredentials: true,
    })
    .then(checkStatus)
    .then(success);
};

export const LoginAPIMethod = (profile, success) => {
  return axios
    .post(`https://316project.azurewebsites.net/api/profile/login`, profile, {
      withCredentials: true,
    })
    .then(checkStatus)
    .then(success);
};
export const LogoutAPIMethod = (success) => {
  return axios
    .post(
      `https://316project.azurewebsites.net/api/profile/logout`,
      {},
      {
        withCredentials: true,
      }
    )
    .then(checkStatus)
    .then(success);
};

export const CheckOnlineAPIMethod = (profile, success) => {
  return axios
    .get(
      `https://316project.azurewebsites.net/api/profile/checkonline`,
      {},
      { withCredentials: true, }
    )
    .then(checkStatus)
    .then(success);
};


async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    // console.log("testing");
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
