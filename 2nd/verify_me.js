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


// Start of More Options and profile settings
const more_options_container = document.getElementsByClassName("more-options-container")[0]
const more_options_btn = document.getElementsByClassName("more-options-btn")[0]
const profile_settings_container = document.getElementsByClassName("profile-settings-container")[0]
const profile_picture = document.getElementsByClassName("profile-picture")[0]

profile_picture.addEventListener("click", () => {
    if (profile_settings_container.style.display == "none") {
        profile_settings_container.style.display = "block"
        more_options_container.style.display = "none"
    } else if (profile_settings_container.style.display == "block") {
        // TODO: Fix not display none after icon click

        profile_settings_container.style.display = "none"
    }
    document.addEventListener('mouseup', function (e) {
        if (!profile_settings_container.contains(e.target)) {
            profile_settings_container.style.display = 'none';
        }
    })

})


more_options_btn.addEventListener("click", () => {
    if (more_options_container.style.display == "none") {
        profile_settings_container.style.display = "none"
        more_options_container.style.display = "block"
    } else if (more_options_container.style.display == "block") {
        // TODO: Fix not display none after icon click
        more_options_container.setAttribute("style", "display: none;")
    }
    document.addEventListener('mouseup', function (e) {
        if (!more_options_container.contains(e.target)) {
            more_options_container.style.display = 'none';
        }
    })
})

var seller;
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // console.log(firebase.auth().currentUser)
        dbf.collection("users").doc(user.uid).get().then((doc) => {
            seller = doc.data().seller
            if (seller) {
                const newListElement = document.createElement("li")
                newListElement.innerHTML = "Buyers Requests"

                more_options_container.insertBefore(newListElement, more_options_container.children[1])
                newListElement.addEventListener("click", () => {
                    window.location.href = "../3rth/buyer_requests.html"
                })
            }
        })
    }
});

const all_companies = more_options_container.children[0]
all_companies.addEventListener("click", () => {
    window.location.href = "../3rth/all_companies.html"
})

// End of More Options and profile settings

// Start email
const profile_settings_email = document.getElementsByClassName("profile-settings-email")[0]
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        const email = user.email
        profile_settings_email.innerHTML = email
    }
})
// End email

// Start of Name
const profile_settings_name = document.getElementsByClassName("profile-settings-name")[0]

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // console.log(firebase.auth().currentUser)
        dbf.collection("users").doc(user.uid).get().then((doc) => {
            const firstName = doc.data().firstName
            const lastName = doc.data().lastName
            profile_settings_name.innerHTML = firstName + " " + lastName
        })
    }
});
// End of Name

// Start of profile pic change
const profile_settings_camera_icon = document.getElementsByClassName("profile-settings-camera-icon")[0]
const proflie_settings_profilepicture = document.getElementsByClassName("proflie-settings-profilepicture")[0]
const profile_settings_profilepicture_input = document.getElementById("profile-settings-profilepicture-input")
const profile_picture_nav = document.getElementById("profile-picture-nav")

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const photoid = auth.currentUser.uid
        const ref = dbs.ref()
        ref.child("user_profile_pictures/" + photoid).getDownloadURL().then((url) => {
            proflie_settings_profilepicture.setAttribute("style", `background-image: url(${url})`)
            profile_picture_nav.setAttribute("style", `background-image: url(${url})`)
        }).catch(() => {
            proflie_settings_profilepicture.setAttribute("style", "background-image: url('place-holder-pp.png')")
            profile_picture_nav.setAttribute("style", "background-image: url('place-holder-pp.png')")
        })

    }
})

profile_settings_camera_icon.addEventListener("click", () => {
    profile_settings_profilepicture_input.click()
})

profile_settings_profilepicture_input.addEventListener("change", handleProfilePicture, false)

function handleProfilePicture(e) {
    const file = profile_settings_profilepicture_input.files[0]
    const photoid = auth.currentUser.uid
    const ref = dbs.ref()
    const metatype = {
        contentType: file.type
    }

    const task = ref.child("user_profile_pictures/" + photoid).put(file, metatype)
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            proflie_settings_profilepicture.setAttribute("style", `background-image: url(${url})`)
            profile_picture_nav.setAttribute("style", `background-image: url(${url})`)
        })
}
// End of profile pic change

// Start of home bottom
const home_btn = document.getElementsByClassName("home-btn")[0]
home_btn.addEventListener("click", () => {
    window.location.href = "main-page.html"
})
// End of home button

// Start of email verify 
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        const basic_info_type_email = document.getElementsByClassName("basic-info")[0]
        if (auth.currentUser.emailVerified) {
            basic_info_type_email.setAttribute("class", "basic-info-types-emailverified")
            basic_info_type_email.innerHTML = `<div class="basic-info-type-name">Email</div>
                        <div class="basic-info-type-value">Verified</div>
                        <div class="basic-info-type-change"><i class="fa fa-arrow-right"></i></div>`
        } else {
            basic_info_type_email.setAttribute("class", "basic-info-types")
            basic_info_type_email.innerHTML = `<div class="basic-info-type-name">Email</div>
            <div class="basic-info-type-value">Verify email address</div>
            <div class="basic-info-type-change"><i class="fa fa-arrow-right"></i></div>`
        }
        basic_info_type_email.addEventListener("click", () => {
            if (!auth.currentUser.emailVerified) {
                auth.currentUser.sendEmailVerification()
                swal("Sent", "A verification email was sent \n follow the link to verify your email")
            }
        })
    }
})


// End of email verify 