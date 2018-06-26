import {handleResponse} from "../user.service";

describe("handleResponse()", () => { 

  it ("returns data", () => {
    const promise = new Promise((resolve, reject) => {
      resolve({a: 1});
    });

    const response = {
      ok: true,
      json: _ => promise
    }

    return handleResponse(response).then((data) => {
      expect(data).toEqual({a: 1});
      return data;
    });
  });

  it ("returns error promise", () => {
    const promise = new Promise((resolve, reject) => resolve())

    const response = {
      statusText: "Not found",
      json: _ => promise
    }

    return handleResponse(response).catch((error) => {
      expect(response.statusText).toBe(error);
    })
  });

  it ("returns error promise from data", () => {
    const promise = new Promise((resolve, reject) => resolve({error: "Not found"}))

    const response = {
      json: _ => promise
    }

    return handleResponse(response).catch((error) => {
      expect("Not found").toBe(error);
    })
  });

  
  
});