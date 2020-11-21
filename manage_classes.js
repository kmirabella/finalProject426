$(function () {
    loadFeed();
});

function renderAddClassForm(){
    let classHtml = '<span><div class="class_box" id="class_display"><h1>COMP426</h1><hr><h2>Exam Dates</h2><p>11/01/2020</p><p>9/12/2020</p><p>10/08/2020</p><p>8/24/2020</p><button type="submit" id="edit_button">edit</button><button type="submit">delete class</button></div></span>';

    let $classesView = $('<div class="class_box" id="class_display"></div>');
    let $classNameDropdown = $(`<label for="class-name">Class Name</labe><h1 id="class-name">${classname}</h1>`)

    return classHtml;
}

function getClassEdit(){
    let classEditHtml = '<span><div class="class_box" id="class_edit"><h1>Course Code</h1><input value="C426001"><hr><input value="11/01/2020"><span><button type="submit">delete</button></span><br><input value="9/12/2020"><span><button type="submit">delete</button></span><br><input value="10/08/2020"><span><button type="submit">delete</button></span><br><input value="8/24/2020"><span><button type="submit">delete</button></span><br><button type="submit">+ add date</button><button type="submit">Submit Changes</button><button type="submit" id="cancel_button">Cancel</button></div></span>';

    return classEditHtml;
}

const loadFeed = async function () {

    // axios to pull student's classes with updated exam dates 
    // and display them
    const $root = $('#root');
    $root.append(renderAddClassForm());

    const loadEdit = function(){
        let classEditHtml = getClassEdit();
        let oldClassDisplay = document.querySelector("#class_display");
        const newClassEditDisplay = document.createElement("span");
        newClassEditDisplay.innerHTML = classEditHtml;
        oldClassDisplay.parentNode.replaceChild(newClassEditDisplay, oldClassDisplay);
    }
    $root.on("click", '#edit_button', loadEdit);

    const loadClass = function(){
        let classEditHtml = renderAddClassForm();
        let oldClassDisplay = document.querySelector("#class_edit");
        const newClassEditDisplay = document.createElement("span");
        newClassEditDisplay.innerHTML = classEditHtml;
        oldClassDisplay.parentNode.replaceChild(newClassEditDisplay, oldClassDisplay);
    }
    $root.on("click", '#cancel_button', loadClass);
}

async function loadClass() {
    /** axios to get class info
     * let req = await axios({
        method: 'GET',
        url: "http://WWW.URL.COM/student/:id/"
    })
     */
    //classname
    //let classes = req.body.classes; as an array of class objects

    let classView = $("<div class='box '></div>")
                    .css('display', 'flex')
                    .css('flex-flow', 'column-wrap');
    // classes.forEach((c) => {
    //     $("<")
    // })
    //exams
}

