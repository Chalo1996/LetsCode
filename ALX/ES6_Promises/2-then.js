// 0-promise.js

export default function handleResponseFromAPI(promise) {
  return promise
    .then((res) => {
      console.log("Got a response from the API");
      return {
        status: 200,
        body: "Success",
      };
    })
    .catch((err) => {
      console.log("Got a response from the API");
      return {
        status: 500,
        body: "Error",
      };
    });
}
