import { App, Plugin } from "vue";
import { vHero } from "./directive";
import { setDefaultHeroOptions } from "./animations/animateHero";
import type { DefaultOptions } from "./types/types";
import { setDefaultEnterOptions } from "./animations/animateEnter";

interface PluginOptions extends DefaultOptions {
  enter?: DefaultOptions;
}

const Hero: Plugin = (app: App, options: PluginOptions) => {
  app.directive("hero", vHero);

  if (options) {
    const { enter: enterOptions, ...heroOptions } = options;

    setDefaultHeroOptions(heroOptions);

    if (enterOptions) {
      setDefaultEnterOptions(enterOptions);
    }
  }

  //exit animation !
  // setTimeout(() => {
  //   const router = app.config.globalProperties.$router;
  //   if (router) {
  //     router.beforeEach((to: RouteLocation, from: RouteLocation) => {
  //       // ...
  //       // console.log("beforeEnter", to, from);
  //     });
  //   }
  // });
};

export default Hero;
