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
let dateObj2;
$(function () {
  // let professor = await axios({
  //   method: 'get',
  //   url: 'https://comp426backend.herokuapp.com/professor/:id',
  //   withCredentrials: true

  // });
  dateObj = {}; 
  dateObj2 ={};
  Professor[0].classes.forEach((c) => {
    c.exam_dates.forEach((e) => {
      let date = $(`<td>${e.month}/${e.day}/${e.year}</td>`);
      let count = $(`<td>${e.total}</td>`);
      let row = $("<tr></tr>");
      
      dateObj[e.month +"/"+ e.day +"/"+e.year ] = e.total; 
      dateObj2[e.total] = e.month +"/"+ e.day +"/"+e.year ; 

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
  $("#search-button").on('click', searchDate);
 
});

function searchDate() {
  $("#search-field").removeClass('is-danger');
  let value = $("#search-field").val();
  if (value == "") {
    $("#search-field").addClass('is-danger');
    return;
  }
  let countDate = null
  countDate = dateObj[value];
  if (countDate ==null) {
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
  for (let x= 0; x < dates.length; x++) {
    dates[x] = parseInt(dates[x].join('')); 
  }
  for (let r= 0; r < dates.length; r++) {
    dates[r]=dates[r].toString(); 
    if(dates[r].length != 8){
      dates[r] = "0" + dates[r];
    }
  }
  dates = dates.sort(); 

  
  
  let dateString; 
  let dateArr= [];
  for (let i = 0; i < dates.length; i++) {
    dateString =dates[i].charAt(0) + dates[i].charAt(1) + "/" + dates[i].charAt(2) +dates[i].charAt(3)+"/" +dates[i].charAt(4) +dates[i].charAt(5)+dates[i].charAt(6)+dates[i].charAt(7);
    dateArr.push(dateString);
  }
  for(let u =0; u<dateArr.length; u++){
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
  
  count.sort((a,b)=>(a-b));  
  
  for(let u =0; u<count.length; u++){
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

