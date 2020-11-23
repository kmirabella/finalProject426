
let initializeCalendar =  (date, total)=> {
  //var finalDate = date;
  var finalTotal = total;
    // Initialize random data for the demo
    var now = new Date (2020,10,25);
      var time_ago = new Date (2020, 7, 7)
      var example_data = d3.timeDays(time_ago, now).map(function (finalDate, index) {
    var finalDate = date;
        return {
          date: finalDate,
          details: Array.apply(null, new Array(Math.floor(Math.random() * 15))).map(function(e, i, arr) {
            return {
              'name': '',
              'date': finalDate,
              'value': 3600 * ((arr.length - i) / 5) + Math.floor(Math.random() * 3600) * Math.round(Math.random() * (index / 365))
            }
          }),
          init: function () {
            this.total = finalTotal;
            return this;
        }
      }.init();
    });
    

    // Set the div target id
    var div_id = 'calendar';

    // Set custom color for the calendar heatmap
    var color = '#cd2327';

    // Set overview type (choices are year, month and day)
    var overview = 'year';

    // Handler function
    var print = function (val) {
      console.log(val);
    };

    // Initialize calendar heatmap
    calendarHeatmap.init(example_data, div_id, color, overview, print);
  };

  export const renderDropDownClasses = function(Professor){
    for(let i =0; i < Professor[0].classes.length; i++){
      let classDrop = Professor[0].classes[i].name;
      $(".options").append(`<a href="">${classDrop}</a>`);
    }
    

    
  }

  export const loadProfessorView = function(Professor) {    
    const $root = $('#root');    
    $("#root").on('mouseover','.dropdown', renderDropDownClasses(Professor));   
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
                        "month": "2",
                        "year": "2020",
                        "total": "1"
                    },
                    {
                        "day": "10",
                        "month": "11",
                        "year": "2020",
                        "total": "3"
                    },
                    {
                        "day": "11",
                        "month": "3",
                        "year": "2020",
                        "total": "1"
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
                        "day": "19",
                        "month": "4",
                        "year": "2020",
                        "total": "150"
                    },
                    {
                        "day": "30",
                        "month": "8",
                        "year": "2020",
                        "total": "15"
                    },
                    {
                        "day": "2",
                        "month": "1",
                        "year": "2020",
                        "total": "59"
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
initializeCalendar(new Date(2020,4,5),5);
getPassedIn(Professor);
loadProfessorView(Professor);    
});
