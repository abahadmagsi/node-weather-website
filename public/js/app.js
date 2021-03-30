const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = search.value;
  messageOne.textContent = "Loading....";
  messageTwo.textContent = "";
  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        messageOne.textContent = `${data.error}`;
        return console.log(data.error);
      }
      messageOne.textContent = `${data.location} `;
      messageTwo.textContent = `It's ${data.forecast.temp} temperature out today. It feels like ${data.forecast.feelslike} and there is ${data.forecast.cloudcover} Cloud Cover..!`;
    });
  });
});
