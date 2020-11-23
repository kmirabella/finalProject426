const $root = $("#root");
let counter = 0;
let class1 = {
    name: "COMP110.001",
    exam_dates: [new Date(2020, 10, 17), new Date(2020, 8, 30)]
}
let class2 = {
    name: "COMP544.001",
    exam_dates: [new Date(2020, 10, 13), new Date(2020, 9, 7)]
}
let classes = [];

$(renderStudentView());

async function renderStudentView() {

    // let req = await axios({
    //     method: "GET",
    //     url: "https://comp426backend.herokuapp.com/student",
    //     withCredentials: true,
    // });
    //console.log(req);

    //req.body.classes.forEach((c) => classes.push(c));

    //render student's existing classes and exam dates
    // assign global 'classes' var to the correct student's classes
    if (classes.length > 0) {
        classes.forEach((c) => renderClassView(c));
    } else {
        $("#add-view").append(renderAddForm());
    }
}

function renderAddForm() {
    let formView = $('<div class="class_box" id="class_display"></div>');
    let form = $("<form id='add-info-form'></form>");
    let autocomplete = $(`<input class="input" type="text" id="className" placeholder="Enter Class">`).css('width', '700px');
    let addAutoButton = $(`<button type="button" class="button">+</button>`).on('click', addClassSelector);
    form.append(autocomplete).append(addAutoButton);
    formView.append(form);
    

    return formView;
}

function addClassSelector() {
    console.log(counter);
    let target = $(`#div-${counter}`);
    let inputDiv = $(`<div id='div-${counter}' class='is-flex-direction-row control field'></div>`);
    let autocomplete = $(`<input class="input" type="text" id="className" placeholder="Enter Class">`).css('width', '500px');
    let addAutoButton = $(`<button type="button" class="button">+</button>`).on('click', addClassSelector);
    inputDiv.append(autocomplete).append(addAutoButton);
    console.log($(`#div-${counter}`)[0]);
    target.after(inputDiv);
    counter++;
}

function renderClassView(c) {
    let $classView = $('<div class="class_box" id="class-display"></div>');
    let $className = $(`<h5 class="has-text-centered title is-1">${c.name}</h5>`);
    $classView.append($className);
    //let buttons
    if (c.exam_dates.length > 0) {
        $className.append('<hr><h1 class="subtitle is-2">Exam Dates</h1>');
        c.exam_dates.forEach((date) => {
            //let $dateDiv = $('<div class="is-flex-direction-column is-align-content-space-between"></div>')
            let $date = $(`<p class="subtitle is-5">${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}</p>`);
            $className.append($date);
        });
    } else {
        $className.append("<h3>There are no exam dates set up for this class.</h3>")
    }
    $root.append($classView);
}

let $classNameDropdown = $(`<input type="text" id="className" placeholder="Enter Class"><hr>`);

// function renderAddClassForm(event) {
//     $("#new-class-button").remove();
//     let $classesView = $('<div class="class_box" id="class_display"></div>');
//     let $classInfoForm = $("<form id='create-class-form'></form>");
//     $classesView.append($classInfoForm);

//     $classNameDropdown.append($("<button class='button ' type='button'>+</button"));

//     $classInfoForm.append($classNameDropdown);

//     $("#add-class-view").append($classesView)



// }








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
