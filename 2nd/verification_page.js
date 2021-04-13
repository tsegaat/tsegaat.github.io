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

const auth = firebase.auth();
const dbf = firebase.firestore();
const dbs = firebase.storage();

const settings_head_additonal_info = document.getElementsByClassName("user-verification-head-additonal-info")[0]

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        dbf.collection("users").doc(user.uid).get().then((doc) => {
            const firstName = doc.data().firstName
            settings_head_additonal_info.innerHTML += firstName
        })
    }
});

const create_acc_content_form_user_email = document.getElementsByClassName("create-acc-content-form-user-email")[0]

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const email = auth.currentUser.email
        create_acc_content_form_user_email.innerHTML = email
    }
});

const user_verification_confirm_button = document.getElementsByClassName("user-verification-confirm-button")[0]
const create_acc_content_form_input = document.getElementsByClassName("create-acc-content-form-input")[0]
const create_acc_empty_field = document.getElementById("create-acc-empty-field")

var show_icon = document.getElementsByClassName("show")[0]
var hide_icon = document.getElementsByClassName("hide")[0]

show_icon.addEventListener("click", () => {
    create_acc_content_form_input.setAttribute("type", "text")

    show_icon.style.display = "none"
    hide_icon.style.display = "inline-block"
})

hide_icon.addEventListener("click", () => {
    create_acc_content_form_input.setAttribute("type", "password")

    show_icon.style.display = "inline-block"
    hide_icon.style.display = "none"
})

user_verification_confirm_button.addEventListener("click", () => {
    user_verification_confirm_button.innerHTML = "Checking..."
    user_verification_confirm_button.style.backgroundColor = "rgb(55, 109, 247)"
    userPassword = create_acc_content_form_input.value
    if (userPassword == "") {
        create_acc_empty_field.innerHTML = "Password cannot be empty"
        user_verification_confirm_button.innerHTML = "Next"
        user_verification_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
    }
    var user = auth.currentUser;
    var credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        userPassword
    );

    user.reauthenticateWithCredential(credential).then(() => {
        user_verification_confirm_button.innerHTML = "Next"
        user_verification_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
        window.location.href = "after_user_verfication.html"


    }).catch((error) => {
        if (error.code = "auth/wrong-password")
            create_acc_empty_field.innerHTML = "Wrong Password"
        user_verification_confirm_button.innerHTML = "Next"
        user_verification_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
    });
})

