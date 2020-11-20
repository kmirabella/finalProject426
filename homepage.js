$(function () {
    $('#signup-form').on('submit', (event) => handleSubmitSignup(event));
    $("#login-submit-button").on('click', (event) => handleLogin(event));
});
// const handleLoginSignups = function () {
    
// }

async function handleLogin(e) {
    e.preventDefault();
    let email = $('#login-email').val();
    let password = $('#login-password').val();
    // try {
    //     await axios({
    //         method: 'POST',
    //         url: "https://sleepy-galileo-3683d4.netlify.app/index.html",
    //         data: {
    //             "user": email,
    //             "password": password
    //         }
    //     })
    // } catch (err) {
    //     let errorMessage = $('<h3>Username or password invalid.');
    //     $('#login-password').append(errorMessage);
    // }
}

async function handleSubmitSignup(e) {
    e.preventDefault();
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let email = $("#email").val();
    let pass = $("#password").val();
    let confirmedPassword = $("#confirm-password").val();
    // front end password match confirmation
    if (pass == confirmedPassword) {
        // store our data here by creating a new professor or student object 
        if ($("input[id='professor-radio']:checked").val() == "on") {
            //if checked professor
            console.log('about to send and create backend Prof. obj');
            await axios({
                method: "get",
                url: "https://examscheduler2.netlify.app/professor",
            })
            console.log(`signed up new user: ${firstName} ${lastName}`)
        } else {
            //if checked student
            await axios({
                method: "post",
                url: "https://examscheduler2.netlify.app/student",
                data: {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": pass,
                    "classes": []
                }
            })
        }

    } else {
        console.log("it was false! they didn't match")
        $("#signup-form").append("<div class= passwordIncorrect><p><Strong>Passwords do not match, try again!<Strong></p></div>");
    }
}