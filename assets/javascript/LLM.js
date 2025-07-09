let apiKey = document.getElementById("apiKey");
let messageField = document.getElementById("chat");

//
messageField.addEventListener("keypress", function (event) {
  if (event.keyCode == 13 && event.shiftKey) {
    event.preventDefault();
    callOpenRouter(messageField.value);
    //test(messageField.value);
  }
});

function test(message) {
  console.log("Bearer " + apiKey.value);
  console.log(message);
}

async function callOpenRouter(message) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + apiKey.value,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin, // Optional but recommended
      },
      body: JSON.stringify({
        model: "google/gemma-3-4b-it:free",
        messages: [{ role: "user", content: message }],
        stream: false,
      }),
    }
  );

  const data = await response.json();
  console.log(data.choices[0].message.content);
}
