import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Hero from "../src";
import "./app.css";

const app = createApp(App);

app.use(router);
app.use(Hero, {
	
});

app.mount("#app");
