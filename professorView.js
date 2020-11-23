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
        "name": "comp110_001",
        "exam_dates": [
          {
            "day": "9",
            "month": "24",
            "year": "2020",
            "total": "12"
          },
          {
            "day": "10",
            "month": "11",
            "year": "2020",
            "total": "92"
          },
          {
            "day": "11",
            "month": "26",
            "year": "2020",
            "total": "128"
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
      },
      {
        "id": 1,
        "name": "comp426_001",
        "exam_dates": [
          {
            "day": "9",
            "month": "24",
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
            "month": "26",
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

$(function () {
  // let professor = await axios({
  //   method: 'get',
  //   url: 'https://comp426backend.herokuapp.com/professor/:id',
  //   withCredentrials: true

  // });
  Professor[0].classes.forEach((c) => {
    c.exam_dates.forEach((e) => {
      console.log(c);
      let date = $(`<td>${e.month}/${e.day}/${e.year}</td>`);
      let count = $(`<td>${e.total}</td>`);
      let row = $("<tr></tr>");
      row.append(date).append(count);
      $("tbody").append(row);
    })
  })
  $("tbody")

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
  // $("#exam-header").on('click', sortByExam);
});

// function searchHandler() {

// }

function sortByDate(event) {
  let rows = $("tr:not(:first)").detach().toArray();
  let dates = [];
  rows.forEach((r) => {
    dates.push($(r).find("td:first").text());
  })

  for (let i = 0; i < dates.length; i++) {
    dates[i] = dates[i].split('/');
  }
  dates.sort((a, b) => a.valueOf() - b.valueOf()); s
  console.log(dates);

  // $("tbody").forEach((c) => {
  //   console.log(c);
  // })
}

// function sortByExam() {

// }

async function signout() {
  await axios({
    method: "GET",
    url: "https://comp426backend.herokuapp.com/logout"
  })
}
