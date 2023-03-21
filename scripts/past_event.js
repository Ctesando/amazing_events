
let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let datosMyApi;
let datepastEvent;
async function winData(){
  try{
    let response = await fetch(urlApi)
    console.log(response)
    datosMyApi = await response.json()
     console.log(datosMyApi)
     datepastEvent = findPastEvents(datosMyApi)
   
    await filterCategories(datepastEvent)
    showCategories(categorias)
    huntSearch(datepastEvent)
    renderCards(datepastEvent)
    printCard(datepastEvent, "#row")
  } catch(error){
    console.log('Hay un error en la Api', error)
  }
       
}
winData()


 function findPastEvents(data) {
  let dateCurrentDate = new Date(data.currentDate)
  let datepastEvent = data.events.filter(element => new Date(element.date) < dateCurrentDate)
  return datepastEvent;
  
}
winData()


//Genero las cards dinamicamente

async  function renderCards(array) {
  let contenedor = document.querySelector(".row3");
  let card = document.createElement("div");
  card.classList.add("i.name", "card-new");
  array.forEach((i) => {
    let container = document.createElement("div");
    container.classList.add( "div-container");
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
 


//filtrado de categorias

categorias = [];
 async function filterCategories (arr){
arr.forEach((ele) => {
  if (!categorias.includes(ele.category)) {
    categorias.push(ele.category);
  }
})
 }

 
console.log(categorias);

let div = document.querySelector("#categorias");
 async function showCategories(item){
  div.innerHTML = "";
  item.forEach(category =>{
    div.innerHTML += `<div class="form-check form-check-inline mx-0">
    <input class="form-check-input" type="checkbox" id="inlineCheckbox" name="${category}" value ="${category}">
    <label class="form-check-label" for="${category}">${category}</label> 
   </div>`;
  })
    changesCategories()   
 }
  

//filtrar por checkboxes
function changesCategories() {
const checkElemt = document.querySelectorAll('input[type="checkbox"]');
console.log( checkElemt)
checkElemt.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    console.log(checkbox)
    const cateCheked = [];
    checkElemt.forEach((le) => {
      if (le.checked) {
        cateCheked.push(le.value);
        console.log(cateCheked)
      }
    });
    const filtered = datepastEvent.filter((obj) => {
      return cateCheked.includes(obj.category);
    });

      printCard(filtered, "#row");
  });
});
}
 async function printCard(arr, contenedor) {
  let content = document.querySelector(contenedor);
  content.innerHTML = "";
  if (arr.length > 0) {
    renderCards(arr);
    console.log("entro por if,printCard");
  } else {
    renderCards(datepastEvent);
    console.log("entro por else");
  }
}
 

// filtro combinado
const busquedaInput = document.getElementById("search1");
const botonSearch = document.getElementById("search")

 async function huntSearch() {
  let categoriasCheked = [];
  const text_busqueda = busquedaInput.value.toLowerCase().trim();
 
 const checkElemt = document.querySelectorAll('input[type="checkbox"]');
 checkElemt.forEach((checkbox) => {
     if (checkbox.checked) {
         categoriasCheked.push(checkbox.value);
     }
 });
 
 
 const resultados = datepastEvent.filter(evento => 
  
    categoriasCheked.length === 0 || categoriasCheked.includes(evento.category)
  ).filter(evento => 
    evento.name.toLowerCase().trim().includes(text_busqueda) ||
    evento.description.toLowerCase().trim().includes(text_busqueda)
  );

  if (resultados.length === 0) {
    const alertContainer = document.querySelector("#alert")
   alertContainer.innerHTML = ""; // elimino el contenido anterior del alerta, asi no se repite en el HTML
   alertContainer.innerHTML += `<p id ="p-alert">No results found. Try again.</p> <img id="img-alert" src="./imagenes/search.png" alt="icon no result foun">`
     
     setTimeout(() => {  //elimino el alerta en pantalla despues de 5"
      alertContainer.innerHTML = "";
    }, 4000);
  } else {
    printCard(resultados, "#row");
  }
}

botonSearch.addEventListener("click", event => {
  event.preventDefault();
  huntSearch();
});





