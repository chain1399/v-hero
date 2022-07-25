export interface HeroDirectiveOptions extends EasingOptions {
  id?: string;

  enter?: EnterValue & EasingOptions;
}

export type EnterDirectiveOptions = HeroDirectiveOptions["enter"];
export interface EnterValue {
  x?: number | string;
  y?: number | string;
  scale?: number;
  opacity?: number;
  rotate?: number;
}

interface EasingOptions {
  easing?: string;
  duration?: number;
  delay?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  transition?: TransitionOptions;
}

interface TransitionOptions extends KeyframeEffectOptions {
  stiffness?: number;
  damping?: number;
  mass?: number;
}

export interface ElementData {
  id?: string;
  rect: DOMRect;
  borderRadius: string;
}

export interface DefaultOptions {
  easing?: string;
  duration?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
}
