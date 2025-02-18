import { sortCountry } from './data.js';
import data from './data/athletes/athletes.js';

function showCards(data) {
  const listCountry = data.reduce((previousValue, currentAthlete) => {
    let country = currentAthlete.team;
    if (country in previousValue) {
      const previousAthletes = previousValue[currentAthlete.team];
      return { ...previousValue, [country]: [...previousAthletes, currentAthlete] }
    }
    else {
      return { ...previousValue, [country]: [currentAthlete] }
    }
  }, {});

  let cardsCountry = ""
  for (const country in listCountry) {
    cardsCountry += `
      <div class="flex-item">
        <ol class="background">
          <li class="contents-country">${country}</li>
          <li class="contents-country">Total Athletes: ${listCountry[country].length}</li>
        </ol>
      </div>`
  }
  document.getElementById("cards-countries").innerHTML = cardsCountry;
}
showCards(data.athletes)

document.getElementById("ordering-country").addEventListener("change", changeSelectCountry)
function changeSelectCountry(evento) {
  const selectCountry = evento.target.value
  const result = sortCountry(data.athletes, selectCountry)
  showCards(result)
}

const buttonClean = document.getElementById("clean-button")
buttonClean.addEventListener("click", cleanOrder)
function cleanOrder() {
  window.location.reload();
}

const back = document.getElementById("backtoTop");

back.addEventListener("click", function () {
  window.scrollTo(0, 0);
});