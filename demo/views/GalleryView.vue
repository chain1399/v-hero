<script setup>
import foodData from "@/food-data.json";
</script>
<template>
  <div>
    <div class="half-background" v-hero="{ id: 'banner' }"></div>

    <div class="gallery-container">
      <div class="box-wrapper">
        <div class="gallery">
          <router-link
            :to="`food/${food.id}`"
            v-for="(food, i) in foodData"
            :key="food.id"
          >
            <img
              :src="food.image"
              v-hero="{
                id: food.id,
                enter: {
                  easing: 'ease-in-out',
                  scale: 0.5,
                  opacity: 0,
                  delay: i * 100 + 200,
                },
              }"
            />
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <router-link to="/" class="btn-home" v-hero="{ id: 'btn' }">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="#ffffff"
    >
      <!-- <path d="M0 0h24v24H0z" fill="none" /> -->
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </svg>
  </router-link>
</template>
<style>
.half-background {
  position: absolute;
  height: 60vh;
  width: 100%;
  background-color: #6e85b7;
}

.gallery-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  max-height: 100%;
  padding: 20px;
}
.box-wrapper {
  background-color: white;

  max-width: min(900px, 90vh);
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  z-index: 20;
}
.gallery {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* grid-template-rows: repeat(4, calc((90vh/4) - 15px)); */
  gap: 5px;
  /* grid-auto-flow: dense; */
}
.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.gallery > *:nth-child(1) {
  grid-column: span 2;
  grid-row: span 2;
}
.gallery > *:nth-child(5) {
  grid-column: span 2;
  grid-row: span 2;
}

.btn-home {
  color: white;
  width: 70px;
  height: 70px;
  background-color: #ffafcc;
  padding: 10px 30px;
  font-size: 20px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 30px;
  right: 30px;
  /* right: calc( (100vw - min(100vw, 1200px))/2 + 30px); */
  z-index: 30;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn-home svg {
  transform: scale(3);
}
</style>
