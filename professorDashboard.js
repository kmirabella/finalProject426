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

$(renderHome());

let Professor = {
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
};

async function renderHome() {
    // let res = await axios({
    //     method: "GET",
    //     url: "https://comp426backend.herokuapp.com/professor/",
    //     withCredentials: true
    // })


    // axios to class names

    let div = $('<div class="class_box"></div>');
    let form = $("<form id='add-info-form'></form>");
    let autoForm = $(`<input class="input" type="text" id="className" placeholder="Enter Class">`).css('width', '700px');
    form.append(autoForm);
    form.append($("<button class='button' id='create-class-button'>+</button>").on('click', submitCreateClass));
    $('h1').after(div.append(form));
    // THIS IS WHERE WE GET THE OPTIONS FOR AUTOCOMPLETE
    autocomplete(document.getElementById("className"), ["COMP110.001", 'COMP455.001', 'COMP455.002', 'COMP426.001']);
}

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

function handleError() {
    
}





