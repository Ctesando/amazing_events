
let query = location.search  
console.log(query)

let params = new URLSearchParams(query) 
console.log(params)

const id = params.get("_id") 
console.log(id)

let detail = data.events.find(detail => detail._id == id)  
console.log(detail)

let container = document.querySelector(".detailContenedor")

container.innerHTML = `<div class="row row-cols-4 mx-5" id="row">
<div id="detail-row">
  <div class="col col23 col-img">
  <div class="card text-center h-100 card-details" style="width: 17rem;">
    <img src="${detail.image}" class="card-img-top" alt="${detail.name}" id="card-img23">
     </div>
      </div>
  <div class="col col23"> 
   <div class="card text-center card-details" style="width: 17rem;">
       <div class="card-body">
          <h5 class="card-title my-3">${detail.name}</h5>
          <p class="card-text my-5">${detail.description}</p>
          <p class="card-text my-5">Date: ${detail.date}</p>
          <p class="card-text my-5">Place: ${detail.place}</p>
          <p class="card-text my-5">Capacity: ${detail.capacity}</p>
          <p class="card-text my-5">Assistance: ${detail.assistance}</p>
          <p class="card-text my-5">Estimate: ${detail.estimate}</p>
          <p class="card-text my-5">Price:$ ${detail.price}</p>
      </div>
      </div>
        </div>
   </div>     
</div>`



 