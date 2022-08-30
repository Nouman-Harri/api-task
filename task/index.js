const history = [];
const input = document.querySelector("#searchbar");
const form = document.querySelector("form");

const button = (document.querySelector("#delete").onclick = () => {
  render("");
  input.value = "";
});
form.addEventListener('submit',onSubmit)

function onSubmit(e){
  e.preventDefault();
  if (input.value) {
    render(input.value);
    history.push(input.value);
    renderHistory();
  }
};

async function render(eventValue) {
  let response = [];
  response = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (response) => response.json()
  );
  let state = response.filter((element) => {
    if (!eventValue) return;
    return element.name.toLowerCase().includes(eventValue);
  });
  const ul = document.querySelector("#list");
  ul.innerHTML = "";
  for (let i = 0; i < state.length; i++) {
    const li = document.createElement("li");
    li.innerHTML = state[i].name;
    ul.appendChild(li);
  }
}

function renderHistory() {
  input.value = "";
  const historyDiv = document.querySelector(".history");
  const ul = historyDiv.querySelector("ul");
  ul.innerHTML = "";
  for (let index = 0; index < history.length; index++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "trash";
    button.innerHTML = "X";
    li.innerHTML = history[index];
    li.appendChild(button);
    ul.appendChild(li);
    button.onclick = () => {
      history.splice(index, 1);
      renderHistory();
    };
  }
}
