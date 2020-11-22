$(function () {
    $('#signup-form').on('submit', (event) => handleSubmitSignup(event));
    $("#login-submit-button").on('click', (event) => handleLogin(event));
});

async function handleLogin(e) {
    e.preventDefault();
    let email = $('#login-email').val();
    let password = $('#login-password').val();

    $("#login-email").removeClass('is-danger');
    $("#login-password").removeClass('is-danger');

    if (email == "") {
        $("#login-email").addClass('is-danger');
        return;
    }
    if (password == "") {
        $("#login-password").addClass('is-danger');
        return;
    }

    // try {
    // await axios({
    //     method: 'POST',
    //     url: "http://WWW.URL.COM/login",
    //     data: {
    //         "user": email,
    //         "password": password
    //     }
    // })
}

async function handleSubmitSignup(e) {
    e.preventDefault();
    let firstName = $('#first-name').val();
    let lastName = $('#last-name').val();
    let email = $("#email").val();
    let pass = $("#password").val();
    let confirmedPassword = $("#confirm-password").val();

    if ($("#signup-form").children()[9] != null) {
        $("#signup-form").children()[9].remove();
    }

    $('#first-name').removeClass('is-danger');
    $('#last-name').removeClass('is-danger');
    $('#email').removeClass('is-danger');
    $('#password').removeClass('is-danger');
    $('#confirm-password').removeClass('is-danger');

    if (firstName == "") {
        $('#first-name').addClass('is-danger');
        return;
    }
    if (lastName == "") {
        $('#last-name').addClass('is-danger');
        return;
    }
    if (email == "") {
        $('#email').addClass('is-danger');
        return;
    }
    if (pass == "") {
        $('#password').addClass('is-danger');
        return;
    }
    if (confirmedPassword == "") {
        $('#confirm-password').addClass('is-danger');
        return;
    }
    if (!$("input[id='professor-radio']:checked").val() && !$("input[id='student-radio']:checked").val()) {
        let errorMessage = $('<h1>Please indicate if you are a student or professor.</h1>');
        $('#signup-form').append(errorMessage);
        return;
    }
    // front end password match confirmation
    if (pass == confirmedPassword) {
        // store our data here by creating a new professor or student object 
        if ($("input[id='professor-radio']:checked").val() == "on") {
            let req = await axios({
                method: "POST",
                url: "https://WWW.URL.COM/signup",
                data: {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": pass,
                    "professor": "true"
                }
            })
            if (req.body) {
                window.location.replace("./professorView.html");
            }
        } else {
            // let req = await axios({
            //     method: "post",
            //     url: "https://WWW.URL.COM/signup",
            //     data: {
            //         "firstName": firstName,
            //         "lastName": lastName,
            //         "email": email,
            //         "password": pass,
            //         "professor": "false"
            //     }
            // })
            if (req.body) {
                window.location.replace("./manage_classes.html");
            }
        }

    } else {
        $('#password').addClass('is-danger');
        $('#confirm-password').addClass('is-danger');
    }
}