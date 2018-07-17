let vizObjects = {
    adHocViews: [{
    resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/Article_Ratings_Over_Time__Table_",
    linkOptions: {
      events: {
        click: function(ev, data) {
          //The "if" condition is there so that only Table rows are clickable
          if (ev.currentTarget.nodeName === "TD" &&
              ev.currentTarget.getAttribute('colspan') === "1") {
            window.open(data["node_derived_table.full_url"]);
          }
        }
      }
    },
    success: function() {
      console.log("Ad Hoc view rendered!");
    },
    error: function(e) {
      console.log(e);
    }
  }, {
    resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/Article_Ratings_Over_Time",
    error: function(e) {
      console.log(e);
    }
  },{
    resource: "/public/Samples/Ad_Hoc_Views/06__Sales_Mix_by_Gender",
    error: function(e) {
      console.log(e);
    }
  },{
    resource: "/public/Samples/Ad_Hoc_Views/04__Product_Results_by_Store_Type",
    error: function(e) {
      console.log(e);
    }
  },{
    resource: "/public/Samples/Ad_Hoc_Views/11__Top_5_Products_by_City",
    error: function(e) {
      console.log(e);
    }
  }],

  filters: [{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/Article_Ratings_Over_Time__Table_",
      error: function (e) {
        alert(e);
      }
  },{
      resource: "/public/Samples/Ad_Hoc_Views/06__Sales_Mix_by_Gender",
      error: function (e) {
        alert(e);
      }
  },{
      resource: "/public/Samples/Ad_Hoc_Views/04__Product_Results_by_Store_Type",
      error: function (e) {
        alert(e);
      }
  }],

  reports: [{
    resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Reports/Article_Ratings_Over_Time__Table__Report",
    linkOptions: {
      events: {
        "click": function(ev, link) {
          console.log(link);
        }
      }
    },
    success: function() {
      console.log("Report rendered!");
    },
    error: function(e) {
      console.log(e);
    }
  }],

  dashboards: [{
    resource: "/public/Jaspersoft_Community_Wiki_Reporting/Dashboards/Ratings_Over_Time__based_on_Ad_Hoc_Report_",
    linkOptions: {
      events: {
        click: function(ev, data) {
          console.log(data);
        }
      }
    },
    success: function() {
      // for (let i in this.data().components) {
      //   console.log("Dashboard component - " + JSON.stringify(this.data().components[i]));
      // }
    },
    error: function(e) {
      console.log(e);
    }
  }]
}

export { vizObjects };
