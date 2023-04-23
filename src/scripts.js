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
let allTripsView = document.querySelector("#allTripsView")
let pastTrips = document.querySelector("#pastTripsButton")
let pastTripsView = document.querySelector("#pastTripsView")
let pendingTripsView = document.querySelector("#pendingTripsView")
let pendingTrips = document.querySelector("#pendingTripsButton")
let totalSpentOnTripsThisYear = document.querySelector("#totalSpentOnTripsThisYear")

// let tripsContainer = document.querySelector("#tripsContainer")


let currentTraveler, allTripsPrinted, pastTripsPrinted, pendingTripsPrinted
let traveler = new Traveler (travelers);
let trip = new Trip (trips, destinations)

window.addEventListener('load', function() {
  console.log("hello")
  generateRandomUser();
  displayWelcomeMessage();
  showTotalSpentThisYear();
})

allTrips.addEventListener('click', seeAllTrips)
pastTrips.addEventListener('click', seePastTrips)
pendingTrips.addEventListener('click', seePendingTrips)

function generateRandomUser() {
  currentTraveler = traveler.findTravelerById(Math.floor(Math.random() * travelers.length));
  // return currentTraveler
};

function displayWelcomeMessage() {
  welcomeMessage.innerText = `Welcome 
  ${traveler.findTravelerById(currentTraveler.id).name}!`;
};

function seeAllTrips() {
  // console.log(trip.filterByTraveler(currentTraveler.id))
  allTripsPrinted = trip.filterByTraveler(currentTraveler.id)
  displayAllTrips(allTripsPrinted)
}

function seePastTrips() {
  console.log(trip.findPastTrips(currentTraveler.id))
  pastTripsPrinted = trip.findPastTrips(currentTraveler.id)
  displayPastTrips(pastTripsPrinted)
}

function seePendingTrips() {
  console.log(trip.findUpcomingTrips(currentTraveler.id))
  pendingTripsPrinted = trip.findUpcomingTrips(currentTraveler.id)
  displayPendingTrips(pendingTripsPrinted)
}

function displayAllTrips(tripsData) {
  allTripsView.innerHTML = "";
  tripsData.forEach(trips => {
    const destination = trip.findDestinationById(trips.destinationID);
    allTripsView.innerHTML +=
    `<section class="trip-card-template">
    <img class="card-image" alt="${destination.alt}" src="${destination.image}" />
    <section class="trip-details-container">
      <p class="trip trip-name">Going To: ${destination.destination}</p>
      <p class="trip date">Date: ${trips.date}</p>
      <p class="trip number-of-travelers">${trips.travelers} Travelers</p>
      <p class="trip duration">${trips.duration} Days</p>
      <p class="trip status">Status: ${trips.status}</p>
    </section>
    </section>`
  });
};

function displayPastTrips(tripsData) {
  pastTripsView.innerHTML = "";
  tripsData.forEach(trips => {
    const destination = trip.findDestinationById(trips.destinationID);
    pastTripsView.innerHTML +=
    `<section class="trip-card-template">
    <img class="card-image" alt="${destination.alt}" src="${destination.image}" />
    <section class="trip-details-container">
      <p class="trip trip-name">Going To: ${destination.destination}</p>
      <p class="trip date">Left On: ${trips.date}</p>
      <p class="trip number-of-travelers">${trips.travelers} Travelers</p>
      <p class="trip duration">${trips.duration} Days</p>
      <p class="trip status">Status: ${trips.status}</p>
    </section>
    </section>`
  });
};

function displayPendingTrips(tripsData) {
  pendingTripsView.innerHTML = "";
  tripsData.forEach(trips => {
    const destination = trip.findDestinationById(trips.destinationID);
    pendingTripsView.innerHTML +=
    `<section class="trip-card-template">
    <img class="card-image" alt="${destination.alt}" src="${destination.image}" />
    <section class="trip-details-container">
      <p class="trip trip-name">Going To: ${destination.destination}</p>
      <p class="trip date">Left On: ${trips.date}</p>
      <p class="trip number-of-travelers">${trips.travelers} Travelers</p>
      <p class="trip duration">${trips.duration} Days</p>
      <p class="trip status">Status: ${trips.status}</p>
    </section>
    </section>`
  });
}

function showTotalSpentThisYear() {
  totalSpentOnTripsThisYear.innerText = `Total Spent on Trips This Year: $${trip.calculateTotalCostPerYear(currentTraveler.id)}`
}