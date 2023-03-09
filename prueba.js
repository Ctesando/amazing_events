// Obtener el input de búsqueda y la lista de elementos
var searchInput = document.getElementById("searchInput");
var list = document.getElementById("list");

// Escuchar el evento "input" del input de búsqueda
searchInput.addEventListener("input", function() {
  // Obtener el valor del input de búsqueda y convertirlo a minúsculas
  var searchValue = searchInput.value.toLowerCase();

  // Recorrer todos los elementos de la lista
  var found = false;
  for (var i = 0; i < list.children.length; i++) {
    var item = list.children[i];
    var name = item.textContent.toLowerCase();
    var description = item.getAttribute("data-description").toLowerCase();
    var searchMatch = name.indexOf(searchValue) > -1 || description.indexOf(searchValue) > -1;

    // Mostrar u ocultar el elemento dependiendo si hay una coincidencia con la búsqueda
    if (searchMatch) {
      item.style.display = "block";
      found = true;
    } else {
      item.style.display = "none";
    }
  }

  // Mostrar una alerta si no se encontraron resultados
  if (!found) {
    alert("No se encontraron resultados para la búsqueda '" + searchValue + "'.");
  }
});





