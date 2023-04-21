// import travelers from './traveler-small-data.js';
// import destinations from '../src/destinations-small-data.js'
// import * as dayjs from "dayjs";
const dayjs = require('dayjs');

class Trip {
  constructor(allTripData, destinationData) {
    this.tripData = allTripData;
    this.destinationData = destinationData;
  }

  filterByTraveler(id) {
    return this.tripData.filter(trip => trip.userID === id)
  };

  filterTripsByStatus(status, id) {
    return this.filterByTraveler(id).filter(trip => trip.status === status)
  };

  findUpcomingTrips(id) {
    const today = dayjs("2022/09/30");
    return this.filterByTraveler(id).filter(trip => {
      let dateA = dayjs(trip.date);
      return dateA.isAfter(today);
    });
  };

  findPastTrips(id) {
    const today = dayjs("2022/09/30");
    return this.filterByTraveler(id).filter(trip => {
    let dateA = dayjs(trip.date);
    return dateA.isBefore(today);
  });
}; 
 
  findDestinationByName(name) {
    const foundDestination = this.destinationData.find(destination => destination.destination === name)
    if (!foundDestination) {
      return "Destination not found."
    }
    return foundDestination
  };

  findDestinationById(tripId) {
    return this.destinationData.find(destination => destination.id === tripId)
  };

  calculateTotalCostPerYear(travelerId) {
    const travelerTrips = this.filterByTraveler(travelerId);
    const tripsThisYear = travelerTrips.filter(trip => {
      const splitDate = trip.date.split("/");
      const year = splitDate[0];
      return year === "2020";
    })
    const thisYearsDestination = tripsThisYear.map(trip => trip.destinationID).reduce((acc, cv) => {
      this.destinationData.forEach(destination => {
        if (destination.id === cv) {
          acc.push(destination)
        }
      })
      return acc
    }, []);
    const thisYearsCost = tripsThisYear.reduce((acc, cv) => {
      acc += (cv.travelers * cv.
      return acc
    }, 0)
    console.log(tripsThisYear)
    console.log(thisYearsDestination)
  }
};



export default Trip;