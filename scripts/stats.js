let urlApi = "https://mindhub-xj03.onrender.com/api/amazing"
let datosMyApi;
let datepastEvent;
let dateupCoEvent;


async function winData() {
  try {
    let response = await fetch(urlApi);
    console.log(response);
    datosMyApi = await response.json();
    console.log(datosMyApi);
    datepastEvent = findPastEvents(datosMyApi);
    console.log(datepastEvent);
    dateupCoEvent = findUpCommingEvents(datosMyApi);
    console.log(dateupCoEvent);
  } catch (error) {
    console.log("Hay un error en la Api", error);
  }
}
function findUpCommingEvents(data) {
  let dateCurrentDate = new Date(data.currentDate)
  let dateupCoEvent = data.events.filter(element => new Date(element.date) > dateCurrentDate)
  return dateupCoEvent;
  
}


function findPastEvents(data) {
  let dateCurrentDate = new Date(data.currentDate)
  let datepastEvent = data.events.filter(element => new Date(element.date) < dateCurrentDate)
  return datepastEvent;
  
}


   // Saco el evento con mayor % de asistencia
async function showEventMayorAssist() {
  try {
    await winData(); // Espero a que se resuelva la promesa de winData para tener los datos actualizados.
    let mayorAsistenciaEvento = null;
    let mayorPorcentajeAsistencia = 0;

    
    for (let i = 0; i < datepastEvent.length; i++) {
      let event = datepastEvent[i];
      let attendancePercentage = (event.assistance
        / event.capacity) * 100;
      if (attendancePercentage > mayorPorcentajeAsistencia) {
        mayorAsistenciaEvento = event;
        mayorPorcentajeAsistencia= attendancePercentage;
      }
    }

    
    let tdHighAttend = document.getElementById("td-highAttend");
    tdHighAttend.innerText = `${mayorAsistenciaEvento.name} - ${mayorPorcentajeAsistencia}%`;
  } catch (error) {
    console.log('Hubo un error al mostrar el evento de mayor asistencia.', error);
  }
}

showEventMayorAssist()

    // Saco el evento con menor % de asistencia
async function showEventMenorAssist() {
  try {
    await winData(); // Espero a que se resuelva la promesa de winData para tener los datos actualizados.
    let menorAsistenciaEvento = null;
    let menorPorcentajeAsistencia = 100;

    
    for (let i = 0; i < datepastEvent.length; i++) {
      let event = datepastEvent[i];
      let attendancePercentage = (event.assistance
        / event.capacity) * 100;
      if (attendancePercentage < menorPorcentajeAsistencia) {
        menorAsistenciaEvento = event;
        menorPorcentajeAsistencia= attendancePercentage;
      }
    }

    
    let tdLowestAttend = document.getElementById("th-lowestAttend");
    tdLowestAttend.innerText = `${menorAsistenciaEvento.name} - ${menorPorcentajeAsistencia}%`;
  } catch (error) {
    console.log('Hubo un error al mostrar el evento de menor asistencia.', error);
  }
}

showEventMenorAssist()


  // Saco el evento con mayor capacidad

async function mostrarMayorCapacidad() {
  try {
    // Espero a que se carguen los datos de la API
    await winData();
    
    const eventosOrdenados = datepastEvent.sort((a, b) => b.capacity
    - a.capacity
    );
 
    const mayorCapacidad = eventosOrdenados[0];
    
    const td_largerCapacity = document.getElementById("td-larger-capacity");
    td_largerCapacity.innerHTML = `${mayorCapacidad.capacity} - ${mayorCapacidad.name}`;
  } catch(error) {
    console.log("Error al mostrar el evento con mayor capacidad", error);
  }
}

mostrarMayorCapacidad();

// Estadisticas de Eventos Futuros
  async function generateTableUpComming() {
    try {
      await winData(); // Espero que se cargue los datos de mi API
  
      // Obtengo las categorias sin repetirlas
      const categorias = [...new Set(dateupCoEvent.map((evento) => evento.category))];
  
      
      const tableEventosFuturos = document.querySelector('table');
  
      // Creo la fila de encabezado
      const headerFila = document.createElement('tr');
      const headerCelda = document.createElement('th');
      headerCelda.setAttribute('colspan', '3');
      headerCelda.textContent = 'Upcoming events statistics by category';
      headerFila.appendChild(headerCelda);
      tableEventosFuturos.appendChild(headerFila);
  
      // Creo la fila de encabezado de las columnas
      const myTr = document.createElement('tr');
      const categoryCelda = document.createElement('td')
      categoryCelda.classList.add('encabezado')
      categoryCelda.textContent = 'Categories';
      const revenueCelda = document.createElement('td')
      revenueCelda.classList.add('encabezado')
      revenueCelda.textContent = 'Revenues';
      const attendanceCelda = document.createElement('td');
      attendanceCelda.classList.add('encabezado')
      attendanceCelda.textContent = 'Percentage of attendance';
      myTr.appendChild(categoryCelda);
      myTr.appendChild(revenueCelda);
      myTr.appendChild(attendanceCelda);
      tableEventosFuturos.appendChild(myTr);
  
        //categorias
      categorias.forEach((category) => {
        const categInCategory = dateupCoEvent.filter(
          (event) => event.category === category
        );
  
        // Calculo Revuene de eventos futuros
        const revenueUpComming = categInCategory.reduce(
          (total, event) => total + event.price * event.estimate,
          0
        );
  
        //necesito hacer sumatoria de `estimate` y `capacity` de los eventos de la categoria
        const sumatoriaEstimate = categInCategory.reduce(
          (total, event) => total + event.estimate,
          0
        );
  
        const capacitySum = categInCategory.reduce(
          (total, event) => total + event.capacity,
          0
        );
  
        //Saco el porcentaje
        const porcentAsistFutura = (
          (sumatoriaEstimate / capacitySum) *
          100
        ).toFixed(2);
  
        // lleno la tabla con los datos
        const dataRow = document.createElement('tr');
  
        const categoryCelda = document.createElement('td');
        categoryCelda.classList.add('td-categorUp');
        categoryCelda.textContent = category;
        dataRow.appendChild(categoryCelda);
  
        const revenueCelda = document.createElement('td');
        revenueCelda.classList.add('td-revuenesUp');
        revenueCelda.textContent = revenueUpComming;
        dataRow.appendChild(revenueCelda);
  
        const attendanceCelda = document.createElement('td');
        attendanceCelda.classList.add('td-porceUp');
        attendanceCelda.textContent = `${porcentAsistFutura}%`;
        dataRow.appendChild(attendanceCelda);
  
      tableEventosFuturos.appendChild(dataRow);
      });
    } catch (error) {
      console.log('Hay un error en completar la estadistica de Eventos Futuros', error);
    }
  }
  
  generateTableUpComming();
  


async function generateTable() {
  try{
    await winData();

    // Obtengo  las categorías sin repetición
    const categories = [...new Set(datepastEvent.map(event => event.category))];

     
     const tableEventosPasados = document.querySelector('table');
  
     // Creo la fila de encabezado
     const headerRow = document.createElement('tr');
     const headerCell = document.createElement('th');
     headerCell.setAttribute('colspan', '3');
     headerCell.textContent = 'Past events statistics by category';
     headerRow.appendChild(headerCell);
     tableEventosPasados.appendChild(headerRow);
 
     // Creo la fila de encabezado de las columnas
     const columnRow = document.createElement('tr');
     const categoryCell = document.createElement('td')
     categoryCell.classList.add('encabezado')
     categoryCell.textContent = 'Categories';
     const revenueCell = document.createElement('td')
     revenueCell.classList.add('encabezado')
     revenueCell.textContent = 'Revenues';
     const attendanceCell = document.createElement('td')
     attendanceCell.classList.add('encabezado')
     attendanceCell.textContent = 'Percentage of attendance';
     columnRow.appendChild(categoryCell);
     columnRow.appendChild(revenueCell);
     columnRow.appendChild(attendanceCell);
     tableEventosPasados.appendChild(columnRow);
 

     //Categorias
    categories.forEach(category => {
      
      const categoryInCategory = datepastEvent.filter(event => event.category === category);

      // Saco la suma de los productos de precio y asistencia de los eventos de la categoría
      const categoryRevenue = categoryInCategory.reduce((total, event) => total + (event.price * event.assistance), 0);

      // Obtengo la suma de la asistencia de los eventos de la categoría
      const categoryAssistance = categoryInCategory.reduce((total, event) => total + event.assistance, 0);

      // Calculo la suma de las capacity de los eventos de la categoria
      const categoryCapacity = categoryInCategory.reduce((total, event) => total + event.capacity, 0)

      // Calculo el porcentaje de asistencia
      const attendancePercentage = ((categoryAssistance / categoryCapacity) * 100).toFixed(2)

      // Creo la fila de datos
      const dataRow1 = document.createElement('tr');
  
      const categoryCell = document.createElement('td');
      categoryCell.classList.add('td-categories');
      categoryCell.textContent = category;
      dataRow1.appendChild(categoryCell);

      const revenueCell = document.createElement('td');
      revenueCell.classList.add('td-revuenes');
      revenueCell.textContent = categoryRevenue;
      dataRow1.appendChild(revenueCell);

      const attendanceCell = document.createElement('td');
      attendanceCell.classList.add('td-porcattendance');
      attendanceCell.textContent = `${attendancePercentage}%`;
      dataRow1.appendChild(attendanceCell);

      tableEventosPasados.appendChild(dataRow1);
    });
  }catch (error){
    console.log("Hay un error en completar la estadistica de Eventos Pasados", error)
  }
}

generateTable()

