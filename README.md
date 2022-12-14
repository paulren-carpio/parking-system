# parking-system
Paking System Coding Challenge:
```You were hired by XYZ Corp. to implement a parking allocation system for their new malling complex, the Object-Oriented Mall.

The new parking system will pre-assign a slot for every vehicle coming into the complex. No vehicle can freely choose a parking slot and no vehicle is reserved or assigned a slot until they arrive at the entry point of the complex. The system must assign a parking slot the satisfies the following constraints:

1. There are initially three (3) entry points, and can be no less than three (3), leading into the parking complex. A vehicle   must be assigned a possible and available slot closest to the parking entrance. The mall can decide to add new entrances later.

2. There are three types of vehicles: small (S), medium (M) and large (L),
  and there are three types or parking slots: small (SP), medium (MP) and large (LP).

  (a) S vehicles can park in SP, MP and LP parking spaces;
  (b) M vehicles can park in MP and LP parking spaces; and
  (c) L vehicles can park only in LP parking spaces.

3. Your parking system must also handle the calculation of fees, and must meet the following pricing structure:

  (a) All types of car pay the flat rate of 40 pesos for the first three (3) hours;
  (b) The exceeding hourly rate beyond the initial three (3) hours will be charged as follows:

      - 20/hour for vehicles parked in SP;
      - 60/hour for vehicles parked in MP; and
      - 100/hour for vehicles parked in LP

      Take note that exceeding hours are charged depending on parking slot size regardless of vehicle size.

      For parking that exceeds 24 hours, every full 24 hour chunk is charged 5,000 pesos regardless of parking slot.
      The remainder hours are charged using the method explained in (b).

      Parking fees are calculated using rounding up method, e.g. 6.5 hours must be rounded to 7.

  (c) A vehicle leaving the parking complex and returning within one hour must be charged continuous rate,
      i.e. the vehicle must be considered as if it did not leave. Otherwise, rates must be implemented as described.

You are free to design the system in any pattern you wish. However, take note that the system assumes the input of the following:

  (a) The number of entry points to the parking complex, but no less than three (3). Assume that the entry points
      are also exit points, so no need to take into account the number of possible exit points.

  (b) The map of the parking slot. You are welcome to introduce a design that suits your approach. One suggested
      method, however, is to accept a list of tuples corresponding to the distance of each slot from every entry
      point. For example, if your parking system has three (3) entry points. The list of parking spaces may be
      the following: [(1,4,5), (3,2,3), ...], where the integer entry per tuple corresponds the distance unit
      from every parking entry points (A, B, C).

  (c) The sizes of every corresponding parking slot. Again, you are welcome to introduce your own design. We suggest using
      a list of corresponding sizes described in integers: [0, 2, 1, 1, ...] where 0, 1, 2 means small, medium and large
      in that order. Another useful design may be a dictionary of parking sizes with corresponding slots as values.

  (d) Two functions to park a vehicle and unpark it. The functions must consider the attributes of the vehicle as described above.
      When the unpark function is called, it must also return how much the vehicle concerned is charged.

Please develop in Node JS/Typescript. You will be required to explain your approach during the interview. Have fun!
```


## Pre-requisites
- Install [Node.js](https://nodejs.org/en/)
- MySQL


## Installation

- Clone the repository

``git clone https://github.com/paulren-carpio/parking-system.git``


- Install dependencies

```
cd parking-system
npm install
```

## Getting started

1. Create database and table
```
create database parking;

create table parking.parking_space (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`slot_number` int(11) NOT NULL,
	`max_allowed_size` char(2) NOT NULL,
	`is_available` tinyint(1) NOT NULL DEFAULT 1,
	`vehicle_size` char(1),
	`creation_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`update_date` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (`id`)
);
```

2. Run seeder to generate records to the table.
```
npm run seed:run
```

## Running the project

Build and run the project
```
npm run start
```


Using API Tester like Insomnia add the following APIs to test the app:

1. Park a vehicle - `PUT http://localhost:5000/parking-system/parking/1`
Paremeters e.g:

```
[
	{
		"vehicleSize" : "L",
		"gate" : "B"
	}
]
```

2. Unpark a vehicle  - `PUT http://localhost:5000/parking-system/parking/0`
Paremeters e.g:
```
[
	{
		"totalHours" : 23,
		"slotNumber" : 13
	}
]
```

3. To view parking map - `GET http://localhost:5000/parking-system/parking`

