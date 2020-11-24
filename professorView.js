let Professor =
{
  "0": {
    "id": 0,
    "firstName": "Kaitlyn",
    "lastName": "Mirabella",
    "email": "test@unc.edu",
    "user": "kaitlyn",
    "classes": [
      {
        "id": 0,
        "name": "comp110.001",
        "exam_dates": [
          {
            "day": "09",
            "month": "03",
            "year": "2020",
            "total": "12"
          },
          {
            "day": "09",
            "month": "11",
            "year": "2020",
            "total": "92"
          },
          {
            "day": "11",
            "month": "02",
            "year": "2020",
            "total": "128"
          }
        ],
        "my_exams": [{
          "day": "3",
          "month": "09",
          "year": "2020"
        }],
        "students": [
          {
            "password": "comp123",
            "name": "Kaitlyn",
            "type": "Student"
          },
          {
            "password": "comp123",
            "name": "Kush",
            "type": "student"
          }
        ]
      },
      {
        "id": 1,
        "name": "comp426.001",
        "exam_dates": [
          {
            "day": "12",
            "month": "09",
            "year": "2020",
            "total": "3"
          },
          {
            "day": "10",
            "month": "11",
            "year": "2020",
            "total": "426"
          },
          {
            "day": "11",
            "month": "04",
            "year": "2020",
            "total": "198"
          }
        ],
        "students": [
          {
            "password": "comp123",
            "name": "Kaitlyn",
            "type": "Student"
          },
          {
            "password": "comp123",
            "name": "Kush",
            "type": "student"
          }
        ]
      }
    ]
  }
};
export const renderTable = () => {
  location.reload();
}

let dateObj;
let dateObj2;

async function getProfId(){
  let professor = await axios({
    method: 'get',
    url: 'https://comp426backend.herokuapp.com/professor/',
    withCredentrials: true
  });
  return await professor;
}

$(function () {

  console.log("it works");
  console.log(getProfId());
  

  dateObj = {};
  dateObj2 = {};
  Professor[0].classes.forEach((c) => {
    c.exam_dates.forEach((e) => {
      let date = $(`<td>${e.month}/${e.day}/${e.year}</td>`);
      let count = $(`<td>${e.total}</td>`);
      let row = $("<tr></tr>");

      dateObj[e.month + "/" + e.day + "/" + e.year] = e.total;
      dateObj2[e.total] = e.month + "/" + e.day + "/" + e.year;

      row.append(date).append(count);
      $("tbody").append(row);
      $("#personal-exams").append($(`<p>${e.month}/${e.day}/${e.year} – ${c.name.toUpperCase()}</p>`).css('font-size', '1.1em'))
    })
  })

  let div = $('<div class="class_box"></div>');
  let form = $("<form id='add-info-form'></form>");
  let autoForm = $(`<input class="input ml-6" type="text" id="className" placeholder="Enter Class">`).css('width', '50%');
  form.append(autoForm);
  form.append($("<button class='button' id='create-class-button'>+</button>").on('click', submitCreateClass));
  $('#add-class-column').append(div.append(form));
  // THIS IS WHERE WE GET THE OPTIONS FOR AUTOCOMPLETE
  autocomplete(document.getElementById("className"), ["COMP110.001", 'COMP455.001', 'COMP455.002', 'COMP426.001']);



  $("#signout-button").on('click', signout);
  // let findLoggedInProf = async function(id){
  //   let req = await axios({
  //     method: "get",
  //     url: "https://comp426backend.herokuapp.com/professor" ,
  //   })
  //   console.log(req); 
  // }

  // $("#search-button").on('click', searchHandler);
  $("#date-header").on('click', sortByDate);
  $("#exam-header").on('click', sortByExam);
  $("#search-button").on('click', searchDate);
  $("#backButton").on('click', renderTable);
  renderBusiestDays();
  $("p").addClass('has-text-centered')
});


async function submitCreateClass(e) {
  $("#error-message").remove()
  e.preventDefault();
  let className = $("#className").val();
  if (className == "") {
    $("div.class_box").append($("<h2 id='error-message'>Error</h2>"));
    return;
  }
  // await axios({
  //     method: "PUT",
  //     url: "https://comp426backend.herokuapp.com/professor/createclass/:id",

  // })
  window.location.href = "./professorView.html"
}

export function renderBusiestDays() {
  let rows = $("tr:not(:first)").toArray();
  let count = [];
  rows.forEach((r) => {
    count.push($(r).find("td:last").text());
  })
  count.sort((a, b) => (a - b));
  for (let u = count.length - 1; u > count.length - 6; u--) {
    let date = dateObj2[count[u]];
    console.log(dateObj2[count[u]]);
    let d = new Date(date);
    d = d.toDateString();

    let tableDate = $(`<p>${d.substring(4, d.length + 1)} – ${count[u]} students have an exam.</p>`).css('font-size', '1.1em');
    $("#busiest-list").append(tableDate);
  }
}

function searchDate() {
  $("#search-field").removeClass('is-danger');
  let value = $("#search-field").val();
  if (value == "") {
    $("#search-field").addClass('is-danger');
    return;
  }
  let countDate = null
  countDate = dateObj[value];
  if (countDate == null) {
    $("tbody").replaceWith($(`<h2>No students have an exam on ${value}</h2>`));
  }
  let tableDate = $(`<tr><td>${value}</td><td>${countDate}</td></tr>`);
  $("tbody").replaceWith(tableDate);


}

function sortByDate(event) {
  let rows = $("tr:not(:first)").detach().toArray();
  let dates = [];
  rows.forEach((r) => {
    dates.push($(r).find("td:first").text());
  })

  for (let i = 0; i < dates.length; i++) {
    dates[i] = dates[i].split('/');
  }
  for (let x = 0; x < dates.length; x++) {
    dates[x] = parseInt(dates[x].join(''));
  }
  for (let r = 0; r < dates.length; r++) {
    dates[r] = dates[r].toString();
    if (dates[r].length != 8) {
      dates[r] = "0" + dates[r];
    }
  }
  dates = dates.sort();



  let dateString;
  let dateArr = [];
  for (let i = 0; i < dates.length; i++) {
    dateString = dates[i].charAt(0) + dates[i].charAt(1) + "/" + dates[i].charAt(2) + dates[i].charAt(3) + "/" + dates[i].charAt(4) + dates[i].charAt(5) + dates[i].charAt(6) + dates[i].charAt(7);
    dateArr.push(dateString);
  }
  for (let u = 0; u < dateArr.length; u++) {
    let countDate = dateObj[dateArr[u]];
    let tableDate = $(`<tr><td>${dateArr[u]}</td><td>${countDate}</td></tr>`);
    $("tbody").append(tableDate);
  }
  // $("tbody").forEach((c) => {
  //   console.log(c);
  // })
}

function sortByExam() {
  let rows = $("tr:not(:first)").detach().toArray();
  let count = [];
  rows.forEach((r) => {
    count.push($(r).find("td:last").text());
  })

  count.sort((a, b) => (a - b));

  for (let u = 0; u < count.length; u++) {
    let date = dateObj2[count[u]];
    let tableDate = $(`<tr><td>${date}</td><td>${count[u]}</td></tr>`);
    $("tbody").append(tableDate);
  }
}

async function signout() {
  await axios({
    method: "GET",
    url: "https://comp426backend.herokuapp.com/logout"
  })
}

// ===============================AUTOCOMPLETE==================================
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
// =============================END AUTOCOMPLETE==================================
