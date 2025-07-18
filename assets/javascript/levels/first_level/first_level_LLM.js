import { callOpenRouter } from "../../LLM_utils.js";
import * as Types from "../../types.js";

const TEMPLATE = await fetch("./Templates/api_setup.html");
const HTML = await TEMPLATE.text();
document.body.insertAdjacentHTML("beforeend", HTML);
/** @type {HTMLElement} */
const MENU = document.getElementById("api_menu");
MENU.hidden = true;

const MENU_BUTTON = document.getElementById("menu");

const SYSTEMPROMPT =
  "The user is playing a puzzle game where the user needs to guess the RULE for a sequence type of puzzle. The current rule for this level is: the next number in the sequence is double the last.";

/** @type {HTMLElement} */
const APIKEY = document.getElementById("apiKey");
/** @type {HTMLElement} */
const MESSAGEFIELD = document.getElementById("chat");

/** @type {HTMLElement} */
const RESPONSESECTION = document.querySelector("#LLMoutput");

MESSAGEFIELD.addEventListener("keypress", async function (event) {
  if (event.key == "Enter" && event.shiftKey) {
    event.preventDefault();
    /** @type {Types.ResponseLLM} */
    const response = await callOpenRouter(
      MESSAGEFIELD.value,
      SYSTEMPROMPT,
      APIKEY.value
    );
    try {
      if (response.choices.length == 0) {
        throw new Error("Choices array is empty");
      }
      /** @type {Types.CheckResponse} */
      const ans = JSON.parse(response.choices[0].message.content);
      RESPONSESECTION.innerHTML = `<p>${ans.hint}<p>`;
      if (ans.pass) {
        RESPONSESECTION.innerHTML += `<a href=./second_level.html>Next level<a>`;
      }
    } catch (error) {
      console.log(error);
      console.log(response);
    }
  }
});

MENU_BUTTON.addEventListener("click", (event) => {
  MENU.hidden = !MENU.hidden;
});
