import './css/styles.css';
import { travelerDataFetch } from './apiCalls';
import Traveler from '../src/Traveler.js';
import Trip from './Trip.js';
import './images/travel-logos.png';
const dayjs = require('dayjs');
dayjs().format();

//quereySelectors
let welcomeMessage = document.querySelector("#headerWelcome");
let allTrips = document.querySelector("#allTripsButton");
let allTripsView = document.querySelector("#allTripsView");
let pastTrips = document.querySelector("#pastTripsButton");
let pastTripsView = document.querySelector("#pastTripsView");
let pendingTripsView = document.querySelector("#pendingTripsView");
let pendingTrips = document.querySelector("#pendingTripsButton");
let totalSpentOnTripsThisYear = document.querySelector("#totalSpentOnTripsThisYear");
let calendar =document.querySelector("#calendar");
let form = document.querySelector("#travelerRequests");
let requestTripEstimatedCost = document.querySelector("#requestTripEstimatedCost");
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

//globalVariables
let currentTraveler, allTripsPrinted, pastTripsPrinted, traveler, trip, currentTravelerId, pendingTripsData;

let date = new Date();
let year = date.getFullYear();
let month = (date.getMonth() + 1).toString().padStart(2, '0');
let day = date.getDate().toString().padStart(2, '0');
let beginningOfDate = `${month}-${day}-${year}`;
let currentDate = date.getFullYear() + "/" + ("0" + (date.getMonth()+1)).slice(-2) + "/"+ ("0" + date.getDate()).slice(-2);

//eventListeners
loginButton.addEventListener('click', function() {
  logInTraveler();
});
allTrips.addEventListener('click', function() {
  displayAllTrips(allTripsPrinted);
});
pastTrips.addEventListener('click', function() {
  displayPastTrips(pastTripsPrinted);
});
pendingTrips.addEventListener('click', function() {
  displayPendingTrips(pendingTripsData);
});
requestTripEstimatedCost.addEventListener('click',showTripCost);


Promise.all([travelerDataFetch('travelers'), travelerDataFetch('trips'), travelerDataFetch('destinations')])
.then(data => {
  traveler = new Traveler (data[0].travelers);
  trip = new Trip (data[1].trips, data[2].destinations)
})
.catch((err) => {
  loginErrorMessage.classList.remove("hidden");
  loginErrorMessage.innerText = "Sorry, failed to load. Please try again later.";
  loginButton.disabled = true;
});

//functions
function logInTraveler() {
  const travelerUsername = usernameInput.value.slice(0, 8);
  const longerId = usernameInput.value.slice(8);
  if (travelerUsername === "traveler" && Number(longerId) <= 50 && passwordInput.value === "travel") {
    currentTraveler = traveler.findTravelerById(Number(longerId));
    currentTravelerId = currentTraveler.id;
    allTripsPrinted = trip.filterByTraveler(currentTravelerId);
    pastTripsPrinted = trip.findPastTrips(currentTravelerId);
    pendingTripsData = trip.filterTripsByStatus("pending", currentTravelerId);
    unHideInputs.removeAttribute('hidden');
    loginForm.reset();
    loginError.innerText = "";
    loginForm.style.display = "none"
  } else if (traveler !== "traveler" || password.value !== "travel") {
    loginError.removeAttribute('hidden');
    loginForm.reset();
  } ;
  displayTravelerInfo();
};


function displayTravelerInfo() {
  displayWelcomeMessage();
  showTotalSpentThisYear();
  displayCalendar();
  showTodaysDate();
};

function showTodaysDate() {
  todaysDate.innerText = `Today's date is ${beginningOfDate}`;
};

function displayCalendar() {
  calendar.innerHTML = `<input id="dateInput" type="date" min="${currentDate.split('/').join('-')}" name="date" placeholder="yyyy/mm/dd" required>`;
};

function displayWelcomeMessage() {
  welcomeMessage.innerText = `Welcome 
  ${traveler.findTravelerById(currentTravelerId).name}!`;
};

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
  totalSpentOnTripsThisYear.innerText = `Total Spent on Trips This Year: $${trip.calculateTotalCostPerYear(currentTravelerId)}`;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const destinationId = trip.destinationData.find(destination => destination.destination === destinationInput.value);
  const data = {
    "id": trip.tripData.length + 1, 
    "userID": currentTravelerId, 
    "destinationID": destinationId.id,
    "date": document.getElementById('dateInput').value.split('-').join('/'), 
    "travelers": numberOfTravelers.value,
    "duration": duration.value,
    "status": "pending",
    "suggestedActivities": [], 
    };
    fetch('http://localhost:3001/api/v1/trips', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(data => data.json())
  .then(json => { 
    Promise.all([travelerDataFetch('travelers'), travelerDataFetch('trips'), travelerDataFetch('destinations')])
  .then(data => {
  traveler = new Traveler (data[0].travelers);
  trip = new Trip (data[1].trips, data[2].destinations);
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
  event.target.reset();
  });

  function displayNewTripEntry(destinationId) {
  newEntry.innerText = `Your trip request for ${destinationId.destination} is pending!`;
};

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
};

function showTripCost() {
  event.preventDefault();
  const destinationId = trip.destinationData.find(destination => destination.destination === destinationInput.value);
  const data = {
    "userID": currentTraveler, 
    "destinationID": destinationId.id,
    "date": document.getElementById('dateInput').value.split('-').join('/'), 
    "travelers": numberOfTravelers.value,
    "duration": duration.value,
    };
  const total = (((destinationId.estimatedFlightCostPerPerson * data.travelers) + (destinationId.estimatedLodgingCostPerDay * data.duration)) * 1.1).toFixed(0);
  newCostNewTrip.innerText = `Estimated cost for this trip is $${total}`;
};