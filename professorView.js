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
            "day": "09",
            "month": "03",
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
            "month": "02",
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
let dateObj; 
$(function () {
  // let professor = await axios({
  //   method: 'get',
  //   url: 'https://comp426backend.herokuapp.com/professor/:id',
  //   withCredentrials: true

  // });
  let dictArr= []; 
  dateObj = {}; 
  Professor[0].classes.forEach((c) => {
    c.exam_dates.forEach((e) => {
      let date = $(`<td>${e.month}/${e.day}/${e.year}</td>`);
      let count = $(`<td>${e.total}</td>`);
      let row = $("<tr></tr>");
      
      dateObj[e.month +"/"+ e.day +"/"+e.year ] = e.total; 

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
  $("#exam-header").on('click', sortByExam);
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
  for (let x= 0; x < dates.length; x++) {
    dates[x] = parseInt(dates[x].join('')); 
  }

  
  dates = dates.sort(); 
  for (let r= 0; r < dates.length; r++) {
    dates[r]=dates[r].toString(); 
  }
  let dateString; 
  let dateArr= [];
  for (let i = 0; i < dates.length; i++) {
    dateString =dates[i].charAt(0) + dates[i].charAt(1) + "/" + dates[i].charAt(2) +dates[i].charAt(3)+"/" +dates[i].charAt(4) +dates[i].charAt(5)+dates[i].charAt(6)+dates[i].charAt(7);
    dateArr.push(dateString);
  }
  for(let u =0; u<dateArr.length; u++){
    let countDate = dateObj[dateArr[u]];
    console.log(countDate); 
    let tableDate = $(`<tr><td>${dateArr[u]}</td><td>${countDate}</td></tr>`);
    $("tbody").append(tableDate);
  }
  // $("tbody").forEach((c) => {
  //   console.log(c);
  // })
}

 function sortByExam() {
  // let rows = $("tr:not(:first)").detach().toArray();
  // let total = [];
  // rows.forEach((r) => {
  //   total.push($(r).find("td:first").text());
  //   console.log(total);
  // })

 }

async function signout() {
  await axios({
    method: "GET",
    url: "https://comp426backend.herokuapp.com/logout"
  })
}
