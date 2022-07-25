<script setup>
import foodData from "@/food-data.json";
</script>

<template>
  <div class="header-background" v-hero="{ id: 'banner' }"></div>
  <header class="container">
    <router-link
      to="/"
      class="home-link"
      v-hero="{
        enter: {
          x: -200,
          opacity: 0,
        },
      }"
    >
      Food Hero
    </router-link>
  </header>
  <div class="main-wrapper">
    <main>
      <div class="container">
        <RouterLink
          class="food-list"
          v-for="food in foodData"
          :to="`food/${food.id}`"
          :key="food.id"
        >
          <div class="img">
            <img
              :src="food.image"
              v-hero="{
                id: food.id,
                duration: 250,
              }"
            />
          </div>
          <div class="text">
            {{ food.desc.slice(0, 150) + " ..." }}
          </div>
        </RouterLink>
      </div>
    </main>
  </div>
  <router-link
    to="/gallery"
    class="btn-gallery"
    v-hero="{
      id: 'btn',
      enter: {
        rotate: 360,
      },
    }"
    >Gallery</router-link
  >
  <router-link
    to="/gallery2"
    v-hero="{
      id: 'gallery2',
      enter: {
        scale: 0,
        delay: 300
      },
    }"
    class="btn-gal2"
    ><span
      v-hero="{
        enter: {
          opacity: 0,
          delay: 200,
          duration: 200
        },
      }"
      >G2</span
    >
  </router-link>
</template>

<style>
.food-list {
  margin: 10px auto;
  padding: 20px 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  background-color: white;
  z-index: 20;
}
.food-list:hover {
  box-shadow: 3px 3px 8px rgba(0, 0, 0, 0.2);
}
.text {
  color: grey;
}
.food-list .img {
  margin-right: 30px;
}
.food-list img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  z-index: 10;
  display: flex;
  align-items: center;
}
.header-background {
  position: absolute;
  background-color: #6e85b7;
  height: 200px;
  width: 100%;
  z-index: -1;
}

.btn-gal2 {
  text-decoration: none;
  color: white;
  background-color: #6e85b7;
  border-radius: 90% 0 0 0;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 100;
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
