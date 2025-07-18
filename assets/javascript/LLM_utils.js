import * as Types from "./types.js";

export async function callOpenRouter(message, systemprompt, apikey) {
  /** @type {Types.RequestLLM}*/
  const REQUEST = {
    model: "deepseek/deepseek-chat-v3-0324",
    messages: [
      { role: "system", content: systemprompt },
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
        Authorization: "Bearer " + apikey,
        "Content-Type": "application/json",
        "HTTP-Referer": window.location.origin,
      },
      body: JSON.stringify(REQUEST),
    }
  );

  /** @type {Types.ResponseLLM} */
  const data = await response.json();
  return data;
}
