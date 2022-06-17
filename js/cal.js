
$.fn.dropify = function () {
    $(this).hide();
    $(this).after(
      '<div data-id="' +
        $(this).attr("id") +
        '" class="list-wrapper" index="0"><span class="selcted-value">' +
        $(this).children("option:selected").text() +
        '</span><ul style="display:none;"></ul></div>'
    );
    $(this)
      .children("option")
      .each(function () {
        $(this)
          .parent("")
          .next(".list-wrapper")
          .find("ul")
          .append("<li>" + $(this).text() + "</li>");
      });
  };
  var stuff = new Date();
  var day = stuff.getDay();
  var date = stuff.getDate();
  var month = stuff.getMonth();
  var year = stuff.getFullYear();
  var month_name = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  var nod = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  var day_name = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednessday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var tempday = ((day - (date % 7) + 7) % 7) + 1;
  var nosd;
  $.fn.calandarinit = function () {
    var cal_html =
      '<div class="info"><h2 id="clear">Today <i class="fa fa-external-link-square" aria-hidden="true"></i></h2></div><div class="in-wrap"><div class="head-wrap"> <button class="prev"> <i class="fa fa-angle-left" aria-hidden="true"></i> </button> <h4 class="year-month text-center"><select name="month" id="month" placeholder="month"> <option value="01">January</option> <option value="02">February</option> <option value="03">March</option> <option value="04">April</option> <option value="05">May</option> <option value="06">June</option> <option value="07">July</option> <option value="08">August</option> <option value="09">September</option> <option value="10">October</option> <option value="11">November</option> <option value="12">December</option> </select> <select id="year"></select></h4> <button class="next"> <i class="fa fa-angle-right" aria-hidden="true"></i> </button> </div><div class="bd-wrap"><div class="days"><div class="day">Sun</div><div class="day">Mon</div><div class="day">Tue</div><div class="day">Wed</div><div class="day">Thu</div><div class="day">Fri</div><div class="day">Sat</div></div><div class="day-blocks"> </div></div></div>';
    $(this).empty();
    $(this).append(cal_html);
    $(this)
      .find("#month")
      .children("option:nth(" + month + ")")
      .attr("selected", true);
    $(this).find(".year").text(year);
    $(".info").append(
      "<h1>" + stuff.getDate() + "</h1><h3>" + day_name[stuff.getDay()] + "</h3>"
    );
    if (month == 1 && year % 4 == 0) {
      nosd = 29;
    } else {
      nosd = nod[month];
    }
    for (var j = 0; j < tempday; j++) {
      $(this).find(".day-blocks").append('<div class="day"><span></span></div>');
    }
    for (var i = 1; i <= nosd; i++) {
      if (i != date) {
        $(this)
          .find(".day-blocks")
          .append('<div class="day-' + i + '"><span>' + i + "</span></div>");
      } else {
        $(this)
          .find(".day-blocks")
          .append(
            '<div class="day-' + i + ' active"><span>' + i + "</span></div>"
          );
      }
    }
    for (var y = 0; y <= 150; y++) {
      var yval = year - 50 + y;
      if (yval != year) {
        $("#year").append('<option value="' + yval + '">' + yval + "</option>");
      } else {
        $("#year").append(
          '<option selected="selected" value="' + yval + '">' + yval + "</option>"
        );
      }
    }
    $("#month").dropify();
    $("#year").dropify();
  
    $(".day-blocks > div").each(function () {
      $(this).height($(this).width());
    });
  };
  $.fn.goprev = function () {
    if (month == 0) {
      month = 11;
      year = year - 1;
    } else {
      month = month - 1;
    }
    if (month == 1 && year % 4 == 0) {
      nosd = 29;
    } else {
      nosd = nod[month];
    }
    tempday = ((tempday - ((nosd + 1) % 7) + 7) % 7) + 1;
    $("#wrap").calandarinit();
  };
  $.fn.gonext = function () {
    tempday = (((tempday + nosd + 1) % 7) - 1 + 7) % 7;
    if (month == 11) {
      month = 0;
      year = year + 1;
    } else {
      month = month + 1;
    }
    if (month == 1 && year % 4 == 0) {
      nosd = 29;
    } else {
      nosd = nod[month];
    }
    $("#wrap").calandarinit();
  };
  $.fn.goto = function () {
    var gdate = $(".active").find("span").text();
    var gmonth = $("#month").val();
    var gyear = $("#year").val();
    var godate = gmonth + "/" + gdate + "/" + gyear;
    var nstuff = new Date(godate);
    day = nstuff.getDay();
    date = nstuff.getDate();
    month = nstuff.getMonth();
    year = nstuff.getFullYear();
    tempday = ((day - (date % 7) + 7) % 7) + 1;
    if (month == 1 && year % 4 == 0) {
      nosd = 29;
    } else {
      nosd = nod[month];
    }
    $("#wrap").calandarinit();
  };
  $.fn.resetact = function () {
    day = stuff.getDay();
    date = stuff.getDate();
    month = stuff.getMonth();
    year = stuff.getFullYear();
    tempday = ((day - (date % 7) + 7) % 7) + 1;
    if (month == 1 && year % 4 == 0) {
      nosd = 29;
    } else {
      nosd = nod[month];
    }
    $("#wrap").calandarinit();
  };
  
  $(document).on("click", ".head-wrap button", function () {
    if ($(this).hasClass("prev")) {
      $("#wrap").goprev();
    } else {
      $("#wrap").gonext();
    }
  });
  
  $(document).on("change", "#month, #year", function () {
    $("#wrap").goto();
  });
  
  $(document).on("click", ".day-blocks > div", function () {
    if ($(this).find("span").text() != "") {
      $(this).addClass("active").siblings().removeClass("active");
    }
  });
  $(document).on("click", "#clear", function () {
    $("#wrap").resetact();
  });
  
  $(document).on("click", ".list-wrapper span", function () {
    $(this).toggleClass("opened").siblings("ul").toggle();
  });
  $(document).on("click", ".list-wrapper ul li", function () {
    $(this).parent("ul").siblings("span").text($(this).text());
    $(this)
      .parents(".list-wrapper")
      .prev()
      .children("option:nth(" + $(this).index() + ")")
      .attr("selected", true)
      .siblings()
      .attr("selected", false)
      .trigger("change");
    $(this).parent("ul").hide();
  });
  
  $(window).resize(function () {
    $(".day-blocks > div").each(function () {
      $(this).height($(this).width());
    });
  });
  
  $("#wrap").calandarinit();
  