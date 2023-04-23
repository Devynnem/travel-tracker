const destinations = [
  {
    "id": 1,
    "destination": "Lima, Peru",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 400,
    "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    "alt": "overview of city buildings with a clear sky"
  },
  {
    "id": 2,
    "destination": "Stockholm, Sweden",
    "estimatedLodgingCostPerDay": 100,
    "estimatedFlightCostPerPerson": 780,
    "image": "https://images.unsplash.com/photo-1560089168-6516081f5bf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "city with boats on the water during the day time"
  },
  {
    "id": 3,
    "destination": "Sydney, Austrailia",
    "estimatedLodgingCostPerDay": 130,
    "estimatedFlightCostPerPerson": 950,
    "image": "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "opera house and city buildings on the water with boats"
  },
  {
    "id": 4,
    "destination": "Cartagena, Colombia",
    "estimatedLodgingCostPerDay": 65,
    "estimatedFlightCostPerPerson": 350,
    "image": "https://images.unsplash.com/photo-1558029697-a7ed1a4b94c0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80",
    "alt": "boats at a dock during the day time"
  },
  {
    "id": 5,
    "destination": "Madrid, Spain",
    "estimatedLodgingCostPerDay": 150,
    "estimatedFlightCostPerPerson": 650,
    "image": "https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "city with clear skys and a road in the day time"
  },
  {
    "id": 28,
    "destination": "San Juan, Puerto Rico",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 900,
    "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
    "alt": "white and brown concrete buildings near sea under white clouds during daytime"
  },
  {
    "id": 10,
    "destination": "Toronto, Canada",
    "estimatedLodgingCostPerDay": 90,
    "estimatedFlightCostPerPerson": 450,
    "image": "https://images.unsplash.com/photo-1535776142635-8fa180c46af7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2756&q=80"
  },
  {
    "id": 6,
    "destination": "Jakarta, Indonesia",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 890,
    "image": "https://images.unsplash.com/photo-1555333145-4acf190da336?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "lit up city at night"
  },
  {
    "id": 7,
    "destination": "Paris, France",
    "estimatedLodgingCostPerDay": 100,
    "estimatedFlightCostPerPerson": 395,
    "image": "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    "alt": "city during the day time with eiffel tower"
  },
  {
    "id": 44,
    "destination": "Caye Caulker, Belize",
    "estimatedLodgingCostPerDay": 450,
    "estimatedFlightCostPerPerson": 80,
    "image": "https://images.unsplash.com/photo-1544525977-0a3bca9e560d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    "alt": "boat on dock during daytime"
  },
  {
    "id": 22,
    "destination": "Rome, Italy",
    "estimatedLodgingCostPerDay": 90,
    "estimatedFlightCostPerPerson": 650,
    "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "people standing inside a colosseum during the day"
    },
    {
      "id": 49,
      "destination": "Castries, St Lucia",
      "estimatedLodgingCostPerDay": 650,
      "estimatedFlightCostPerPerson": 90,
      "image": "https://images.unsplash.com/photo-1524478075552-c2763ea171b8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80",
      "alt": "aerial photography of rocky mountain under cloudy sky"
      },
      {
        "id": 16,
        "destination": "Bangkok, Thailand",
        "estimatedLodgingCostPerDay": 35,
        "estimatedFlightCostPerPerson": 988,
        "image": "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
        "alt": "ornate buildings with a garden during the day"
        },
];

export default destinations;