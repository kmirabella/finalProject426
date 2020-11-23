


export const renderDropDownClasses = function (Professor) {
  for (let i = 0; i < Professor[0].classes.length; i++) {
    let classDrop = Professor[0].classes[i].name;
    $(".options").append(`<a href="">${classDrop}</a>`);
  }
  $(".options").append(`<a href="./profDash.html">+ Add Class</a>`);


}

export const loadProfessorView = function (Professor) {
  $("#root").on('mouseover', '.dropdown', renderDropDownClasses(Professor));
}


 async function getProfessor() {
  let professor = await axios({
      method: 'get',
      url: 'https://comp426backend.herokuapp.com/professor/0',
      withCredentrials: true

  });
  return professor; 
}

let p = getProfessor()
//console.log(p);



function getPassedIn(Professor) {
  let professor = Professor;
  //let professor = getProfessor()

  for (let i = 0; i < professor[0].classes.length; i++){
    for (let j = 0; j < professor[0].classes[i].exam_dates.length; j++) {
      let date = new Date(parseInt(professor[0].classes[i].exam_dates[j].year),parseInt(professor[0].classes[i].exam_dates[j].month), parseInt(professor[0].classes[i].exam_dates[j].day));
      let total = parseInt(professor[0].classes[i].exam_dates[j].total);
      initializeCalendar(date, total);
    }
  }
}




$(function () {
  $("#signout-button").on('click', signout);
  // let findLoggedInProf = async function(id){
  //   let req = await axios({
  //     method: "get",
  //     url: "https://comp426backend.herokuapp.com/professor" ,
  //   })
  //   console.log(req); 
  // }
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
              "year": "2020"
            },
            {
              "day": "10",
              "month": "11",
              "year": "2020"
            },
            {
              "day": "11",
              "month": "26",
              "year": "2020"
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
              "year": "2020"
            },
            {
              "day": "10",
              "month": "11",
              "year": "2020"
            },
            {
              "day": "11",
              "month": "26",
              "year": "2020"
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
  loadProfessorView(Professor);
});

async function signout() {
  await axios({
    method: "GET",
    url: "https://comp426backend.herokuapp.com/logout"
  })
}
