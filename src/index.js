let addToy = false;
let toys_container = document.getElementById('toy-collection')
let form = document.querySelector('.add-toy-form')
console.log(form)



  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

form.addEventListener("submit", (e) => {
  e.preventDefault()
  console.log(e.target.name.value, e.target.image.value)

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    })
  })
})

//fetching all the toys
function getToys() {
  return fetch('http://localhost:3000/toys').then((res)=> res.json())
}


const renderToys = (toy) => {
  console.log(toy)
  //creating the card div
  let toy_card = document.createElement("div");
  toy_card.className = "card"

  // we are creating the toy attributes
  let name = document.createElement("p")
  name.innerHTML = toy.name
  let image = document.createElement("img")
  image.src = toy.image
  image.className = "toy-avatar"
  let likes = document.createElement("p")
  likes.innerHTML = toy.likes
  let button = document.createElement("button")
  button.id = 'like'
  button.innerHTML = "like"

  let deleteButton = document.createElement("button")
  deleteButton.innerHTML = "x"

  deleteButton.addEventListener("click", () => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "DELETE"
    } )
  })


  button.addEventListener('click', () => {
    console.log('button clicked', toy.id)

    fetch(`http://localhost:3000/toys/${toy.id}`, 
    {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          likes: toy.likes + 1
        }
      )
    }
    )
  });  

  //we are appending the toy attributes to the card
  toy_card.append(name, image, likes, button, deleteButton)
  toys_container.append(toy_card)
}

// we are getting the data from the promise and looping through the data and rendering individual cards
getToys().then(data => {
  console.log(data)
  data.forEach((toy) => {console.log(toy)
  renderToys(toy)
  })
})