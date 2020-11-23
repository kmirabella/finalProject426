const $root = $("#root");
let class1 = {
    name: "COMP110.001",
    exam_dates: [new Date(2020, 10, 17), new Date(2020, 8, 30)]
}
let class2 = {
    name: "COMP544.001",
    exam_dates: [new Date(2020, 10, 13), new Date(2020, 9, 7)]
}
let classes = [class1, class2];

$(renderStudentView());

async function renderStudentView() {
    // let req = await axios({
    //     method: "GET",
    //     url: "https://comp426backend.herokuapp.com/student/:id"
    //     //login credentials ?
    // })
    //req.body.classes.forEach((c) => classes.push(c));

    //render student's existing classes and exam dates
    // assign global 'classes' var to the correct student's classes
    if (classes.length > 0) {
        classes.forEach((c) => renderClassView(c));
    }
    $("#new-class-button").on('click', renderAddClassForm);
    //load autocomplete functionality for class selection
}

function renderClassView(c) {
    let $classView = $('<div class="class_box" id="class-display"></div>');
    let $className = $(`<h1 class="has-text-centered">${c.name}</h1><hr>`);
    $classView.append($className);
    if (c.exam_dates.length > 0) {
        $className.append('<h2>Exam Dates</h2>');
        c.exam_dates.forEach((date) => {
            let $date = $(`<p>${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}</p>`);
            $className.append($date);
        });
    } else {
        $className.append("<h3>There are no exam dates set up for this class.</h3>")
    }
    $root.append($classView);

}

function renderAddClassForm(event) {
    $("#new-class-button").hide();
    let $classesView = $('<div class="class_box" id="class_display"></div>');
    let $classInfoForm = $("<form id='create-class-form'></form>");
    $classesView.append($classInfoForm);
    let $classNameDropdown = $(`<input type="text" id="className" placeholder="Enter Class"><hr>`);
    $classInfoForm.append($classNameDropdown);

    $root.append($classesView)
    $("#new-class-button").on('click', autocomplete(document.getElementById("className"), classes.map((c) => c.name)))
}


// // ===============================AUTOCOMPLETE==================================
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






//var classes = ["COMP426.001", "COMP455.001", "COMP455.002", "COMP550.001", "COMP550.002", "COMP410.001", "COMP410.002", "COMP411.001", "COMP411.002", "COMP411.003", "COMP411.004"];
//autocomplete(document.getElementById("className"), classes);






// function getClassEdit() {
//     let classEditHtml = '<span><div class="class_box" id="class_edit"><h1>Course Code</h1><input value="C426001"><hr><input value="11/01/2020"><span><button type="submit">delete</button></span><br><input value="9/12/2020"><span><button type="submit">delete</button></span><br><input value="10/08/2020"><span><button type="submit">delete</button></span><br><input value="8/24/2020"><span><button type="submit">delete</button></span><br><button type="submit">+ add date</button><button type="submit">Submit Changes</button><button type="submit" id="cancel_button">Cancel</button></div></span>';

//     return classEditHtml;
// }

// const loadFeed = function () {

//     // axios to pull student's classes with updated exam dates 
//     // and display them
//     const $root = $('#root');
//     $root.append(renderAddClassForm());

//     const loadEdit = function () {
//         let classEditHtml = getClassEdit();
//         let oldClassDisplay = document.querySelector("#class_display");
//         const newClassEditDisplay = document.createElement("span");
//         newClassEditDisplay.innerHTML = classEditHtml;
//         oldClassDisplay.parentNode.replaceChild(newClassEditDisplay, oldClassDisplay);
//     }
//     $root.on("click", '#edit_button', loadEdit);

//     const loadClass = function () {
//         let classEditHtml = renderAddClassForm();
//         let oldClassDisplay = document.querySelector("#class_edit");
//         const newClassEditDisplay = document.createElement("span");
//         newClassEditDisplay.innerHTML = classEditHtml;
//         oldClassDisplay.parentNode.replaceChild(newClassEditDisplay, oldClassDisplay);
//     }
//     $root.on("click", '#cancel_button', loadClass);
// }

// async function loadClass() {
//     /** axios to get class info
//      * let req = await axios({
//         method: 'GET',
//         url: "http://WWW.URL.COM/student/:id/"
//     })
//      */
//     //classname
//     //let classes = req.body.classes; as an array of class objects

//     let classView = $("<div class='box '></div>")
//         .css('display', 'flex')
//         .css('flex-flow', 'column-wrap');
//     // classes.forEach((c) => {
//     //     $("<")
//     // })
//     //exams
// }


/**  let prof = axios request to get prof object 
 *  prof.classes.forEach((c) => {
 *      let numberOfOtherExamsStudentHave - c.forEach((s) => {
 *             
 *  })
 * })
 * */
