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
};



export default Trip;