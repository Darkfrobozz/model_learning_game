/**
 * @typedef {import('./types.js').ResponseLLM} ResponseLLM
 * @typedef {import('./types.js').RequestLLM} RequestLLM
 */

/** @type {HTMLElement} */
const APIKEY = document.getElementById("apiKey");
/** @type {HTMLElement} */
const MESSAGEFIELD = document.getElementById("chat");

/** @type {HTMLElement} */
const RESPONSESECTION = document.querySelector("#LLMoutput");

const SYSTEMPROMPT =
  "The user is playing a puzzle game where the user needs to guess the RULE for a sequence type of puzzle. The current rule for this level is: the next number in the sequence is double the last.";

async function callOpenRouter(message) {
  /** @type {RequestLLM}*/
  const REQUEST = {
    model: "mistralai/mistral-small-3.2-24b-instruct:free",
    messages: [
      { role: "system", content: SYSTEMPROMPT },
      { role: "user", content: message },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "puzzle game",
        strict: true,
        schema: {
          type: "object",
          properties: {
            pass: {
              type: "boolean",
              description: "Did the user guess the rule correctly?",
            },
            hint: {
              type: "string",
              description: "Hint for solving the problem",
            },
          },
          required: ["pass", "hint"],
        },
      },
    },
    stream: false,
  };

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + APIKEY.value,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
      },
      body: JSON.stringify(REQUEST),
    }
  );
  console.log(response);

  /** @type {ResponseLLM} */
  const data = await response.json();
  console.log(data);
  RESPONSESECTION.innerHTML = `<p>${data.choices[0].message.content}</p>`;
}

MESSAGEFIELD.addEventListener("keypress", function (event) {
  if (event.key == "Enter" && event.shiftKey) {
    event.preventDefault();
    callOpenRouter(MESSAGEFIELD.value);
  }
});
