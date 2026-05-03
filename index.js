/*****************************************************************************
 * Challenge 2
*/

// import data
import GAMES_DATA from './games.js';

// parse JSON
const GAMES_JSON = JSON.parse(GAMES_DATA);

/*****************************************************************************
 * DOM ELEMENTS (FIXED ORDER - IMPORTANT)
*/

const gamesContainer = document.getElementById("games-container");

const contributionsCard = document.getElementById("num-contributions");
const raisedCard = document.getElementById("total-raised");
const gamesCard = document.getElementById("num-games");

const descriptionContainer = document.getElementById("description-container");

const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

/*****************************************************************************
 * Utility
*/

function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3 - Render Games
*/

function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        const game = games[i];

        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        gameCard.innerHTML = `
            <img class="game-img" src="${game.img}" />
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            <p><strong>Backers:</strong> ${game.backers}</p>
            <p><strong>Pledged:</strong> $${game.pledged}</p>
            <p><strong>Goal:</strong> $${game.goal}</p>
        `;

        gamesContainer.appendChild(gameCard);
    }
}

// initial render
addGamesToPage(GAMES_JSON);

/*****************************************************************************
 * Challenge 4 - Stats
*/

const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged;
}, 0);

const totalContributions = GAMES_JSON.reduce((total, game) => {
    return total + game.backers;
}, 0);

// display stats
contributionsCard.innerHTML = totalContributions.toLocaleString();
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;
gamesCard.innerHTML = GAMES_JSON.length;

/*****************************************************************************
 * Challenge 5 - Filters
*/

function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);
    addGamesToPage(fundedGames);
}

function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
    addGamesToPage(unfundedGames);
}

function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);
}

// event listeners (ONLY ONCE)
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*****************************************************************************
 * Challenge 6 - Description Message
*/

const unfundedCount = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0);

const message = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. ${unfundedCount} games remain unfunded. We need your help to fund these amazing games.`;

const paragraph = document.createElement("p");
paragraph.innerHTML = message;
descriptionContainer.appendChild(paragraph);

/*****************************************************************************
 * Challenge 7 - Top Games (left for you if needed later)
*/

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = [...GAMES_JSON].sort((a, b) => b.pledged - a.pledged);

// destructure top 2 games
const [firstGame, secondGame] = sortedGames;

// create element for #1 game
const firstGameElement = document.createElement("p");
firstGameElement.innerHTML = firstGame.name;

// append to container
firstGameContainer.appendChild(firstGameElement);

// create element for #2 game
const secondGameElement = document.createElement("p");
secondGameElement.innerHTML = secondGame.name;

// append to container
secondGameContainer.appendChild(secondGameElement);