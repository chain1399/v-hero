import { Directive } from "vue";
import type { HeroDirectiveOptions, ElementData } from "./types/types";
import { flipHero } from "./animations/animateHero";
import { flipEnter } from "./animations/animateEnter";

let unmountEl: ElementData[] = [];

export const vHero: Directive<HTMLElement, HeroDirectiveOptions> = {
  mounted(el, binding) {
    setTimeout(() => {
      unmountEl = [];
    });

    if (unmountEl.length > 0) {
      const found = unmountEl.find((ele) => ele.id === binding.value.id);
      if (!!binding.value.id && found) {
        flipHero(el, found.rect, found.borderRadius, binding.value);
        return;
      }
    }

    if (!!binding.value.enter) {
      flipEnter(el, binding.value.enter);
    }
  },
  beforeUnmount(el, binding) {
    if (!binding.value.id) {
      return;
    }
    const style = getComputedStyle(el);
    unmountEl.push({
      id: binding.value.id,
      rect: el.getBoundingClientRect(),
      borderRadius: style.borderRadius,
    });
  },
};
