const vizObjects = {
  adHocViews: [{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/Article_Ratings_Over_Time",
      error: handleError,
    },{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/Article_Ratings_By_Author",
      error: handleError,
    },{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/Article_Ratings_Over_Time__Table_",
      linkOptions: {
        events: {
          click: tableClick,
        }
      },
      error: handleError,
    },{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/Article_Views_Over_Time__Table_",
      linkOptions: {
        events: {
          click: tableClick,
        }
      },
      error: handleError,
    },{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/Average___of_New_KAs_per_Month",
      error: handleError,
    },{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/KAs_by_Month__Table_",
      linkOptions: {
        events: {
          click: tableClick,
        }
      },
      error: handleError,
    },{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/KA_Comments_By_Month__Chart_",
      error: handleError,
    },{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/_test",
      linkOptions: {
        events: {
          click: tableClick,
        }
      },
      error: handleError,
    },
  ],

  filters: [{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/Article_Ratings_Over_Time",
      error: handleError,
    },{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/Article_Ratings_By_Author",
      error: handleError,
    },{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/Article_Views_Over_Time__Table_",
      error: handleError,
    },{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/Average___of_New_KAs_per_Month",
      error: handleError,
    },{
      resource: "/public/Jaspersoft_Community_Wiki_Reporting/Ad_Hoc_Views/KA_Comments_By_Month__Chart_",
      error: handleError,
    },
  ],

  reports: [{

  }],

  dashboards: [{

  }]
}

function tableClick(ev, data) {
  //The "if" condition is there so that only Table rows are clickable
  if (ev.currentTarget.nodeName === "TD" &&
      ev.currentTarget.getAttribute('colspan') === "1") {
    window.open(data["node_derived_table.full_url"]);
  }
}

function handleError(e) {
  console.log(e);
}

export { vizObjects };
