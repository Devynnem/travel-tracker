import travelers from './traveler-small-data.js';

class Traveler {
  constructor(allTavelerData) {
    this.allTavelerData = allTavelerData;
  };
  
  findTravelerById(id) {
    const traveler = this.allTavelerData.find(traveler => traveler.id === id)
    if (!traveler) {
      return "No such user found."
    }
    return traveler
  };
};






export default Traveler;
