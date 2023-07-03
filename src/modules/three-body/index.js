import { map, reduce } from 'lodash';

const G = 0.4;
const SLOW_DOWN = 2;

const updateObjects = objects => {
  const forces = calculateForces(objects);

  for (let i = 0; i < objects.length; i++) {
    const force = multipleVectorOperation(forces[i], add); // Add all force vectors together
    const acc = scalarOperation1(objects[i].mass, force, div);
    const timeDiff = (Date.now() - objects[i].lastTimeUpdated) / SLOW_DOWN;
    const timeArray = initialiseArray(objects[i].velocity.length, timeDiff);
    const newVel = vectorOperation(timeArray, acc, mult);

    objects[i].velocity = vectorOperation(objects[i].velocity, newVel, add);

    const distTravelled = vectorOperation(timeArray, objects[i].velocity, mult);

    objects[i].position = vectorOperation(
      distTravelled,
      objects[i].position,
      add
    );

    objects[i].lastTimeUpdated = Date.now();
  }

  return forces;
};

const calculateForces = objects => {
  const result = initialise2DArray(objects.length);

  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects.length; j++) {
      if (i === j) {
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
};

const calculateForce = (obj1, obj2) => {
  const subVec = vectorOperation(obj1.position, obj2.position, sub);
  const distance = getDistance(subVec);
  const norVec =
    distance === 0
      ? initialiseArray(subVec.length, 0)
      : getNormalisedVector(subVec, distance);
  const force =
    distance === 0 ? 0 : (G * obj1.mass * obj2.mass) / (distance * distance);
  return map(norVec, x => x * force);
};

const getDistance = v => {
  let result = 0;

  for (let i = 0; i < v.length; i++) {
    result += v[i] * v[i];
  }
  return Math.sqrt(result);
};

const getNormalisedVector = (subVec, dist) => {
  return map(subVec, x => (x * 1.0) / dist);
};

const multipleVectorOperation = (vectors, op) => {
  return reduce(vectors, (sum, x) => vectorOperation(sum, x, op));
};

const vectorOperation = (v1, v2, op) => {
  const newV = [];
  const minLength = Math.min(v1.length, v2.length);

  for (let i = 0; i < minLength; i++) {
    newV.push(op(v1[i] * 1.0, v2[i]));
  }

  return newV;
};

const scalarOperation1 = (scalar, v, op) => {
  return map(v, x => op(x, scalar));
};

const initialiseArray = (length, value) => {
  return map(new Array(length), x => value);
};

const initialise2DArray = length => {
  let result = [];

  for (let i = 0; i < length; i++) {
    result.push(new Array(length));
  }
  return result;
};

const sub = (x, y) => {
  return x - y;
};

const add = (x, y) => {
  return x + y;
};

const mult = (x, y) => {
  return x * y;
};

const div = (x, y) => {
  return y === 0 ? 0 : x / y;
};

const getMagnitudeForce = (objects, forces) => {
  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects.length; j++) {
      if (i > j) {
        continue;
      }
      forces[i][j] = getDistance(forces[i][j]);
      forces[j][i] = forces[i][j];
    }
  }
};

const createModel = initialState => {
  const bodies = initialState.map(body => ({
    velocity: [0.0, 0.0, 0.0],
    force: [0, 0, 0],
    lastTimeUpdated: Date.now(),
    ...body,
  }));

  const next = () => {
    const forces = updateObjects(bodies);

    getMagnitudeForce(bodies, forces);
  };

  const getPositions = () => {
    return bodies.map(body => body.position);
  };

  return { next, getPositions };
};

export default createModel;
