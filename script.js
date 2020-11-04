$(document).ready(function () {
  var getHolidays = function () {
    //using moment to get the current year to pass into the requestUrl
    var year = moment().year();
    //call the calendar API to get the countries holidays in the current year
    var requestUrl = `https://holidays.abstractapi.com/v1/?api_key=7639aa293d574a51bbeed5c5a63d90ac&country=US&year=${year}`;
    //ajax call
    $.ajax({
      url: requestUrl,
      method: "GET",
    }).then(function (data) {
      console.log(data);
      //counter for how many holidays we are planning on displaying
      var holidaysDisplayed = 0;
      for (i = 0; i < data.length; i++) {
        var holiday = $("#holiday-box");
        //grabbing the date of the holidays and instantiating to a specific format
        var holidayDate = data[i].date;
        holidayDate = moment(holidayDate).format("MM/DD/YYYY");

        var holidayName = $("<h3>");
        var holidayDateEl = $("<h3>");

        holidayName.text("Holiday: " + data[i].name);
        holidayDateEl.text("Date: " + holidayDate);
        //gettng the different between the date of the holiday and the current date in days to compare in the if statement
        var difference = moment(holidayDate).diff(moment(), "d");

        //this will display the current and next 3 holidays
        if (difference >= 0) {
          //counting the holidays displayed
          holidaysDisplayed++;
          holiday.append(holidayName);
          holiday.append(holidayDateEl);
          //decided on displaying the next 3 holidays.  The return will exit out of the function once 3 have been displayed.
          if (holidaysDisplayed > 2) {
            return;
          }
        }
      }
    });
  };

  // On button click: get city from input field and display calendar
  $("#searchButton").click(function (e) {
    e.preventDefault();
    // First clear any previous calendar
    $("#calendarSection").empty();
    // Get city from text input and display TM calendar
    var city = $("#cityInput").val();
    //empty the input field after the search
    $("#cityInput").val("");
    $("#calendarSection").append(
      "<p class='title'>" +
        city +
        " Events</p><div class='projCal' w-type='calendar' w-tmapikey='hHXZ1EuJQGj9RCmG0Zi8qJAdIfdz7Sii' w-keyword='' w-theme='calendar' w-colorscheme='light' w-width='298' w-height='400' w-size='50' w-border='1' w-borderradius='4' w-postalcode='' w-radius='25' w-countrycode='US' w-city=" +
        city +
        " w-period='week' w-periodweek='week' w-layout='vertical' w-classificationid='' w-attractionid='' w-promoterid='' w-venueid='' w-affiliateid='' w-segmentid='' w-proportion='standart' w-latlong=''></div>"
    );
    $.getScript(
      "https://ticketmaster-api-staging.github.io/products-and-docs/widgets/calendar/1.0.0/lib/main-widget.js",
      function () {
        console.log("Load was performed.");
      }
    );
  });

  getHolidays();
});
