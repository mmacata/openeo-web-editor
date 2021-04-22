(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-582c7420"],{2406:function(e,t,i){"use strict";i.r(t);var n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("Modal",{ref:"modal",scopedSlots:e._u([{key:"main",fn:function(){return[i("div",{staticClass:"vue-component server-info"},[i("Capabilities",{attrs:{capabilities:e.capabilities,url:e.url}}),i("h3",[e._v("File formats")]),i("FileFormats",{attrs:{formats:e.fileFormats,searchTerm:"",heading:null}}),i("h3",[e._v("Secondary web services")]),i("ServiceTypes",{attrs:{services:e.serviceTypes,searchTerm:"",heading:null}}),i("h3",[e._v("Runtimes for user-defined functions (UDF)")]),i("UdfRuntimes",{attrs:{runtimes:e.udfRuntimes,searchTerm:"",heading:null}})],1)]},proxy:!0}])})},a=[],s=i("2930"),l=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"vue-component capabilities"},[i("h2",[e._v(e._s(e.title))]),i("section",{staticClass:"base-data"},[e.url2?i("div",{staticClass:"tabular"},[i("label",[e._v("URL:")]),i("span",{staticClass:"value"},[e._v(e._s(e.url2))])]):e._e(),e.capabilities.api_version?i("div",{staticClass:"tabular"},[i("label",[e._v("openEO-Version:")]),i("span",{staticClass:"value"},[e._v(e._s(e.capabilities.api_version))])]):e._e(),i("div",{staticClass:"tabular"},[i("label",[e._v("Production:")]),i("span",{staticClass:"value"},[e.capabilities.production?[e._v("✔️")]:[e._v("❌")]],2)])]),e.capabilities.description?i("Description",{attrs:{description:e.capabilities.description}}):e._e(),i("SupportedFeatures",{attrs:{endpoints:e.capabilities.endpoints,headingTag:"h3"}}),e.capabilities.billing?i("BillingPlans",{attrs:{billing:e.capabilities.billing,headingTag:"h3"}}):e._e(),i("LinkList",{attrs:{links:e.capabilities.links,heading:"More information",headingTag:"h3"}})],1)},r=[],c=i("60a2"),o={name:"Capabilities",props:{capabilities:{type:Object,default:()=>({})},url:{type:String}},components:{BillingPlans:()=>i.e("chunk-72557604").then(i.bind(null,"1a41")),Description:()=>Promise.resolve().then(i.bind(null,"8088")),LinkList:()=>Promise.resolve().then(i.bind(null,"4845")),SupportedFeatures:()=>i.e("chunk-62b7efac").then(i.bind(null,"33af"))},computed:{title(){if("string"===typeof this.capabilities.title&&this.capabilities.title.length>0)return this.capabilities.title;try{var e=new URL(this.url);return e.hostname}catch(t){return""}},url2(){if("string"===typeof this.url)return this.url;if(Array.isArray(this.capabilities.links)){let e=this.capabilities.links.find(e=>"self"===e.rel);if(e)return e.href}return null}},beforeCreate(){c["a"].enableHtmlProps(this)}},u=o,p=(i("ea1a"),i("2877")),d=Object(p["a"])(u,l,r,!1,null,null,null),f=d.exports,h=i("a0e2"),b=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"vue-component service-types"},[i("SearchableList",{attrs:{data:e.services,summaryKey:"title",externalSearchTerm:e.searchTerm,sort:e.sort,offerDetails:e.offerDetails,heading:e.heading,collapsed:e.collapsed},scopedSlots:e._u([{key:"heading",fn:function(t){return[e._t("heading",null,null,t)]}},{key:"summary",fn:function(t){return[e._t("summary",null,null,t)]}},{key:"details",fn:function(t){return[i("ServiceType",{attrs:{id:t.summary.identifier,service:t.item},scopedSlots:e._u([{key:"title",fn:function(){return[i("span",{staticClass:"hidden"})]},proxy:!0},{key:"before-description",fn:function(t){return[e._t("service-type-before-description",null,null,t)]}},{key:"end",fn:function(t){return[e._t("service-type-end",null,null,t)]}}],null,!0)})]}}],null,!0)})],1)},m=[],v={name:"ServiceTypes",components:{SearchableList:()=>c["a"].loadAsyncComponent(i.e("chunk-2209d90f").then(i.bind(null,"d79f"))),ServiceType:()=>c["a"].loadAsyncComponent(i.e("chunk-51c7fc60").then(i.bind(null,"b64d")))},props:{services:{type:Object,default:()=>({})},searchTerm:{type:String,default:null},sort:{type:Boolean,default:!0},offerDetails:{type:Boolean,default:!0},heading:{type:String,default:"Secondary Web Services"},collapsed:{type:Boolean,default:null}},beforeCreate(){c["a"].enableHtmlProps(this)}},y=v,_=(i("35a2"),Object(p["a"])(y,b,m,!1,null,null,null)),g=_.exports,S=i("d235"),k=i("025e"),C={name:"ServerInfoModal",components:{Modal:s["a"],Capabilities:f,FileFormats:h["a"],ServiceTypes:g,UdfRuntimes:S["a"]},computed:{...k["a"].mapState(["connection","serviceTypes","udfRuntimes"]),...k["a"].mapGetters(["fileFormats"]),capabilities(){return this.connection.capabilities().toJSON()},url(){return this.connection.getBaseUrl()}},methods:{show(){this.$refs.modal.show(this.connection.capabilities().title()||"Server information")}}},T=C,w=(i("ac0a"),Object(p["a"])(T,n,a,!1,null,null,null));t["default"]=w.exports},"294b":function(e,t,i){},"35a2":function(e,t,i){"use strict";i("294b")},"9fdd":function(e,t,i){},ac0a:function(e,t,i){"use strict";i("9fdd")},b9f2:function(e,t,i){},ea1a:function(e,t,i){"use strict";i("b9f2")}}]);
//# sourceMappingURL=chunk-582c7420.408a7fbb.js.map