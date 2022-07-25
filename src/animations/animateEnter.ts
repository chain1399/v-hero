import {
  DefaultOptions,
  EnterDirectiveOptions,
  EnterValue,
} from "../types/types";
import { makeSpring, SpringOutput } from "../easing/spring";

let defaultOptions = {
  easing: "spring",
  duration: -1, //-1 indicate not set duration
  stiffness: 150,
  damping: 14,
  mass: 1,
  delay: 0,
  transition: {},
};

export const setDefaultEnterOptions = (options: DefaultOptions) => {
  defaultOptions = {
    ...defaultOptions,
    ...options,
  };
  makeSpring({
    stiffness: defaultOptions.stiffness,
    damping: defaultOptions.damping,
    mass: defaultOptions.mass,
  });
};

export const flipEnter = (el: HTMLElement, options: EnterDirectiveOptions) => {
  const {
    x,
    y,
    scale,
    rotate,
    opacity,
    easing,
    stiffness,
    damping,
    duration,
    delay,
    transition,
  } = extractEnterConfig(options);

  if (easing !== "spring") {
    const transitionFirstFrame = createTransition({
      x,
      y,
      scale,
      rotate,
      opacity,
    });
    el.animate([transitionFirstFrame, { offset: 1 }], {
      fill: "both",
      ...transition,
      easing,
      duration,
      delay,
    });
  } else {
    //spring
    const spring = makeSpring({ stiffness, damping });
    if (typeof x !== "number" || typeof y !== "number") {
      console.warn("spring only support in pixel unit at ", el);
      return
    }
    const frames = createKeyframeEnterFromSpring({
      x,
      y,
      scale,
      rotate,
      opacity,
      spring,
    });

    const dur = duration > 0 ? duration : spring.duration

    const keyframes = new KeyframeEffect(el, frames, {
      fill: "both",
      ...transition,
      duration: dur, 
      delay,
    });

    const animation = new Animation(keyframes);
    animation.play();
  }
};

function extractEnterConfig(options: EnterDirectiveOptions) {
  let x = options?.x || 0;
  let y = options?.y || 0;
  let scale = options?.scale ?? 1;
  let opacity = options?.opacity ?? 1;
  let rotate = options?.rotate || 0;
  let delay = options?.delay || 0;

  let duration = options?.duration || defaultOptions.duration;
  let easing = options?.easing || defaultOptions.easing;
  let stiffness = options?.stiffness || defaultOptions.stiffness;
  let damping = options?.damping || defaultOptions.damping;
  let mass = options?.mass || defaultOptions.mass;

  if (easing !== "spring" && duration < 0) {
    //non spring default duration = 300
    duration = 300;
  }

  let transition:KeyframeEffectOptions = {};

  if (options?.transition) {
    duration =
      typeof options?.transition.duration === "number"
        ? options?.transition.duration
        : duration;
    easing = options?.transition.easing || easing;
    stiffness = options?.transition.stiffness || stiffness;
    damping = options?.transition.damping || damping;
    mass = options?.transition.mass || mass;
    delay = options?.transition.delay || delay;
    transition = options?.transition || transition;
		delete transition?.easing
  }

  return {
    transition,
    x,
    y,
    scale,
    opacity,
    rotate,
    easing,
    stiffness,
    damping,
    duration,
    delay,
  };
}

function createTransition(options: EnterValue) {
  let x =
    typeof options.x === "string" ? options.x : options.x?.toString() + "px";
  let y =
    typeof options.y === "string" ? options.y : options.y?.toString() + "px";

  const transitionValue: Keyframe = {
    transform: `translate(${x},${y}) scale(${options.scale}) rotate(${options.rotate}deg)`,
  };
  if (!!options.opacity || options.opacity === 0) {
    transitionValue.opacity = options.opacity;
  }
  return transitionValue;
}

function createKeyframeEnterFromSpring({
  x,
  y,
  scale,
  rotate,
  opacity,
  spring,
}: {
  x: number;
  y: number;
  scale: number;
  rotate: number;
  opacity: number;
  spring: SpringOutput;
}) {
  const frames: Keyframe[] = [];

  spring.springValue.forEach((s, i) => {
    let displaceX = (0 - x) * s + x;
    let displaceY = (0 - y) * s + y;
    let displaceRotate = (0 - rotate) * s + rotate;
    let scaleValue = (1 - scale) * s + scale;

    const transition = createTransition({
      x: displaceX,
      y: displaceY,
      scale: scaleValue,
      rotate: displaceRotate,
    });

    if (i === 0 && (!!opacity || opacity === 0)) {
      transition.opacity = opacity;
    }

    frames.push(transition);
  });

  return frames;
}
