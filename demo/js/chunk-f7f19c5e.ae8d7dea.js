(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f7f19c5e"],{3434:function(e,t,a){},d25f:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"vue-component items"},[a("SearchableList",{ref:"list",attrs:{data:e.data,identifierKey:"id",summaryKey:"title",showSummaryOnExpand:!1,externalSearchTerm:e.searchTerm,sort:e.sort,offerDetails:e.offerDetails,heading:e.heading,collapsed:e.collapsed},on:{summaries:e.updateFeatures},scopedSlots:e._u([{key:"heading",fn:function(t){return[e._t("heading",null,null,t)]}},{key:"after-search-box",fn:function(){return[e.showMap?e._t("map",[a("div",{ref:"mapContainer",staticClass:"map overview"})],{geojson:e.geojson,mapOptions:e.mapOptions}):e._e()]},proxy:!0},{key:"summary",fn:function(t){return[e._t("summary",null,null,t)]}},{key:"details",fn:function(t){return[a("Item",{attrs:{data:t.item,mapOptions:e.mapOptions},scopedSlots:e._u([{key:"title",fn:function(){return[a("span",{staticClass:"hidden"})]},proxy:!0},{key:"before-description",fn:function(t){return[e._t("item-before-description",null,null,t)]}},{key:"end",fn:function(t){return[e._t("item-end",null,null,t)]}},{key:"location",fn:function(t){return[e._t("item-location",null,null,t)]}}],null,!0)})]}}],null,!0)})],1)},n=[],i=a("60a2"),r=a("8205");const o={color:"#3388ff",fillOpacity:.2};var l={name:"Items",components:{Item:()=>i["a"].loadAsyncComponent(a.e("chunk-bfb1dd5e").then(a.bind(null,"2263"))),SearchableList:()=>i["a"].loadAsyncComponent(a.e("chunk-2209d90f").then(a.bind(null,"d79f")))},props:{items:{type:[Array,Object],default:()=>[]},showMap:{type:Boolean,default:!1},mapOptions:r["a"].props.mapOptions,searchTerm:{type:String,default:null},sort:{type:Boolean,default:!0},offerDetails:{type:Boolean,default:!0},heading:{type:String,default:"Items"},collapsed:{type:Boolean,default:null}},data(){return Object.assign(r["a"].data(),{summaries:[]})},computed:{leafletOptions:r["a"].computed.leafletOptions,data(){return Array.isArray(this.items)?this.items:i["a"].isObject(this.items)&&"FeatureCollection"===this.items.type&&Array.isArray(this.items.features)?this.items.features:[]},geojson(){let e={type:"FeatureCollection",features:[]};for(let t of this.summaries)t.show&&e.features.push(this.data[t.index]);return e}},watch:{showMap:r["a"].watch.showMap,geojson(){this.map?this.setFeatures():this.initMap()}},beforeCreate:r["a"].beforeCreate,mounted:r["a"].mounted,methods:{initMap:r["a"].methods.initMap,updateMapView:r["a"].methods.updateMapView,updateFeatures(e){this.summaries=e},addFeatures(){return this.setFeatures(!1),this.map.geometries},setFeatures(e=!0){if(!this.map||!this.map.instance)return;this.map.geometries&&this.map.geometries.remove();let t=this.map.leaflet.geoJSON(this.geojson,{style:o});t.on("click",e=>{var a=this.map.leaflet.latLngBounds(e.latlng,e.latlng);t.eachLayer(e=>{let t=e.getBounds(),s=this.summaries.findIndex(t=>t.identifier===e.feature.id);this.$refs.list.toggleDetails(s,a.intersects(t))})}),e&&t.addTo(this.map.instance),this.map.geometries=t}}},u=l,p=(a("f908"),a("2877")),m=Object(p["a"])(u,s,n,!1,null,"188972ca",null);t["default"]=m.exports},f908:function(e,t,a){"use strict";a("3434")}}]);
//# sourceMappingURL=chunk-f7f19c5e.ae8d7dea.js.map