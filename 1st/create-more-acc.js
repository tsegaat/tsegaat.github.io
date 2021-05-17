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


const gender_indicator_text_male = document.getElementsByClassName("gender-indicator-checkbox")[0]
const gender_indicator_text_female = document.getElementsByClassName("gender-indicator-checkbox")[1]

gender_indicator_text_male.addEventListener("click", () => {
    gender_indicator_text_female.checked = false;
})

gender_indicator_text_female.addEventListener("click", () => {
    gender_indicator_text_male.checked = false;
})

const create_acc_confirm_button = document.getElementsByClassName("create-acc-confirm-button")[0]
const create_acc_empty_field = document.getElementById("create-acc-empty-field")
const create_acc_content_form_input = document.getElementsByClassName("create-acc-content-form-input")[1]
const create_acc_content_form_date = document.getElementsByClassName("create-acc-content-form-input")[0]

const userInfo = localStorage.getItem("userInfo").split(",");

const firstName = userInfo[0]
const lastName = userInfo[1]
const username = userInfo[2]
const email = userInfo[3]
const pass = userInfo[4]

function submit() {
    create_acc_confirm_button.innerHTML = "Creating..."
    create_acc_confirm_button.style.backgroundColor = "rgb(55, 109, 247)"

    if (create_acc_content_form_date.value == "") {
        create_acc_empty_field.innerHTML = "Birthday cannot be empty"
        create_acc_confirm_button.innerHTML = "Finish Creating Your Account"
        create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
        return 1
    }

    const birthday = create_acc_content_form_date.value
    const birthYear = create_acc_content_form_date.value.split("-")[0]
    const dateObj = new Date
    const currentYear = dateObj.getFullYear()

    if (birthYear > currentYear) {
        create_acc_empty_field.innerHTML = "Invalid year"
        create_acc_confirm_button.innerHTML = "Finish Creating Your Account"
        create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
        return 1
    }

    if (birthYear > currentYear - 18) {
        create_acc_empty_field.innerHTML = "You have to be 18 or above"
        create_acc_confirm_button.innerHTML = "Finish Creating Your Account"
        create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
        return 1
    }

    if (birthYear < currentYear - 150) {
        create_acc_empty_field.innerHTML = "Invalid year"
        create_acc_confirm_button.innerHTML = "Finish Creating Your Account"
        create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
        return 1
    }


    // TODO: Check for the username to be unique and phonenumber to be also unique 

    var userGender = ""
    if (gender_indicator_text_female.checked) {
        userGender = "female"
    } else if (gender_indicator_text_male.checked) {
        userGender = "male"
    } else {
        create_acc_empty_field.innerHTML = "Choose a gender"
        create_acc_confirm_button.innerHTML = "Finish Creating Your Account"
        create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
        return 1
    }

    if (!isNaN(create_acc_content_form_input.value)) {
    } else if (isNaN(create_acc_content_form_input.value)) {
        create_acc_empty_field.innerHTML = "Invalid phone number"
        create_acc_confirm_button.innerHTML = "Finish Creating Your Account"
        create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
        return 1
    }

    if (create_acc_content_form_input.value.length != 10) {
        create_acc_empty_field.innerHTML = "Invalid phone number"
        create_acc_confirm_button.innerHTML = "Finish Creating Your Account"
        create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
        return 1
    }

    if (create_acc_content_form_input.value[0].toString() != "0") {
        create_acc_empty_field.innerHTML = "Invalid phone number"
        create_acc_confirm_button.innerHTML = "Save"
        create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
        return 1
    }

    if (create_acc_content_form_input.value[1].toString() != "9" && create_acc_content_form_input.value[1].toString() != "1") {
        create_acc_empty_field.innerHTML = "Invalid phone number"
        create_acc_confirm_button.innerHTML = "Save"
        create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
        return 1
    }

    const phone = create_acc_content_form_input.value
    var phoneExistCheck = false
    firebase.firestore().collection("users").where("phone", "==", phone).get().then((q) => {
        q.forEach(() => {
            create_acc_empty_field.innerHTML = "Phone number already exits"
            create_acc_confirm_button.innerHTML = "Save"
            create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
            phoneExistCheck = true
        })
        if (!phoneExistCheck) {
            const month = Number(dateObj.getMonth()) + 1
            const date = dateObj.getDate() + "/" + month + "/" + dateObj.getFullYear()
            firebase.auth().createUserWithEmailAndPassword(email, pass)
                .then((c) => {
                    firebase.firestore().collection('users').doc(c.user.uid).set({
                        firstName: firstName,
                        lastName: lastName,
                        username: username,
                        phone: phone,
                        birthday: birthday,
                        gender: userGender,
                        createdDate: date

                    }).then(() => {
                        create_acc_empty_field.innerHTML = ""
                        c.user.sendEmailVerification()
                        firebase.auth().signInWithEmailAndPassword(email, pass)
                            .then(() => {
                                window.location.href = "../2nd/main-page.html";
                            })
                    })

                }).catch((error) => {
                    if (error.code == "auth/network-request-failed") {
                        create_acc_confirm_button.innerHTML = "Finish Creating Your Account"
                        create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
                        create_acc_empty_field.innerHTML = "Network failed please try agin"
                    }

                    if (error.code == "auth/email-already-in-use") {
                        create_acc_confirm_button.innerHTML = "Finish Creating Your Account"
                        create_acc_confirm_button.style.backgroundColor = "rgb(22, 82, 240)"
                        create_acc_empty_field.innerHTML = "Email already exists"
                    }
                })
        }
    })




}

create_acc_confirm_button.addEventListener("click", submit)

