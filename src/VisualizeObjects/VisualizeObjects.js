let vizObjects = {
    adHocViews: [{
    resource: "/public/Samples/Ad_Hoc_Views/05__Unit_Sales_Trend",
    // container: "#adhocContainer",
    params: {
      c_country_1: ["Mexico"],
    },
    success: function() {
      console.log("Ad Hoc view rendered!");
    },
    error: function(e) {
      console.log(e);
    }
  },{
    resource: "/public/Samples/Ad_Hoc_Views/06__Sales_Mix_by_Gender",
    // container: "#adhocContainer1",
    // params: {
    //   c_country_1: ["Canada"],
    // },
    success: function() {
      console.log("Ad Hoc view rendered!");
    },
    error: function(e) {
      console.log(e);
    }
  }],

  filters: [{
      resource: "/public/Samples/Ad_Hoc_Views/05__Unit_Sales_Trend",
      // success: function (data) {
      //   console.log(data);
      // },
      error: function (e) {
        alert(e);
      }
  },{
      resource: "/public/Samples/Ad_Hoc_Views/06__Sales_Mix_by_Gender",
      error: function (e) {
        alert(e);
      }
  }]
}

export { vizObjects };
