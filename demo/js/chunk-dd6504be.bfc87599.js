(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dd6504be"],{8044:function(s,t,a){"use strict";a("f252")},f252:function(s,t,a){},fd61:function(s,t,a){"use strict";a.r(t);var e=function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("Modal",{ref:"modal",attrs:{minWidth:"85%"},scopedSlots:s._u([{key:"main",fn:function(){return[a("section",{staticClass:"vue-component basedata"},[a("div",{staticClass:"tabular"},[a("label",[s._v("ID:")]),s._v(" "),a("code",{staticClass:"value"},[s._v(s._s(s.job.id))])])]),a("section",{staticClass:"vue-component progress"},[a("h3",[s._v("Progress")]),a("div",{staticClass:"tabular"},[a("label",[s._v("Submitted:")]),s._v(" "),a("span",{staticClass:"value"},[s._v(s._s(s.created))])]),a("div",{staticClass:"tabular"},[a("label",[s._v("Updated:")]),s._v(" "),a("span",{staticClass:"value"},[s._v(s._s(s.updated))])]),a("div",{staticClass:"tabular"},[a("label",[s._v("Status:")]),s._v(" "),a("span",{staticClass:"value status",attrs:{"data-value":s.job.status}},[s._v(s._s(s.job.status))])]),"number"===typeof s.job.progress?a("div",{staticClass:"tabular"},[a("label",[s._v("Progress:")]),s._v(" "),a("div",{staticClass:"value"},[a("div",{staticClass:"progressBar",class:{error:!!s.job.error}},[a("div",{staticClass:"completed",style:"width: "+s.progress},[s.job.progress>50?a("span",{staticClass:"number"},[s._v(s._s(s.progress))]):s._e()]),s.job.progress<=50?a("span",{staticClass:"number"},[s._v(s._s(s.progress))]):s._e()])])]):s._e()]),s.job.plan||s.job.costs||s.job.budget?a("section",{staticClass:"vue-component billing"},[a("h3",[s._v("Billing")]),s.job.plan?a("div",{staticClass:"tabular"},[a("label",[s._v("Billing plan:")]),s._v(" "),a("span",{staticClass:"value"},[s._v(s._s(s.job.plan))])]):s._e(),s.job.costs?a("div",{staticClass:"tabular"},[a("label",[s._v("Costs:")]),s._v(" "),a("span",{staticClass:"value"},[s._v(s._s(s.formatCurrency(s.job.costs)))])]):s._e(),s.job.budget?a("div",{staticClass:"tabular"},[a("label",[s._v("Budget:")]),s._v(" "),a("span",{staticClass:"value"},[s._v(s._s(s.formatCurrency(s.job.budget)))])]):s._e()]):s._e(),s.job.description?a("section",{staticClass:"vue-component description"},[a("h3",[s._v("Description")]),a("Description",{attrs:{description:s.job.description}})],1):s._e(),a("section",{staticClass:"process-graph"},[a("div",{staticClass:"vue-component"},[a("h3",[s._v("Process")])]),a("Editor",{staticClass:"infoViewer",attrs:{value:s.job.process,editable:!1,id:"jobPgViewer"}})],1)]},proxy:!0}])})},o=[],i=a("025e"),r=a("2930"),l=a("8088"),c=a("ceb0"),n={name:"JobInfoModal",components:{Description:l["default"],Editor:c["default"],Modal:r["a"]},computed:{...i["a"].mapGetters(["formatCurrency"]),created(){return i["a"].formatDateTime(this.job.created)},updated(){return this.job.updated?i["a"].formatDateTime(this.job.updated):"N/A"},displayTitle(){return"Batch Job: "+(this.job.title||"#"+this.job.id)},progress(){return"number"===typeof this.job.progress?Math.round(10*this.job.progress)/10+"%":"0%"}},data(){return{job:{}}},methods:{show(s){this.job=s,this.$refs.modal.show(this.displayTitle)}}},u=n,d=(a("8044"),a("2877")),b=Object(d["a"])(u,e,o,!1,null,"32bc5c4c",null);t["default"]=b.exports}}]);
//# sourceMappingURL=chunk-dd6504be.bfc87599.js.map