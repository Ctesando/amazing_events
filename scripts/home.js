categorias = [];
data.events.forEach((ele) => {
  if (!categorias.includes(ele.category)) {
    categorias.push(ele.category);
  }
});
console.log(categorias);

let div = document.querySelector("#categorias");
let htmlcategorias = "";
for (let category of categorias) {
  htmlcategorias += `<div class="form-check form-check-inline mx-0">
    <input class="form-check-input" type="checkbox" id="inlineCheckbox" name="${category}" value ="${category}">
    <label class="form-check-label" for="${category}">${category}</label> 
   </div>`;
}
div.innerHTML = htmlcategorias;

//Genero las cards dinamicamente

let contenedor = document.querySelector(".row3");

function renderCards(array) {
  let card = document.createElement("div");
  card.classList.add("i.name", "card-new");
  array.forEach((i) => {
    let container = document.createElement("div");
    let div34 = document.createElement("div");
    div34.classList.add("card", "text-center", "h-100", "card_detail1");
    let image = document.createElement("img");
    image.setAttribute("src", i.image);
    image.setAttribute("style", "width: 17rem;");
    image.classList.add("card-img-top");
    image.style.width = "250px";
    image.style.height = "170px";
    image.setAttribute("alt", i.name);
    div34.appendChild(image);

    let div35 = document.createElement("div");
    div35.classList.add("card-body");
    let title = document.createElement("h5");
    title.classList.add("card-title", "my-3");
    title.innerText = i.name.toLowerCase();
    div35.appendChild(title);

    let descrp = document.createElement("p");
    descrp.classList.add("card-text", "my-5");
    descrp.innerText = i.description;

    div35.appendChild(descrp);

    div34.appendChild(div35);

    let div36 = document.createElement("div");
    div36.classList.add("card_price");

    let span = document.createElement("span");
    span.innerText = "Price= $ " + i.price;

    div36.appendChild(span);
    div36.innerHTML += `<a href="./details.html?_id=${i._id}" class="bottom_card">See more</a>`;
    div34.appendChild(div36);
    container.appendChild(div34);
    card.appendChild(container);
    contenedor.appendChild(card);
  });
}

renderCards(data.events);

//filtrar por checkboxes

const checkElemt = document.querySelectorAll('input[type="checkbox"]');

checkElemt.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const cateCheked = [];
    checkElemt.forEach((le) => {
      if (le.checked) {
        cateCheked.push(le.value);
      }
    });
    const filtered = data.events.filter((obj) => {
      return cateCheked.includes(obj.category);
    });

    printCard(filtered, "#row");
  });
});

function printCard(arr, contenedor) {
  let content = document.querySelector(contenedor);
  content.innerHTML = "";
  if (arr.length > 0) {
    renderCards(arr);
    console.log("entro por if");
  } else {
    renderCards(data.events);
    console.log("entro por else");
  }
}

//search por input

const busquedaInput = document.getElementById("search1");

function huntSearch() {
  const valueSearched = busquedaInput.value.toLowerCase().trim();
  const filtrarEvents = data.events.filter((event) => {
    const nameFound = event.name.toLowerCase().trim().includes(valueSearched);
    const descripFound = event.description
      .toLowerCase()
      .trim()
      .includes(valueSearched);
    return nameFound || descripFound;
  });
  if (filtrarEvents.length === 0) {
    alert("No results found for the search.");
    return;
  }

  printCard(filtrarEvents, "#row");
}

busquedaInput.addEventListener("input", function (ev) {
  ev.preventDefault();

  huntSearch();
});



