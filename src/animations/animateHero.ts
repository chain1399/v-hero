import { nextTick } from "vue";
import { HeroDirectiveOptions, DefaultOptions } from "../types/types";
import { makeSpring, SpringOutput } from "../easing/spring";

let defaultOptions = {
  easing: "cubic-bezier(0.4,0,0.2,1)",
  duration: -1, //-1 indicate not set duration
  stiffness: 250,
  damping: 20,
  mass: 1,
  delay: 0,
  transition: {},
};
export const setDefaultHeroOptions = (options: DefaultOptions) => {
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

export const flipHero = async (
  el: HTMLElement,
  prevRect: DOMRect,
  prevBorderRadius: string,
  options: HeroDirectiveOptions
) => {
  await nextTick();
  await nextTick();

  const config = extractHeroConfig(options);
  const eleRect = el.getBoundingClientRect();

  //animate only in viewport
  if (eleRect.top > window.innerHeight || eleRect.bottom < 0) {
    return;
  }

  const deltaX = prevRect.left - eleRect.left;
  const deltaY = prevRect.top - eleRect.top;

  const deltaW = prevRect.width / eleRect.width;
  const deltaH = prevRect.height / eleRect.height;

  if (config.easing !== "spring") {
    el.animate(
      [
        {
          transformOrigin: "top left",
          transform: `
					translate(${deltaX}px, ${deltaY}px)
					scale(${deltaW}, ${deltaH})
				`,
          borderRadius: prevBorderRadius,
        },

        {
          transformOrigin: "top left",
        },
      ],
      {
        fill: "both",
        ...config.transition,
        duration: config.duration,
        easing: config.easing,
        delay: config.delay,
      }
    );
  } else {
    //spring
    const spring = makeSpring({
      stiffness: config.stiffness,
      damping: config.damping,
      mass: config.mass,
    });

    const targetBorderRadius = getComputedStyle(el).borderRadius;
    const frames = createKeyframeFromSpring(
      deltaX,
      deltaY,
      deltaW,
      deltaH,
      prevBorderRadius,
      targetBorderRadius,
      spring
    );

    const duration = config.duration > 0 ? config.duration : spring.duration
    const keyframes = new KeyframeEffect(el, frames, {
      ...config.transition,
      delay: config.delay,
      duration
    });

    const animation = new Animation(keyframes);
    animation.play();
  }
};

function extractHeroConfig(options: HeroDirectiveOptions) {
  if (!options) {
    return defaultOptions;
  }

  let easing = options.easing || defaultOptions.easing;
  let duration = options.duration || defaultOptions.duration;

  if (easing !== "spring" && duration < 0) {
    //non spring default duration = 300
    duration = 300;
  }

  let stiffness = options.stiffness || defaultOptions.stiffness;
  let damping = options.damping || defaultOptions.damping;
  let mass = options.mass || defaultOptions.mass;

  let delay = options.delay || 0;

  let transition:KeyframeEffectOptions = {};
  if (options.transition) {
    duration =
      typeof options.transition.duration === "number"
        ? options.transition.duration
        : duration;
    easing = options.transition.easing || easing;
    stiffness = options.transition.stiffness || stiffness;
    damping = options.transition.damping || damping;
    mass = options.transition.mass || mass;
    delay = options.transition.delay || delay;
    transition = options.transition;
    delete transition.easing
  }

  return {
    transition,
    duration,
    easing,
    stiffness,
    damping,
    mass,
    delay,
  };
}

function createKeyframeFromSpring(
  dX: number,
  dY: number,
  dW: number,
  dH: number,
  prevBorderRadius: string,
  targetBorderRadius: string,
  spring: SpringOutput
) {
  let attachBorderRadius = false;
  const frames: Keyframe[] = [];

  spring.springValue.forEach((s, i) => {
    //interpolate (end - start) * t + start
    let displaceX = (0 - dX) * s + dX;
    let displaceY = (0 - dY) * s + dY;
    let scaleX = (1 - dW) * s + dW;
    let scaleY = (1 - dH) * s + dH;

    //fix end animation scale glitch
    scaleX = Math.abs(1 - scaleX) > 0.001 ? scaleX : 1.001;
    scaleY = Math.abs(1 - scaleY) > 0.001 ? scaleY : 1.001;

    const transition: Keyframe = {
      transformOrigin: "top left",
      transform: `
		translate(${displaceX}px, ${displaceY}px)
		scale(${scaleX}, ${scaleY})
		`,
    };
    if (i === 0) {
      transition.borderRadius = prevBorderRadius;
    }
    if (s >= 1 && !attachBorderRadius) {
      transition.borderRadius = targetBorderRadius;
      attachBorderRadius = true;
    }
    frames.push(transition);
  });

  return frames;
}
