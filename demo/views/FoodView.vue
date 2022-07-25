<script setup>
import foodData from "@/food-data.json";
import { useRoute } from "vue-router";

const route = useRoute();
const food = foodData.find((f) => f.id === route.params.id);
</script>
<template>

    <div class="header-background2" v-hero="{ id: 'banner' }"></div>
    <header class="container">
      <router-link to="/" class="home-link"> Food Hero </router-link>
    </header>
    <div class="main-wrapper">
      <main>
        <div class="nav-back container">
          <button
            @click="$router.go(-1)"
            v-hero="{ enter: { scale: 0.5, opacity: 0 } }"
          >
            Back
          </button>
        </div>

        <div class="container card">
          <div
            class="hero"
            v-hero="{
              id: food.id,
              easing: 'spring',
              stiffness: 250,
              damping: 20,
            }"
          >
            <img :src="food.image" alt="" />
          </div>
          <div
            class="content"
            v-hero="{
              enter: {
                easing: 'linear',
                y: -100,
                opacity: 0,
                transition: {
                  delay: 200,
                },
              },
            }"
          >
            <p>
              {{ food.desc }}
            </p>
            <p>
              Sapiente, inventore sint autem temporibus minus aspernatur quae
              nulla necessitatibus labore non. Eius rem voluptate quis nam,
              error esse dolorem ipsam. Minus tempora sunt ea animi tenetur
              praesentium et excepturi autem! Necessitatibus officiis laborum
              ullam iusto ut ipsa dolor atque eius obcaecati libero tenetur
              possimus alias hic sapiente porro sit doloremque dolores soluta,
              accusantium inventore quam ratione! Libero iste officia provident.
              Delectus, placeat! Similique est, nisi deleniti laudantium odio,
              unde aut beatae fugit reprehenderit, quae eum.
            </p>
          </div>
        </div>
      </main>
    </div>
    <router-link to="/gallery" class="btn-gallery" v-hero="{ id: 'btn' }"
      >Gallery</router-link
    >

</template>
<style>
.card {
  border-radius: 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  margin-bottom: 100px;
  z-index: 20;
  background-color: white;
}
.hero {
  height: 300px;
  overflow: hidden;
  z-index: 10;
}
.hero img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.content {
  padding: 30px;
}
.prev-next {
  padding: 30px;
  display: flex;
  justify-content: space-between;
}
.prev-next .img2 {
  width: 30%;
  border-radius: 25px;
  overflow: hidden;
}

.content p {
  margin-top: 40px;
  /* margin-bottom: 30px; */
  color: gray;
}
.content p::first-letter {
  font-size: 56px;
  line-height: 0;
  margin-right: 5px;
}

.nav-back {
  margin-bottom: 15px;
}
.nav-back button {
  color: white;
  background-color: #ffafcc;
  padding: 8px 20px;
  border-radius: 999px;
  outline: none;
  border: none;
  cursor: pointer;
  z-index: 20;
}
@media screen and (max-width: 800px) {
  .hero {
    height: 200px;
  }
}

.header-background2 {
  position: absolute;
  background-color: #6e85b7;
  height: 300px;
  width: 100%;
  z-index: -1;
}
</style>
