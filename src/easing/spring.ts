const caches = new Map();
const framePerSecond = 60;
const msPerFrame = (1 / framePerSecond) * 1000;
const maxDuration = 10000

const defaultStiffness = 200;
const defaultDamping = 25;
const defaultMass = 1;

interface SpringOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface SpringOutput {
  springValue: number[];
  frameCount: number;
  duration: number;
}

export const makeSpring = (options: SpringOptions): SpringOutput => {
  const mapKey = `stiff${options?.stiffness || defaultStiffness},damp${
    options?.damping || defaultDamping
  },mass${options?.mass || defaultMass}`;

  const value = caches.get(mapKey);

  if (value) {
    return value;
  } else {
    const output = generateSpring(options);
    caches.set(mapKey, output);
    return output;
  }
};



//generate spring base from https://github.com/skevy/wobble/blob/develop/src/index.ts

function generateSpring(options: SpringOptions): SpringOutput {
  const stiffness = options?.stiffness || defaultStiffness;
  const damping = options?.damping || defaultDamping;

  const mass = options?.mass || defaultMass;
  const restVeocity = 0.001;
  const restDisplacement = 0.001;

  let frame = 0;
  let t = 0;

  const c = damping;
  const k = stiffness;
  const m = mass;
  const fromValue = 0;
  const toValue = 1;
  const v0 = 0;

  let zeta = c / (2 * Math.sqrt(k * m)); 
  const omega0 = Math.sqrt(k / m) / 1000; 
  const omega1 = omega0 * Math.sqrt(1.0 - zeta * zeta); 
  const omega2 = omega0 * Math.sqrt(zeta * zeta - 1.0); 
  const x0 = toValue - fromValue; 

  let oscillation = 0.0;
  let velocity = 0.0;

  const springValue = [0];
  frame++;

  while (!isFinish() && t < maxDuration) {
    frame++;
    t += msPerFrame;

    if (zeta < 1) {
      // Under damped
      const envelope = Math.exp(-zeta * omega0 * t);
      oscillation =
        toValue -
        envelope *
          (((v0 + zeta * omega0 * x0) / omega1) * Math.sin(omega1 * t) +
            x0 * Math.cos(omega1 * t));
      velocity =
        zeta *
          omega0 *
          envelope *
          ((Math.sin(omega1 * t) * (v0 + zeta * omega0 * x0)) / omega1 +
            x0 * Math.cos(omega1 * t)) -
        envelope *
          (Math.cos(omega1 * t) * (v0 + zeta * omega0 * x0) -
            omega1 * x0 * Math.sin(omega1 * t));
    } else if (zeta === 1) {
      // Critically damped
      const envelope = Math.exp(-omega0 * t);
      oscillation = toValue - envelope * (x0 + (v0 + omega0 * x0) * t);
      velocity =
        envelope * (v0 * (t * omega0 - 1) + t * x0 * (omega0 * omega0));
    } else {
      // Overdamped
      const envelope = Math.exp(-zeta * omega0 * t);
      oscillation =
        toValue -
        (envelope *
          ((v0 + zeta * omega0 * x0) * Math.sinh(omega2 * t) +
            omega2 * x0 * Math.cosh(omega2 * t))) /
          omega2;
      velocity =
        (envelope *
          zeta *
          omega0 *
          (Math.sinh(omega2 * t) * (v0 + zeta * omega0 * x0) +
            x0 * omega2 * Math.cosh(omega2 * t))) /
          omega2 -
        (envelope *
          (omega2 * Math.cosh(omega2 * t) * (v0 + zeta * omega0 * x0) +
            omega2 * omega2 * x0 * Math.sinh(omega2 * t))) /
          omega2;
    }

    springValue.push(oscillation);
  }

  return {
    springValue,
    frameCount: frame,
    duration: Math.round(t),
  };

  function isFinish() {
    const isNoVeocity = Math.abs(velocity) <= restVeocity;
    const isNoDisplacement =
      Math.abs(toValue - oscillation) <= restDisplacement;
    return isNoVeocity && isNoDisplacement;
  }
}
