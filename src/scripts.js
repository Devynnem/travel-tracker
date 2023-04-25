// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
import { travelerDataFetch } from './apiCalls';
import Traveler from '../src/Traveler.js';
import Trip from '../src/Trip.js';
// import travelers from '../src/traveler-small-data';
// import destinations from '../src/destinations-small-data';
// import trips from '../src/trips-small-data';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/travel-logos.png'
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
let calendar =document.querySelector("#calendar")
let form = document.querySelector("#travelerRequests");
let requestTripEstimatedCost = document.querySelector("#requestTripEstimatedCost")
let destinationInput = document.querySelector("#destinationInput");
let numberOfTravelers = document.querySelector("#numberOfTravelers");
let duration = document.querySelector("#numberOfDays");
let newEntry = document.querySelector("#newEntry");
let newCostNewTrip = document.querySelector("#newCostNewTrip");
let todaysDate = document.querySelector("#todaysDate");
let loginButton = document.querySelector("#loginButton");
let usernameInput = document.querySelector("#usernameInput");
let passwordInput = document.querySelector("#passwordInput");
let unHideInputs = document.querySelector(".main-page");
let loginForm = document.querySelector("#loginForm");
let loginError = document.querySelector("#loginError");
let loginPage = document.querySelector(".login-page")
// let tripsContainer = document.querySelector("#tripsContainer")


let currentTraveler, allTripsPrinted, pastTripsPrinted, pendingTripsPrinted, traveler, trip, currentTravelerId, longestId, longerId, travelerUsername, allTripsForTraveler, pastTripsData, pendingTripsData

let date = new Date();
let year = date.getFullYear();
let month = (date.getMonth() + 1).toString().padStart(2, '0');
let day = date.getDate().toString().padStart(2, '0');
let beginningOfDate = `${month}-${day}-${year}`;
console.log(beginningOfDate);
let currentDate = date.getFullYear() + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/"+ ("0" + date.getDate()).slice(-2);
// let destinationID = trip

// console.log(destinationID)
// let traveler = new Traveler (travelers);
// let trip = new Trip (trips, destinations)



loginButton.addEventListener('click', function() {
  logInTraveler();
  // displayTravelerInfo()
})


// window.addEventListener('load', function() {
//   Promise.all([travelerDataFetch('travelers'), travelerDataFetch('trips'), travelerDataFetch('destinations')])
//   .then(data => {
//     traveler = new Traveler (data[0].travelers);
//     trip = new Trip (data[1].trips, data[2].destinations)
//     console.log(trip)
//     // displayTravelerInfo()
//   })
// })


allTrips.addEventListener('click', function() {
  displayAllTrips(allTripsPrinted)
})
pastTrips.addEventListener('click', function() {
  displayPastTrips(pastTripsPrinted)
})

pendingTrips.addEventListener('click', function() {
  displayPendingTrips(pendingTripsData)
})
requestTripEstimatedCost.addEventListener('click',showTripCost)

Promise.all([travelerDataFetch('travelers'), travelerDataFetch('trips'), travelerDataFetch('destinations')])
.then(data => {
  traveler = new Traveler (data[0].travelers);
  trip = new Trip (data[1].trips, data[2].destinations)
  console.log(trip)
})
.catch((err) => {
  loginErrorMessage.classList.remove("hidden");
  loginErrorMessage.innerText = "Sorry, failed to load. Please try again later.";
  loginButton.disabled = true;

});


function logInTraveler() {
  const travelerUsername = usernameInput.value.slice(0, 8);
  const longerId = usernameInput.value.slice(8);
  if (travelerUsername === "traveler" && Number(longerId) <= 50 && passwordInput.value === "travel") {
    // unHideImg.removeAttribute('hidden');
    currentTraveler = traveler.findTravelerById(Number(longerId));
    console.log(currentTraveler)
    currentTravelerId = currentTraveler.id;
    allTripsPrinted = trip.filterByTraveler(currentTravelerId)
    pastTripsPrinted = trip.findPastTrips(currentTravelerId)
    // upcomingTripsData = trip.findUpcomingTrips(currentTravelerId);
    pendingTripsData = trip.filterTripsByStatus("pending", currentTravelerId);
    unHideInputs.removeAttribute('hidden');
    loginForm.reset();
    loginError.innerText = "";
  } else if (traveler !== "traveler" || password.value !== "travel") {
    loginError.removeAttribute('hidden')
    loginForm.reset()
  }
  loginPage.classList.add('hidden')
  displayWelcomeMessage();
  showTotalSpentThisYear();
  displayCalendar();
  showTodaysDate()
}


function displayTravelerInfo() {
  // generateRandomUser();
  // currentTraveler = traveler.findTravelerById(Number(longerId));
  // currentTravelerId = currentTraveler.id;
  displayWelcomeMessage();
  showTotalSpentThisYear();
  displayCalendar();
  showTodaysDate()
}
function showTodaysDate() {
  console.log(date)
  todaysDate.innerText = `Today's date is ${beginningOfDate}`
}

function displayCalendar() {
  calendar.innerHTML = `<input id="dateInput" type="date" min="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
  // calendar2.innerHTML = `<input id="dateInput2" type="date" max="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
};
// function generateRandomUser() {
//   // console.log(traveler.findTravelerById(1))
//   // console.log(traveler.findTravelerById(Math.floor(Math.random() * traveler.length)))
//   currentTraveler = traveler.findTravelerById(Math.floor(Math.random() * 50));
//   // return currentTraveler
// };

function displayWelcomeMessage() {
  welcomeMessage.innerText = `Welcome 
  ${traveler.findTravelerById(currentTravelerId).name}!`;
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

// function seePendingTrips() {
//   console.log(trip.findUpcomingTrips(currentTraveler.id))
//   pendingTripsPrinted = trip.findUpcomingTrips(currentTraveler.id)
//   displayPendingTrips(pendingTripsPrinted)
// }

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
      <p class="trip date">Date: ${trips.date}</p>
      <p class="trip number-of-travelers">${trips.travelers} Travelers</p>
      <p class="trip duration">${trips.duration} Days</p>
      <p class="trip status">Status: ${trips.status}</p>
    </section>
    </section>`
  });
};



function showTotalSpentThisYear() {
  // currentTraveler = traveler.findTravelerById(Number(longerId));
  // console.log(currentTraveler)
  // currentTravelerId = currentTraveler.id;
  totalSpentOnTripsThisYear.innerText = `Total Spent on Trips This Year: $${trip.calculateTotalCostPerYear(currentTravelerId)}`
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const destinationId = trip.destinationData.find(destination => destination.destination === destinationInput.value);
  // const maxId = Math.max(...trip.tripData.map(trip => trip.id))
  console.log(trip.tripData.length)
  const data = {
    "id": trip.tripData.length + 1, 
    "userID": currentTravelerId, 
    "destinationID": destinationId.id,
    "date": document.getElementById('dateInput').value.split('-').join('/'), 
    "travelers": numberOfTravelers.value,
    "duration": duration.value,
    "status": "pending",
    "suggestedActivities": [], 
    }
    console.log(data.id)
    fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(data => data.json())
  .then(json => { 
    console.log(json)
    Promise.all([travelerDataFetch('travelers'), travelerDataFetch('trips'), travelerDataFetch('destinations')])
  .then(data => {
  traveler = new Traveler (data[0].travelers);
  trip = new Trip (data[1].trips, data[2].destinations)
  console.log(trip)
})
.catch((err) => {
  loginErrorMessage.classList.remove("hidden");
  loginErrorMessage.innerText = "Sorry, failed to load. Please try again later.";
  loginButton.disabled = true;

});
  })
  .catch(err => console.log(`Error at: ${err}`));

  displayNewTripEntry(destinationId);
  displayNewPendingTrips(data, destinationId);
  // showTripCost(data, destinationId);
  event.target.reset();
  });

  function displayNewTripEntry(destinationId) {
  newEntry.innerText = `Your trip request for ${destinationId.destination} is pending!`;
}
function displayNewPendingTrips(data, destinationId) {
  pendingTripsView.innerHTML +=
    `<section class="trip-card-template">
    <img class="card-image" alt="${destinationId.alt}" src="${destinationId.image}" />
    <section class="trip-details-container">
      <p class="trip trip-name">Going To: ${destinationId.destination}</p>
      <p class="trip date">Leaving On: ${data.date}</p>
      <p class="trip number-of-travelers">${data.travelers} Travelers</p>
      <p class="trip duration">${data.duration} Days</p>
      <p class="trip status">Status: ${data.status}</p>
    </section>
    </section>`;
}

function showTripCost() {
  event.preventDefault();
  const destinationId = trip.destinationData.find(destination => destination.destination === destinationInput.value);
  const data = {
    // "id": trip.tripData.length += 1, 
    "userID": currentTraveler, 
    "destinationID": destinationId.id,
    "date": document.getElementById('dateInput').value.split('-').join('/'), 
    "travelers": numberOfTravelers.value,
    "duration": duration.value,
    // "status": "pending",
    // "suggestedActivities": [], 
    }
  const total = (((destinationId.estimatedFlightCostPerPerson * data.travelers) + (destinationId.estimatedLodgingCostPerDay * data.duration)) * 1.1).toFixed(0)
  console.log(destinationId.estimatedFlightCostPerPerson * data.travelers)
  console.log(destinationId.estimatedLodgingCostPerDay * data.duration)
  console.log( 300 * 1.1)
  newCostNewTrip.innerText = `Estimated cost for this trip is $${total}`
}