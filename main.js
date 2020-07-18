var open = document.getElementById('hamburger');
var changeIcon = true;

open.addEventListener("click", function(){

    var overlay = document.querySelector('.overlay');
    var nav = document.querySelector('nav');
    var icon = document.querySelector('.menu-toggle i');

    overlay.classList.toggle("menu-open");
    nav.classList.toggle("menu-open");

    if (changeIcon) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");

        changeIcon = false;
    }
    else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
        changeIcon = true;
    }
});
// back to top_nav
$("#up").on("click", function () {
    $("html, body").animate({
      scrollTop: 0
       }, 1000);
  });
//   AOS.init({
//     easing:'ease',
//     duration:1800,
//     once: true
// });
// Calendar events
(function ($, ElementQueries) {
    document.addEventListener("arlojscontrolsloaded", function () {
        var platformID = "codependemocompany.arlo.co"; // Change platformID to point at your own account

        var filter = {
            moduleType: "Filters",
            targetElement: "#filters",
            template: "#filter-template",
            filterControlId: 1
        };

        var eventList = {
            moduleType: "UpcomingEvents",
            targetElement: "#upcoming-events",
            template: "#upcoming-events-template",
            maxCount: 5,
            filterControlId: 1,
            includeLoadMoreButton: true,
            loadMoreButtonText: "Show More",
            smartDateFormats: {
                startDay: "D"
            },
            customUrls: {
                eventtemplate: "/event-template",
                venue: "/venue/",
                presenter: "/presenter/"
            },
            callbacks: {
                onShow: eventListOnShowCallback
            }
        };

        var app = new window.ArloWebControls();

        app.start({
            "platformID": platformID,
            "showDevErrors": false,
            "modules": [eventList, filter]
        });

        /* ----- Callback function ----- */

        // "OnShow" callback
        function eventListOnShowCallback(getEventListItemsFunction) {
            var listItems = getEventListItemsFunction();

            ElementQueries.init();

            // Hide timezone selector if there are no online events
            if ($(".arlo-online").length < 1) {
                $(".arlo-timezone-select").hide();
            } else {
                $(".arlo-timezone-select").show();
                $(".arlo-timezone-select").parent().css("float", "right");
            }


            // Set up tooltips
            $.each(listItems, function (index, listItem) {
                var tooltipElement = $(listItem).find('[data-toggle="tooltip"]')[0];
                if (tooltipElement) {
                    var toolTipContent = $(listItem).find('.tooltipcontent')[0];
                    if (toolTipContent) {
                        $(tooltipElement).attr('data-original-title', $(toolTipContent).html());
                        $(tooltipElement).tooltip();
                    }
                }
            });

        }

    });

    window.locationfiltertoggle = function (filter, $) {
        //jshint unused:false
        window.ElementQueries.init();
    };

    window.updateTemplateTagNames = function (filterModel, $) {
        var deleteFilterIndexes = [];
        $.each(filterModel.attributes.Values, function (index, filterValue) {
            switch (filterValue.Label) {
                case "Web_Public":
                    filterValue.Label = "Public";
                    break;
                case "Web_LiveOnline":
                    filterValue.Label = "Live Online";
                    break;
                case "Web_PrivateOnsite":
                    filterValue.Label = "Private Onsite";
                    break;
                case "Web_SelfpacedOnline":
                    filterValue.Label = "Self Paced Online";
                    break;
                default:
                    deleteFilterIndexes.push(index);
            }
        });

        $.each(deleteFilterIndexes, function (index, value) {
            filterModel.attributes.Values.splice(value - index, 1);
        });

        $('#arlo-filter-toggle').click(function () {
            $(this).parent().toggleClass('arlo-show-filter');
        });

    };

})(jQuery, window.ElementQueries);
