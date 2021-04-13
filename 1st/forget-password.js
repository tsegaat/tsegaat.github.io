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
var create_acc_confirm_button = document.getElementsByClassName("create-acc-confirm-button")[0]
var create_acc_empty_field = document.getElementById("create-acc-empty-field")

var email = create_acc_content_form_input[0]

function submit() {
    emailValue = email.value
    if (emailValue == "") {
        create_acc_empty_field.style.color = "rgb(156, 38, 38)"
        create_acc_empty_field.innerHTML = "Email cannot be empty"
        return 1
    }
    if (emailValue.includes("@") == false) {
        create_acc_empty_field.style.color = "rgb(156, 38, 38)"
        create_acc_empty_field.innerHTML = "Enter a valid email"
        return 1
    }

    if (emailValue.includes(".") == false) {
        create_acc_empty_field.style.color = "rgb(156, 38, 38)"
        create_acc_empty_field.innerHTML = "Enter a valid email"
        return 1
    }

    create_acc_confirm_button.innerHTML = "Sending reset link..."
    create_acc_confirm_button.style.backgroundColor = "rgb(55, 109, 247)"

    fixed_email = email.value.trim().toLowerCase();

    firebase.auth().sendPasswordResetEmail(fixed_email).then(function () {
        create_acc_empty_field.style.color = "rgb(22, 82, 240)"
        create_acc_empty_field.innerHTML = "Password reset link sent"
        create_acc_confirm_button.innerHTML = "Reset Password"
        create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"

    }).catch(function (error) {

        if (errorCode == "auth/user-not-found") {
            create_acc_empty_field.style.color = "rgb(156, 38, 38)"
            create_acc_empty_field.innerHTML = "User not found"

        }

        if (errorCode == "auth/network-request-failed") {
            create_acc_empty_field.style.color = "rgb(156, 38, 38)"
            create_acc_empty_field.innerHTML = "Network failed please try agin"
            create_acc_confirm_button.innerHTML = "Reset Password"
            create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
        }
    });
}

create_acc_confirm_button.addEventListener("click", function () { submit() })

