<script setup lang="ts"></script>
<template>
  <router-view></router-view>
</template>
<style>

.container {
  max-width: 900px;
  margin: 0 auto;
}

a {
  text-decoration: none;
}

main {
  margin-top: 30px;
}

img {
  width: 100%;
}
header {
  border-radius: 0 0 10px 10px;
  padding: 20px 20px;
  display: flex;
  /* justify-content: space-between;    */
  align-items: center;
  z-index: 20;
}
.home-link {
  font-size: 48px;
  color: white;
}

@media screen and (max-width: 1000px) {
  .main-wrapper {
    padding: 0 10px;
  }
  header {
    border-radius: 0px;
    padding: 10px 20px;
  }
  .home-link {
    font-size: 28px;
  }
  .btn-gallery {
    font-size: 18px;
  }
}

.btn-gallery {
  color: white;
  background-color: #ffafcc;
  padding: 10px 20px;
  font-size: 24px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 30px;
  right: calc((100vw - min(900px, 100vw)) / 2 + 20px);
  z-index: 30;
}
</style>
