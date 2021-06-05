import axios from "axios";
const defaultHeaders = {
  headers: {
    "Content-Type": "application/json; charset=UTF-8",
  },
};
export const adminLoginAPIMethod = (data, success) => {
  return axios
    .post("http://localhost:5000/api/admin/login", data, {
      withCredentials: true,
    })
    .then(checkStatus)
    .then(success);
};

export const deleteUserAPIMethod = (data, success) => {
  return axios
    .delete(`http://localhost:5000/api/admin/usersInfo/${data.id}`, {
      withCredentials: true,
    })
    .then(checkStatus)
    .then(success);
};

export const getAllUsersAPIMethod = (success) => {
  return axios
    .get("http://localhost:5000/api/admin/usersInfo", {
      withCredentials: true,
    })
    .then(checkStatus)
    .then(success);
};



export const getAllMessagesAPIMethod = (success) => {
  return axios
    .get("http://localhost:5000/api/admin/ContactUs", {
      withCredentials: true,
    })
    .then(checkStatus)
    .then(success);
};


export const NotifyAPIMethod = (userInfo, success) => {
  return fetch(`http://localhost:5000/api/admin/notify`, {
    ...defaultHeaders,
    method: "POST",
    body: JSON.stringify(userInfo),
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
