
let initializeCalendar =  ()=> {
    // Initialize random data for the demo
    var now = moment().endOf('day').toDate();
    var time_ago = moment().startOf('day').subtract(10, 'year').toDate();
    var example_data = d3.timeDays(time_ago, now).map(function (dateElement, index) {
      return {
        date: dateElement,
        details: Array.apply(null, new Array(Math.floor(Math.random() * 15))).map(function(e, i, arr) {
          return {
            'name': 'Project ' + Math.ceil(Math.random() * 10),
            'date': function () {
              var projectDate = new Date(dateElement.getTime());
              projectDate.setHours(Math.floor(Math.random() * 24));
              projectDate.setMinutes(Math.floor(Math.random() * 60));
              return projectDate;
            }(),
            'value': 3600 * ((arr.length - i) / 5) + Math.floor(Math.random() * 3600) * Math.round(Math.random() * (index / 365))
          }
        }),
        init: function () {
          this.total = this.details.reduce(function (prev, e) {
            return prev + e.value;
          }, 0);
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

  const renderDropDownClasses = function(){
    
  }

  const loadProfessorView = async function () {
    const $root = $('#root');
    $("#root").on('click', '.classOption', initializeCalendar());
    
}


  $(function () {
    loadProfessorView();
});