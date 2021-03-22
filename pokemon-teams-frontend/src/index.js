const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

getTrainers = () => {fetch(TRAINERS_URL).then(r => r.json()).then(resp => {displayTrainers(resp)})}

document.addEventListener('DOMContentLoaded',()=>{
    let mainContainer = document.querySelector('main')
    getTrainers()

    displayTrainers = (trainers) => {
        trainers.forEach(trainer => {
            let trainerDiv = document.createElement('div')
            let trainerName = document.createElement('p')
            let trainerBtn = document.createElement('button')
            let trainerUl = document.createElement('ul')
            
            trainerName.innerText = trainer['name']
            trainerName.className = "card"
            trainerName.id = trainer['id']
            
            trainerBtn.id = trainer['id']
            trainerBtn.innerText = "Add Pokemon"
        
            trainerBtn.addEventListener("click", (e)=>{
                e.preventDefault()
                fetch(`${TRAINERS_URL}/${e.target.id}`,{
                    method: "PATCH",
                    headers: {
                        'content-type': 'application/json',
                        'accept': 'application/json'
                    }
                }).then(resp => resp.json()).then(r => {
                   let newLi = document.createElement('li')
                   newLi.innerText = r['nickname']
                   let newBtn = document.createElement('button')
                   newBtn.innerText = "Release"
                   newBtn.className = "release"
                   trainerUl.appendChild(newLi)
                   trainerUl.appendChild(newBtn)

                }).catch(e => console.log(e.message))
            })
            
            trainer.pokemons.map(p => {
                let pokemonLi = document.createElement('li')
                let pokemonBtn = document.createElement('button')
                pokemonBtn.addEventListener("click", (e) => {
                    e.preventDefault()
                    fetch(`${TRAINERS_URL}/${trainer.id}`,{
                        method: "PATCH",
                        headers: {
                            'content-type': 'application/json',
                            'accept': 'application/json'
                        }
                    }).then(r => r.json()).then(r => console.log(r))
                })

                pokemonLi.innerText = p['nickname']
                pokemonBtn.innerText = "Release"
                pokemonBtn.className = "release"
                pokemonBtn.id = p['id']

                trainerUl.appendChild(pokemonLi)
                pokemonLi.appendChild(pokemonBtn)
            })

            mainContainer.appendChild(trainerDiv)
            trainerDiv.appendChild(trainerName)
            trainerDiv.appendChild(trainerBtn)
            trainerDiv.appendChild(trainerUl)
        })
    }
})
