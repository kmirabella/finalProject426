$(renderStudentView());

async function getStudent() {
    let req = await axios({
        method: "GET",
        url: "https://comp426backend.herokuapp.com/student",
        withCredentials: true,
    });
    return req.data;
}

async function getClassNames(id) {
    let req = await axios({
        method: "GET",
        url: `https://comp426backend.herokuapp.com/student/classnames/` + id,
        withCredentials: true
    });
    return req.data;
}

async function renderStudentView() {
    const $root = $("#root");
    let counter = 0;
    let student = await getStudent();
    let classes = null;
    console.log(student);
    if (student.length != 0) {
        classes = await getClassNames(student.id);
    }

    let dates = student.dates;

    // let req = await axios({
    //     method: "GET",
    //     url: "https://comp426backend.herokuapp.com/student",
    //     withCredentials: true,
    // });
    //console.log(req);

    //req.body.classes.forEach((c) => classes.push(c));

    //render student's existing classes and exam dates
    // assign global 'classes' var to the correct student's classes
    $("#add-view").append(renderAddForm());
    $("#add-view").append('<h1 class="has-text-centered title is-1">My Classes</h1><hr>');
    if (classes!=null && classes.length > 0) {
        classes.forEach((c) => renderClassView(c));
    }
    //else {
    //     $("#add-view").append(renderAddForm());
    // }

    $("#add-date").append(renderAddDateForm());
    $("#add-date").append('<h1 class="has-text-centered title is-1">My Exam Dates</h1><hr>');
    if (dates.length > 0) {
        dates.forEach((c) => renderDateView(c));
    }

    async function updateDates(date) {
        student.dates[student.dates.length] = date;
        //console.log(student);

        let req = await axios({
            method: "PUT",
            url: `https://comp426backend.herokuapp.com/student/${student.id}/create`,
            withCredentials: true,
            body: {
                "class_ids": student.classes,
                "dates": student.dates,
            }
        });
    }

    function renderAddForm() {
        let formView = $('<div class="class_box" id="class_display"></div>');
        let form = $("<form id='add-info-form'></form>");
        let autocomplete = $(`<input class="input" type="text" id="className" placeholder="Enter Class Code">`).css('width', '700px');
        let addAutoButton = $(`<button type="button" class="button">+</button>`).on('click', addClassSelector);
        form.append(autocomplete).append(addAutoButton);
        formView.append(form);


        return formView;
    }

    function renderAddDateForm() {
        let formView = $('<div class="class_box" id="class_display"></div>');
        let form = $("<form id='add-info-form'></form>");
        let autocomplete = $(`<input class="input" type="text" id="month" placeholder="Enter Month as MM">
        <input class="input" type="text" id="day" placeholder="Enter Day as DD">
        <input class="input" type="text" id="year" placeholder="Enter Year as YYYY">`).css('width', '250px');
        let addAutoButton = $(`<button type="button" class="button">+</button>`).on('click', addDateSelector);
        form.append(autocomplete).append(addAutoButton);
        formView.append(form);


        return formView;
    }

    async function addClassSelector() {
        let className = {
            "name": $("#className").val()
        };
        renderClassView(className);

        await axios({
            method: "PUT",
            url: `https://comp426backend.herokuapp.com/student/${student.id}/create`,
            body: {
                "name": className.code
            }
        })
    }

    function addDateSelector() {
        if ($("#day").val().length !== 2 || $("#month").val().length !== 2 || $("#year").val().length !== 4 ||
            $("#day").val() === "" || $("#month").val() === "" || $("#year").val() === "") {
            alert("Your date should be formated MM DD YYY");
            return;
        }

        let day = $("#day").val();
        let month = $("#month").val();
        let year = $("#year").val();
        let newDate = {
            "day": day,
            "month": month,
            "year": year
        };

        updateDates(newDate);
        renderDateView(newDate);
        location.reload;
    }

    function renderClassView(c) {
        //let $classView = $('<div class="class_box" id="class-display"></div>');
        let $className = $(`<h5 class="has-text-centered subtitle is-4">${c.name}</h5>`);
        $("#add-view").append($className);
        //let buttons
        // if (c.exam_dates.length > 0) {
        //     $className.append('<hr><h1 class="subtitle is-2">Exam Dates</h1>');
        //     c.exam_dates.forEach((date) => {
        //         //let $dateDiv = $('<div class="is-flex-direction-column is-align-content-space-between"></div>')
        //         let $date = $(`<p class="subtitle is-5">${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}</p>`);
        //         $className.append($date);
        //     });
        // } else {
        //     $className.append("<h3>There are no exam dates set up for this class.</h3>")
        // }
        //$root.append($classView);
    }

    function renderDateView(c) {
        let $className = $(`<h5 class="has-text-centered subtitle is-4">${c.month}/${c.day}/${c.year}</h5>`);
        $("#add-date").append($className);
    }
}

//autocomplete
function autocomplete(myInput, classArray) {
  myInput.addEventListener("input", function (e) {
    minimizeOptions();
    var val = this.value;
    if (!val) {
      return;
    }

    var a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    this.parentNode.appendChild(a);

    for (var i = 0; i < classArray.length; i++) {
      if (classArray[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        var b = document.createElement("DIV");
        b.innerHTML = "<strong>" + classArray[i].substr(0, val.length) + "</strong>";
        b.innerHTML += classArray[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + classArray[i] + "'>";
        b.addEventListener("click", function (e) {
          myInput.value = this.getElementsByTagName("input")[0].value;
          minimizeOptions();
        });
        a.appendChild(b);
      }
    }
  });



  function minimizeOptions(item) {
    var classList = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < classList.length; i++) {
      if (item != classList[i] && item != myInput) {
        classList[i].parentNode.removeChild(classList[i]);
      }
    }
  }

}

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var incorporateDebounce = debounce(function () {
  let classList = [];
  classes.forEach((c) => classList.push(c.name));
  autocomplete(document.getElementById("className"), classList)
}, 250);
