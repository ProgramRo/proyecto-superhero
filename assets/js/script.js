// Crear las constantes
const heroInfo = document.querySelector("#hero-info")
const formulario = document.querySelector("#form")
const input = document.querySelector("#hero-input")
const heroStats = document.querySelector("#hero-stats")

// Evento 'Submit' en el formulario
formulario.addEventListener("submit", (event) => {
  event.preventDefault()
  const inputValor = input.value
  const patron = /^[0-9]+$/
  if (!inputValor.match(patron)) {
    alert("Solo se permiten números")
    return
  }

  // Agregar el enlace de Superheroapi
  fetch(
    "https://www.superheroapi.com/api.php/4905856019427443/" + inputValor
  ).then((respuesta) => {
    respuesta.json().then((data) => {
      console.log(data)
      const nombre = data.name
      const imagen = data.image.url
      const connections = data.connections["group-affiliation"]
      const publisher = data.biography.publisher
      const occupation = data.work.occupation
      const primeraAparicion = data.biography["first-appearance"]
      const altura = data.appearance.height
      const peso = data.appearance.weight
      const aliases = data.biography.aliases
      const powers = data.powerstats

      // Imprimir el nombre del superhéroe
      heroInfo.innerHTML = `
            <div class= "card mb-3">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${imagen}" class="img-fluid rounded-start" alt="">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title"><strong>Nombre:</strong> ${nombre}</h5>
                            <p class="card-text"><strong>Conexiones:</strong> ${connections}</p>
                            <div class="container">
                                <p class="card-text"><strong>Publicado por:</strong> ${publisher}</p>
                                <p class="card-text"><strong>Ocupación:</strong> ${occupation}</p>
                                <p class="card-text"><strong>Primera aparición:</strong> ${primeraAparicion}</p>
                                <p class="card-text"><strong>Altura:</strong> ${altura}</p>
                                <p class="card-text"><strong>Peso:</strong> ${peso}</p>
                                <p class="card-text"><strong>Alianzas:</strong> ${aliases}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`

      // Se crea el gráfico en torta
      const config = {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
          text: `Estadísticas de ${nombre}`,
        },
        data: [
          {
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} ({y})",
            dataPoints: [
              { y: powers.intelligence, label: "Intelligence" },
              { y: powers.strength, label: "Strength" },
              { y: powers.speed, label: "Speed" },
              { y: powers.durability, label: "Durability" },
              { y: powers.power, label: "Power" },
              { y: powers.combat, label: "Combat" },
            ],
          },
        ],
      }

      if (powers.intelligence !== "null") {
        const chart = new CanvasJS.Chart("hero-stats", config)
        chart.render()
      } else {
        alert("¡Estamos trabajando en la actualización de las estadísticas de tu SuperHero favorito! Lamentamos el inconventiente 😩")
        heroStats.innerHTML = `
        <div class="container text-center">
            <span style='font-size:100px;'>&#128373;</span>
            <span style="font-size:100px;">&#128284;</span>
            <p class="sub-header">Estamos recopilando toda la información necesaria</p>
            <p class="sub-header">¡Vuelve pronto para saber más sobre <strong>${nombre}</strong>!</p>
        </div>`
      }
    })
  })
})
