function add() {
    var todoItem = $("input").val();
    if (todoItem == "") {
      return;
    }
    $("<li>", {
      text: todoItem
    }).appendTo("ol");
  
    $("input").val("");
    var listContents = [];
    $("ol").each(function () {
      listContents.push(this.innerHTML);
    });
    localStorage.setItem("todoList", JSON.stringify(listContents));
  }
  
  function correctFormat(ob) {
    if (ob < 10) {
      ob = "0" + ob;
    }
    return ob;
  }
  
  $(function () {
    //time
    var hr12Format = true;
    var period;
    var time;
    var greeting;
  
    $(".time").dblclick(function () {
      hr12Format = !hr12Format;
    });
  
    setInterval(function () {
      var dateObject = new Date();
      var sec = correctFormat(dateObject.getSeconds());
      var min = correctFormat(dateObject.getMinutes());
      var hrs = correctFormat(dateObject.getHours());
  
      if (hr12Format) {
        if (hrs > 12) {
          hrs -= 12;
          period = "PM";
          greeting = "good afternoon";
        } else {
          period = "AM";
          greeting = "good morning";
        }
        time = hrs + ":" + min + ":" + sec + " " + period;
      } else {
        time = hrs + ":" + min + ":" + sec;
      }
  
      $(".time").text(time);
      $(".greeting").text(greeting);
    }, 100);
  
    //todo
    if (localStorage.getItem("todoList")) {
      var listContents = JSON.parse(localStorage.getItem("todoList"));
      $("ol").each(function (i) {
        this.innerHTML = listContents[i];
      });
    }
  
    $("ol").sortable();
    $("input").on("keyup", function (evt) {
      if (evt.which == 13) {
        add();
      }
    });
    $("button").on("click", add);
  
    $(document).on("dblclick", "li", function () {
      $(this).remove();
      var listContents = [];
      $("ol").each(function () {
        listContents.push(this.innerHTML);
      });
      localStorage.setItem("todoList", JSON.stringify(listContents));
    });
  });
  