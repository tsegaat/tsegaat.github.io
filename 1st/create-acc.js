// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAohkpWoFrFVdrKKUKXB2-iU2MkNVAaUWM",
    authDomain: "ethioshare-f13bf.firebaseapp.com",
    projectId: "ethioshare-f13bf",
    storageBucket: "ethioshare-f13bf.appspot.com",
    messagingSenderId: "225389897373",
    appId: "1:225389897373:web:761eab1640226178301674",
    measurementId: "G-7N289P22GB"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var create_acc_content_form_input = document.getElementsByClassName("create-acc-content-form-input")
var create_acc_content_form_checkbox_button = document.getElementsByClassName("create-acc-content-form-checkbox-button")[0]
var create_acc_confirm_button = document.getElementsByClassName("create-acc-confirm-button")[0]
var create_acc_empty_field = document.getElementById("create-acc-empty-field")
var create_acc_confirm_button = document.getElementsByClassName("create-acc-confirm-button")[0]
var show_icon = document.getElementsByClassName("show")
var hide_icon = document.getElementsByClassName("hide")

var firstName = create_acc_content_form_input[0]
var lastName = create_acc_content_form_input[1]
var email = create_acc_content_form_input[2]
var password = create_acc_content_form_input[3]
var repeat_password = create_acc_content_form_input[4]
var show_password1 = show_icon[0]
var hide_password1 = hide_icon[0]
var show_password2 = show_icon[1]
var hide_password2 = hide_icon[1]

show_password1.onclick = function () {
    password.setAttribute("type", "text")

    show_password1.style.display = "none"
    hide_password1.style.display = "block"
}

hide_password1.onclick = function () {
    password.setAttribute("type", "password")

    show_password1.style.display = "block"
    hide_password1.style.display = "none"
}

show_password2.onclick = function () {
    repeat_password.setAttribute("type", "text")

    show_password2.style.display = "none"
    hide_password2.style.display = "block"
}

hide_password2.onclick = function () {
    repeat_password.setAttribute("type", "password")

    show_password2.style.display = "block"
    hide_password2.style.display = "none"
}

if (localStorage["gmail_from_homepage"]) {
    email.value = localStorage["gmail_from_homepage"]
    localStorage["gmail_from_homepage"] = ""
}



function submit() {
    if (firstName.value == "" || lastName.value == "" || email.value == "" || password.value == "") {
        create_acc_empty_field.innerHTML = "None of the fields can be empty"
        return 1
    }

    if (!(/^[a-zA-Z]+$/.test(firstName.value))) {
        create_acc_empty_field.innerHTML = "Name can only contain letters"
        return 1
    }

    if (!(/^[a-zA-Z]+$/.test(lastName.value))) {
        create_acc_empty_field.innerHTML = "Name can only contain letters"
        return 1
    }

    emailValue = email.value
    if (emailValue.includes("@") == false) {
        create_acc_empty_field.innerHTML = "Enter a valid email"
        return 1
    }

    if (emailValue.includes(".") == false) {
        create_acc_empty_field.innerHTML = "Enter a valid email"
        return 1
    }

    if (password.value != repeat_password.value) {
        create_acc_empty_field.innerHTML = "Passwords don't match"
        return 1
    }

    if (password.value.length < 6) {
        create_acc_empty_field.innerHTML = "Password must be at least 6 characters"
        return 1
    }

    if (create_acc_content_form_checkbox_button.checked == false) {
        create_acc_empty_field.innerHTML = "Must check the confirmation checkbox"
        return 1
    }

    var fixed_firstName = firstName.value.toLowerCase()
    var fixed_lastName = lastName.value.toLowerCase()

    fixed_firstName = fixed_firstName.charAt(0).toUpperCase() + fixed_firstName.slice(1);
    fixed_lastName = fixed_lastName.charAt(0).toUpperCase() + fixed_lastName.slice(1);

    create_acc_confirm_button.innerHTML = "Creating Account ..."
    create_acc_confirm_button.style.backgroundColor = "rgb(55, 109, 247)"


    fixed_email = email.value.trim().toLowerCase();

    localStorage["userInfo"] = [fixed_firstName, fixed_lastName, fixed_email, password.value]
    window.location.href = "create-more-acc.html"

    // firebase.auth().createUserWithEmailAndPassword(fixed_email, password.value)
    //     .then((c) => {
    //         firebase.firestore().collection('users').doc(c.user.uid).set({
    //             firstName: fixed_firstName,
    //             lastName: fixed_lastName
    //         }).then(() => {
    //             const user = firebase.auth().currentUser
    //             firstName.value = ""
    //             lastName.value = ""
    //             email.value = ""
    //             localStorage["create-acc-email"] = fixed_email
    //             window.location.href = "sign-in-page.html"
    //             create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
    //             create_acc_confirm_button.innerHTML = "Create Account"
    //             user.sendEmailVerification()
    //         })


    //     })
    //     .catch((error) => {
    //         var errorCode = error.code;
    //         if (errorCode == "auth/email-already-in-use") {
    //             create_acc_empty_field.style.color = "rgb(156, 38, 38)"
    //             create_acc_empty_field.innerHTML = "Email already exits"
    //             create_acc_confirm_button.innerHTML = "Create Account"
    //             create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
    //         }

    //         if (errorCode == "auth/network-request-failed") {
    //             create_acc_empty_field.innerHTML = "Network failed please try agin"
    //             create_acc_confirm_button.innerHTML = "Create Account"
    //             create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
    //         }
    //     });

    // TODO: Build the stay logged in checkbutton

}
create_acc_confirm_button.addEventListener("click", function () { submit() })

