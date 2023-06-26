import { map, reduce } from 'lodash';

function calculateRadius(mass) {
  return Math.sqrt(mass / Math.PI);
}

/**
 * Updates every object according to all of the forces
 * acting upon them
 */
function updateObjects(objects) {
  const forces = calculateForces(objects);
  for (let i = 0; i < objects.length; i++) {
    let force = multipleVectorOperation(forces[i], add); // Add all force vectors together
    let acc = scalarOperation1(objects[i].mass, force, div);
    let timeDiff = (Date.now() - objects[i].lastTimeUpdated) / SLOW_DOWN;
    let timeArray = initialiseArray(objects[i].velocity.length, timeDiff);
    let newVel = vectorOperation(timeArray, acc, mult);
    objects[i].velocity = vectorOperation(objects[i].velocity, newVel, add);
    let distTravelled = vectorOperation(timeArray, objects[i].velocity, mult);
    objects[i].coord = vectorOperation(distTravelled, objects[i].coord, add);
    objects[i].lastTimeUpdated = Date.now();
  }
  // checkForCollisions(objects);

  return forces;
}

/**
 * Checks if 2 objects have collided. If they have,
 * it merges them.
//  */
// function checkForCollisions(objects) {
//   for (let i = 0; i < objects.length; i++) {
//     for (let j = 0; j < objects.length; j++) {
//       if (i >= j) {
//         continue;
//       }
//       if (detectCollision(objects[i], objects[j])) {
//         objects[i].mass += objects[j].mass;
//         objects[i].radius = calculateRadius(objects[i].mass);

//         const relativeVelocityJ = (objects[j].mass * 1.0) / objects[i].mass;
//         const relativeVelocityI = 1.0 - relativeVelocityJ;

//         objects[i].velocity = scalarOperation(
//           relativeVelocityI,
//           objects[i].velocity,
//           mult
//         );
//         let velocityJ = scalarOperation(
//           relativeVelocityJ,
//           objects[j].velocity,
//           mult
//         );
//         objects[i].velocity = vectorOperation(
//           objects[i].velocity,
//           velocityJ,
//           add
//         );
//         objects.splice(j, 1);
//         j--;
//       }
//     }
//   }
// }

// function detectCollision(obj1, obj2) {
//   let subVec = vectorOperation(obj1.coord, obj2.coord, sub);
//   let distance = getDistance(subVec);
//   return distance < (obj1.radius + obj2.radius) * 0.5;
// }

function calculateForces(objects) {
  let result = initialise2DArray(objects.length);
  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects.length; j++) {
      if (i == j) {
        result[i][j] = initialiseArray(objects[i].force.length, 0);
      } else if (result[i][j] !== undefined) {
        continue;
      } else {
        result[j][i] = calculateForce(objects[i], objects[j]);
        result[i][j] = map(result[j][i], x => -x);
      }
    }
  }
  return result;
}

/**
 * Calculates the gravity force between 2 objects
 * @return {Array}      [Array with force]
 */
function calculateForce(obj1, obj2) {
  let subVec = vectorOperation(obj1.coord, obj2.coord, sub);
  let distance = getDistance(subVec);
  let norVec =
    distance === 0
      ? initialiseArray(subVec.length, 0)
      : getNormalisedVector(subVec, distance);
  let force =
    distance === 0 ? 0 : (G * obj1.mass * obj2.mass) / (distance * distance);
  return map(norVec, x => x * force);
}

function getDistance(v) {
  let result = 0;
  for (let i = 0; i < v.length; i++) {
    result += v[i] * v[i];
  }
  return Math.sqrt(result);
}

/**
 * Get the normalised vector (unit length 1)
 */
function getNormalisedVector(subVec, dist) {
  return map(subVec, x => (x * 1.0) / dist);
}

/**
 * Takes an array of vectors and adds them together
 */
function multipleVectorOperation(vectors, op) {
  return reduce(vectors, (sum, x) => vectorOperation(sum, x, op));
}

/**
 * Takes 2 vectors (arrays) and returns another
 * vector which is the result of op(v1, v2)
 */
function vectorOperation(v1, v2, op) {
  let minLength = Math.min(v1.length, v2.length);
  let newV = [];
  for (let i = 0; i < minLength; i++) {
    newV.push(op(v1[i] * 1.0, v2[i]));
  }
  return newV;
}

function scalarOperation(scalar, v, op) {
  return map(v, x => op(scalar, x));
}

function scalarOperation1(scalar, v, op) {
  return map(v, x => op(x, scalar));
}

/**
 * Initialises an array of length n with value as every entry
 */
function initialiseArray(length, value) {
  return map(new Array(length), x => value);
}

function initialise2DArray(length) {
  let result = [];
  for (let i = 0; i < length; i++) {
    result.push(new Array(length));
  }
  return result;
}

function sub(x, y) {
  return x - y;
}

function add(x, y) {
  return x + y;
}

function mult(x, y) {
  return x * y;
}

function div(x, y) {
  return y === 0 ? 0 : x / y;
}

const OPACITY = 0.7;
const MAX = 0.01;

var MAX_COORD;
var G;
var SLOW_DOWN;
var context;

var requestAnimationFrame = window.requestAnimationFrame;

const INITIAL_OBJECTS = [
  {
    mass: 10,
    radius: calculateRadius(10),
    velocity: [0, 0],
    force: [0, 0],
    coord: [400, 200],
    lastTimeUpdated: Date.now(),
  },
  {
    mass: 27,
    radius: calculateRadius(27),
    velocity: [0.0, 0.0],
    force: [0, 0],
    coord: [350, 410],
    lastTimeUpdated: Date.now(),
  },
  {
    mass: 30,
    radius: calculateRadius(30),
    velocity: [0.0, 0.0],
    force: [0, 0],
    coord: [150, 200],
    lastTimeUpdated: Date.now(),
  },
];

function startSimulation(canvas, size = [600, 450], g = 0.4, slowDown = 6.0) {
  context = canvas.getContext('2d');

  MAX_COORD = size;
  G = g;
  SLOW_DOWN = slowDown;

  setCanvasSize(canvas);
  let objects = INITIAL_OBJECTS;

  draw(objects);
}

function setCanvasSize(canvas) {
  canvas.setAttribute('width', MAX_COORD[0]);
  canvas.setAttribute('height', MAX_COORD[1]);
}

function draw(objects) {
  context.clearRect(0, 0, MAX_COORD[0], MAX_COORD[1]);

  let forces = updateObjects(objects);

  drawCircles(objects);
  drawLines(objects, forces);
  requestAnimationFrame(() => draw(objects));
}

function drawCircles(objects) {
  objects.forEach(object => {
    context.beginPath();
    context.arc(
      object.coord[0],
      object.coord[1],
      object.radius,
      0,
      2 * Math.PI,
      false
    );
    if (object.mass > 20.0) {
      context.fillStyle = 'rgb(0, 0, 0)';
    } else {
      context.fillStyle = 'rgba(0, 0, 0,' + OPACITY + ')';
    }
    context.fill();
    context.lineWidth = 0;
  });
}

function drawLines(objects, forces) {
  getMagnitudeForce(objects, forces);
  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects.length; j++) {
      if (i >= j) {
        continue;
      }
      if (forces[i][j] >= MAX)
        context.strokeStyle = 'rgba(0, 0, 0,' + OPACITY + ')';
      else {
        let opacity = (forces[i][j] / MAX) * OPACITY;
        context.strokeStyle = 'rgba(0, 0, 0,' + opacity + ')';
      }
      context.beginPath();
      context.lineWidth = 1;
      context.moveTo(objects[i].coord[0], objects[i].coord[1]);
      context.lineTo(objects[j].coord[0], objects[j].coord[1]);
      context.stroke();
    }
  }
}

function getMagnitudeForce(objects, forces) {
  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects.length; j++) {
      if (i > j) {
        continue;
      }
      forces[i][j] = getDistance(forces[i][j]);
      forces[j][i] = forces[i][j];
    }
  }
}

export default startSimulation;
