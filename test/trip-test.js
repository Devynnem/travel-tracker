import chai from 'chai';
const expect = chai.expect;
// import Traveler from '../src/Traveler.js';
// import travelers from '../src/traveler-small-data.js';
import Trip from '../src/Trip.js'
import destinations from '../src/destinations-small-data.js';
import trips from '../src/trips-small-data.js'

describe('Trip', function() {
  let trip;
  let traveler;
  let tripData;
  let destinationData;

  // let travelerData
  beforeEach(() => {
    // travelerData = travelers;
    traveler = {
        "id": 2,
        "name": "Rachael Vaughten",
        "travelerType": "thrill-seeker"
        },
    tripData = trips;
    destinationData = destinations;
    trip = new Trip(tripData, destinationData);
  });

  it('should be a function', function() {
    expect(Trip).to.be.a('function');
  });

  it('should be an instance of activity', function() {
    expect(trip).to.be.an.instanceof(Trip);
  }); 

  it('should hold all trip data', function() {
    expect(trip.tripData).to.deep.equal(tripData);
  });

  it('should hold all destination data', function() {
    expect(trip.destinationData).to.deep.equal(destinationData);
  });

  it('should find all trips for a traveler by their id', function() {
    const a = [
      {      
        "id": 89,
        "userID": 2,
        "destinationID": 10,
        "travelers": 5,
        "date": "2019/09/27",
        "duration": 13,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 100,
        "userID": 2,
        "destinationID": 6,
        "travelers": 6,
        "date": "2020/3/28",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
      },
    ];
    expect(trip.filterByTraveler(2)).to.deep.equal(a);
  });

  it('should filter a travelers trip by status', function() {
    const a = [
      {      
        "id": 89,
        "userID": 2,
        "destinationID": 10,
        "travelers": 5,
        "date": "2019/09/27",
        "duration": 13,
        "status": "approved",
        "suggestedActivities": []
      },
      {
        "id": 100,
        "userID": 2,
        "destinationID": 6,
        "travelers": 6,
        "date": "2020/3/28",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": []
      },
    ];
    const b = [
      {
        "id": 71,
        "userID": 38,
        "destinationID": 28,
        "travelers": 1,
        "date": "2020/05/26",
        "duration": 11,
        "status": "pending",
        "suggestedActivities": [],
      },
    ];
    expect(trip.filterTripsByStatus("approved", 2)).to.deep.equal(a);
    expect(trip.filterTripsByStatus("pending", 38)).to.deep.equal(b);
  });

  it('should be able to find upcoming trips for a user', function() {
    const a = [
      {
        "id": 2,
        "userID": 35,
        "destinationID": 25,
        "travelers": 5,
        "date": "2022/10/04",
        "duration": 18,
        "status": "approved",
        "suggestedActivities": []
        },
    ];
 
    expect(trip.findUpcomingTrips(35)).to.deep.equal(a);
  });

  it('should be able to find past trips for a user', function() {
    const a = [
      {
        "id": 1,
        "userID": 44,
        "destinationID": 49,
        "travelers": 1,
        "date": "2022/09/16",
        "duration": 8,
        "status": "approved",
        "suggestedActivities": []
        },
    ];
 
    expect(trip.findPastTrips(44)).to.deep.equal(a);
  });

  it('should find a destination by name', function() {
    expect(trip.findDestinationByName("Lima, Peru")).to.deep.equal(destinationData[0]);
    expect(trip.findDestinationByName("Denver, CO")).to.deep.equal("Destination not found.");
  });

  it('should find destination by id', function() {
    const a = 
      {
        "id": 6,
        "destination": "Jakarta, Indonesia",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 890,
        "image": "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "lit up city at night"
      };
    expect(trip.findDestinationById(6)).to.deep.equal(a);
  });

  it('should calculate the cost of all trips for this year', function() {
    expect(trip.calculateTotalCostPerYear(2)).to.equal(6040);
  });


  // it('should return a message if no such user found', function() {
  //   expect(traveler.findTravelerById(91)).to.equal("No such user found.");
  // });
});