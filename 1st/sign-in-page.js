// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
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
var show_icon = document.getElementsByClassName("show")
var hide_icon = document.getElementsByClassName("hide")

var email = create_acc_content_form_input[0]
var password = create_acc_content_form_input[1]
var show_password1 = show_icon[0]
var hide_password1 = hide_icon[0]

email.value = localStorage["create-acc-email"]
localStorage["create-acc-email"] = ""

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

function submit() {
    if (password.value == "") {
        create_acc_empty_field.innerHTML = "Password must be provided"
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

    create_acc_confirm_button.innerHTML = "Signing in ..."
    create_acc_confirm_button.style.backgroundColor = "rgb(55, 109, 247)"

    fixed_email = email.value.trim().toLowerCase();

    firebase.auth().signInWithEmailAndPassword(fixed_email, password.value)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            localStorage["email"] = email.value
            window.location.href = "../2nd/main-page.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            console.log(errorCode)
            if (errorCode == "auth/user-not-found") {
                create_acc_empty_field.innerHTML = "User not found"
                create_acc_confirm_button.innerHTML = "Sign In"
                create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
            }

            if (errorCode == "auth/wrong-password") {
                create_acc_empty_field.innerHTML = "Invalid Password"
                create_acc_confirm_button.innerHTML = "Sign In"
                create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
            }

            if (errorCode == "auth/network-request-failed") {
                create_acc_empty_field.innerHTML = "Network failed please try agin"
                create_acc_confirm_button.innerHTML = "Sign In"
                create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
            }

            if (errorCode == "auth/too-many-requests") {
                create_acc_empty_field.innerHTML = "Too many requests </br> Try again later"
                create_acc_confirm_button.innerHTML = "Sign In"
                create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
            }
        });

}

create_acc_confirm_button.addEventListener("click", function () { submit() })