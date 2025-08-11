import { defineNuxtPlugin } from '#app';
import { VueDraggableNext } from 'vue-draggable-next';


export default defineNuxtPlugin((nuxtApp: any) => {
	nuxtApp.vueApp.component('draggable', VueDraggableNext);
});
