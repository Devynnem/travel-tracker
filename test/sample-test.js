import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler.js';
import travelers from '../src/traveler-small-data.js';

describe('Traveler', function() {
  let traveler;
  // let travelerData
  beforeEach(() => {
    // travelerData = travelers;
    traveler = new Traveler(travelers);
  });

  it('should be a function', function() {
    expect(Traveler).to.be.a('function');
  });

  it('should be an instance of activity', function() {
    expect(traveler).to.be.an.instanceof(Traveler);
  }); 

  it('should hold all traveler data', function() {
    expect(traveler.allTavelerData).to.deep.equal(travelers);
  });

  it('should find the traveler by id', function() {
    const a = {
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer"
    };
    expect(traveler.findTravelerById(1)).to.deep.equal(a);
  });

  it('should return a message if no such user found', function() {
    expect(traveler.findTravelerById(91)).to.equal("No such user found.");
  });
});