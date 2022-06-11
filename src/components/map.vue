<template>
  <div class="mapContainer">
    <div class="middle-cursor"></div>
    <l-map
      :use-global-leaflet="true"
      @ready="onLoad"
      ref="map"
      v-model="mapStates.zoom"
      v-model:zoom="mapStates.zoom"
      :center="mapStates.center"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :url="mapStates.url"> </l-tile-layer>
      <l-control class="clickControl" :position="mapStates.position">
        <p @click="flyToTarget()">my position</p>
      </l-control>
    </l-map>
    <img
      data-v-32316856=""
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAkCAMAAACg5NohAAAAZlBMVEUAAAAAv6////////////////////////////////////////////////8kyLr///8Av68Av6////////8Bv6////+f5+GA39fP8/C/7+s7zsLv+/pg180gx7mv6+bf9/WP49xQ08iQ7UpMAAAAFHRSTlMAvxCAz7/vr5+PYFBAMN9wQDAg34CjEgoAAADXSURBVCjP7dHJcoMwEEVRWQLjGOMp3RrQgPP/PxnMA2RU7LLNXdGcUkkIsSZbNdZKUXZp2Jkxx6fnVr68IRQNqw+QlY201ttTpjrRpmzKUtFwhshjX1J/xEFvaXlhTE/IYVn1g1HzmMZzaCZiTC+eMvgEfks3gDzIY5ro4rARz32SnYdyVd5Lg16Z8gntW9x8whpXqwmFlAIhd5voyXHvNrDMlWTV+k/0VjR22rFUSZGtHsICwTeQpfP3oCNR1L5qRVmnrkRX1Ym9DkQHIf7pL/S43x8i9wswHCJfPxDLIAAAAABJRU5ErkJggg=="
      alt="نشان نقشه"
      class="middle-cursor"
    />
  </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LControlLayers,
  LControl,
} from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import { onMounted, reactive, ref, toRaw } from "vue";
const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);
const mapStates = reactive({
  map: null,
  lat: null,
  lng: null,
  marker: null,
  zoom: 5,
  url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`,
  center: [35.7391316744048, 52.995598030067654],
  position: "topleft",
  centerLatLng: {},
  currentCenter: Number,
  currentZoom: Number,
  circle: {
    center: null,
    radius: 6,
    color: "red",
  },
  currentZoom: null,
});
const map = ref(null);
const onLoad = () => {
  console.log("map is ready");
  mapStates.map = map.value.leafletObject;
  console.log("Acquiring user position...");
  mapStates.map
    .locate({ setView: true, watch: false, maxZoom: 17 })
    .on("locationfound", (e) => {
      console.log("Position acquired");
      mapStates.lat = e.latitude;
      mapStates.lng = e.longitude;
      mapStates.marker = new L.circleMarker([this.lat, this.lng]).addTo(
        toRaw(this.map)
      );
    });
};

const zoomUpdate = (zoom) => {
  mapStates.currentZoom = zoom;
};
const centerUpdate = (center) => {
  mapStates.currentCenter = center;
  emit("update:modelValue", center);
};
const showClick = () => {
  console.log("clicked");
};
const flyToTarget = () => {
  console.log("Acquiring user position...");
  mapStates.map
    .locate({ setView: false, watch: true })
    .on("locationfound", (e) => {
      console.log("Position acquired");
      mapStates.map.flyTo([e.latitude, e.longitude], 16);
    });
};
</script>
<style>
.mapContainer {
  height: 80vh;
  width: 100%;
  z-index: 100;
  border: 1px solid gray;
  position: relative;
  overflow: hidden;
}
.clickControl {
  background: #fff;
  padding: 0 0.5rem;
  border: 1px solid gray;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
  -moz-user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
}
.controller {
  height: 33vh;
  width: 100%;
}
.leaflet-container {
  position: relative;
  z-index: 2;
}
.middle-cursor {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border-radius: 50%;
  z-index: 3;
}
</style>
