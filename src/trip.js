// import travelers from './traveler-small-data.js';
// import destinations from '../src/destinations-small-data.js'
import * as dayjs from "dayjs";

class Trip {
  constructor(allTripData, destinationData) {
    this.tripData = allTripData;
    this.destinationData = destinationData;
  };

  filterByTraveler(id) {
    return this.tripData.filter(trip => trip.userID === id)
  };

  filterTripsByStatus(status, id) {
    return this.filterByTraveler(id).filter(trip => trip.status === status)
  }
};



export default Trip;