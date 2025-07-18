export async function insert_templates() {
  await insert_template("./Templates/api_setup.html");
  await insert_template("./Templates/chat_setup.html");
}

async function insert_template(URL) {
  const TEMPLATE = await fetch(URL);
  const HTML = await TEMPLATE.text();
  document.body.insertAdjacentHTML("beforeend", HTML);
}
