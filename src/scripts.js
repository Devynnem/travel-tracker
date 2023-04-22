// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import Traveler from '../src/Traveler.js';
import Trip from '../src/Trip.js';
import travelers from '../src/traveler-small-data';
import destinations from '../src/destinations-small-data';
import trips from '../src/trips-small-data';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
//import dayjs from 'dayjs' // ES 2015
const dayjs = require('dayjs')
dayjs().format()

let welcomeMessage = document.querySelector("#headerWelcome");
let allTrips = document.querySelector("#allTripsButton")
let tripsContainer = document.querySelector("#tripsContainer")
let currentTraveler, allTripsPrinted 
let traveler = new Traveler (travelers);
let trip = new Trip (trips, destinations)

window.addEventListener('load', function() {
  console.log("hello")
  generateRandomUser();
  displayWelcomeMessage();
})

allTrips.addEventListener('click', seeAllTrips)

function generateRandomUser() {
  currentTraveler = traveler.findTravelerById(Math.floor(Math.random() * 5));
  // return currentTraveler
};

function displayWelcomeMessage() {
  welcomeMessage.innerText = `Welcome, ${traveler.findTravelerById(currentTraveler.id).name}!`;
};

function seeAllTrips() {
  console.log(trip.filterByTraveler(currentTraveler.id))
  allTripsPrinted = trip.filterByTraveler(currentTraveler.id)
  displayTrips(allTripsPrinted)
}

function displayTrips(tripsData) {
  tripsContainer.innerHTML = "";
  tripsData.forEach(trips => {
    const destination = trip.findDestinationById(trips.destinationID);
    tripsContainer.innerHTML +=
    `<section class="trip-card-template">
    <img class="card-image" alt="${destination.alt}" src="${destination.image}" />
    <section class="trip-details-container">
      <p class="trip trip-name">Going To: ${destination.destination}</p>
      <p class="trip date">Leaving On: ${trips.date}</p>
      <p class="trip number-of-travelers">${trips.travelers} Travelers</p>
      <p class="trip duration">${trips.duration} Days</p>
      <p class="trip status">Status: ${trips.status}</p>
    </section>
    </section>`
  })

}