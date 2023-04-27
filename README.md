# v-hero

`v-hero` is a Vue.js library that provides a directive to create in-between route animation for any element in your web application. Right now specific in enter animation.


`v-hero` use FLIP technique to animate element to get performant animation and only take about ~2kb. in size.

# Example

[DEMO](https://v-hero-demo.web.app/) | [CODE](https://github.com/chain1399/v-hero-demo)

## Installation

```bash
npm install v-hero
```

## Usage

### in main vue file use as vue plugin

```js
import { createApp } from "vue";
import Hero from "v-hero";

app.use(Hero);
```

## To animate between route

set v-hero id to be the same in every route, if v-hero detect the same id, it'll try to animate element when enter route.

```html
<!-- page1.vue -->
<div v-hero="{id: 'mango'}">
  <img src="mango.jpg" alt="mango" />
</div>

<!-- page2.vue -->
<div v-hero="{id: 'mango'}">
  <!-- your content doesn't have to be the same as page1 -->
  <img src="mango.jpg" alt="mango" />
</div>

<!-- page3.vue add more option -->
<div
  v-hero="{
    id: 'mango',
    easing: 'spring'
  }"	
>
  <img src="mango.jpg" alt="mango" />
</div>

```


## Animation easing option
easing can be easing function and special 'spring' easing.

Stiffness, damping and mass is only effect when easing is 'spring'.
```js
v-hero="{
  id: 'id',
  easing: 'cubic-bezier(0.4,0,0.2,1)',
  duration: 300,
  stiffness: 250,
  damping: 20,
  mass: 1,
  delay: 0,
}"
```

## To animate when enter screen 
If you want to add enter animation use enter option.
Set any of this options (x, y, scale, rotate, opacity) under enter option.
Set the value of start animation relative to position of element.
```js
v-hero="{
  enter: {
    x: 10,
    y: -20,
    scale: 0.12,
    rotate: 180,
    opacity: 0.2,

    easing: 'cubic-bezier(0.4,0,0.2,1)',
    duration: 300,
    stiffness: 250,
    damping: 20,
    mass: 1,
    delay: 0,
  }
}"
```


You can use both animation by id and enter animation.
When both have affect, the id animation will only take effect.
```js
v-hero="{
  id: 'id',
  easing: 'cubic-bezier(0.4,0,0.2,1)',
  duration: 300,
  stiffness: 250,
  damping: 20,
  mass: 1,
  delay: 0,

  enter: {
    x: 10,
    y: -20,
    scale: 0.12,
    rotate: 180,
    opacity: 0.2,
    easing: 'spring',
    duration: 300,
    stiffness: 250,
    damping: 20,
    mass: 1,
    delay: 0,
  }
}"
```