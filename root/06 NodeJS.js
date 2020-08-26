// Moment:
// Define Date
const date = new Date(2020, 1, 1);
console.log('date: ', date);
// Add days
date.setDate(date.getDate() + 32);
console.log('date: ', date);
// How to transmit?
console.log('date: ', date.getTime());
console.log('date: ', date.toISOString()); // This one!
// 
const Moment = require('moment');
const MomentRange = require('moment-range');

const moment = MomentRange.extendMoment(Moment);

// This use has 2 meetings in the day:
const doctor = [
    moment.range(new Date(2020, 1, 1, 10, 0), new Date(2020, 1, 1, 10, 30)),
    moment.range(new Date(2020, 1, 1, 10, 15), new Date(2020, 1, 1, 10, 45)),
    moment.range(new Date(2020, 1, 1, 12, 0), new Date(2020, 1, 1, 12, 30)),
];

let availability = [moment.range(new Date(2020, 1, 1), new Date(2020, 1, 2))];
doctor.forEach(d => availability = availability.map(a => a.subtract(d)).flat());
console.log('availability: ', availability);

