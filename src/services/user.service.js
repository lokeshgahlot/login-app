import {store} from "../store";

export const handleResponse = response => 
  response.json().then(data => {
    if (!response.ok) {
      const error = (data && data.error) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });

// register service
export const register = user => 
  fetch("/users/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  }).then(handleResponse);

// authentication service
export const authentication = user => 
  fetch("/users/authenticate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  })
    .then(handleResponse);

// getUser service
export const getUser = userId => {
  return fetch(`/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": store.getState().get("authenticationInfo").get("token")
    }
  })
    .then(handleResponse); 
};

  
