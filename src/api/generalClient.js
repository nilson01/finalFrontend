import axios from "axios";
const defaultHeaders = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};

export const ContactUsInfoAPIMethod = (userInfo, success) => {
  return fetch(`/api/admin/ContactUs`, {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify(userInfo),
  })
    .then(checkStatus)
    .then(success);
};

export const getAllNotificationsAPIMethod = (success) => {
  return axios
    .get("/api/profile/notifications", {
      headers: {
        withCredentials: true,
      },
    })
    .then(checkStatus)
    .then(success);
};

export const signUpAPIInfo = (profile, success) => {
  return axios
    .post(`/api/profile/register`, profile, {
      headers: {
        withCredentials: true,
        credentials: 'include',
      },
    })
    .then(checkStatus)
    .then(success);
};

export const LoginAPIMethod = (profile, success) => {
  return axios
    .post(`/api/profile/login`, profile, {
      headers: {
        withCredentials: true,
        credentials: 'include',
      },
    })
    .then(checkStatus)
    .then(success);
};
export const LogoutAPIMethod = (success) => {
  return axios
    .post(
      `/api/profile/logout`, {}, {
      headers: {
        withCredentials: true,
        credentials: 'include',
      },
    }
    )
    .then(checkStatus)
    .then(success);
};

export const CheckOnlineAPIMethod = (profile, success) => {
  return axios
    .get(
      `/api/profile/checkonline`, {
      headers: {
        withCredentials: true,
      },
    }
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
