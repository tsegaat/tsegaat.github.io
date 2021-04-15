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

// Start Of Search Bar JS
const searchBar = document.querySelector(".head-create-email")
const matchList = document.getElementById("match-list")
const options = document.getElementsByClassName("options")
const searchBtn = document.getElementById("head-submit-email")
const main_acc_page_empty_field = document.getElementById("create-acc-empty-field")

function outputToHtml(companies) {
    if (companies.length > 0) {
        for (var i = 0; i < companies.length; i++) {
            const company = companies[i].name
            options[i].setAttribute("value", company)
        }
    }
}

const searchCompanies = async searchText => {
    const res = await fetch("companies.json")
    const companies = await res.json()

    let matches = companies.filter(company => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return company.name.match(regex)
    })

    if (searchText.length === 0) {
        matches = []
    }

    outputToHtml(matches)
}
searchBtn.addEventListener('click', () => {

    searchBtn.innerHTML = "Searching"
    searchBtn.style.backgroundColor = "rgb(55, 109, 247)"

    if (searchBar.value != "") {
        var val = searchBar.value;
        var nonEmptyOptionsArray = []
        for (var i = 0; i < options.length; i++) {
            if (options[i].value != "") {
                nonEmptyOptionsArray.push(options[i])
                matchList.display = 'none'
            }
        }
        for (var i = 0; i < options.length; i++) {
            if (options[i].value.toLowerCase() == val.toLowerCase()) {
                main_acc_page_empty_field.innerHTML = ""
                searchBtn.innerHTML = "Search"
                searchBtn.style.backgroundColor = "#1652f0"
                localStorage["company"] = val
                window.location.href = "buysell_page.html"
                return 0;
            }
        }

        searchBtn.innerHTML = "Search"
        searchBtn.style.backgroundColor = "#1652f0"

        main_acc_page_empty_field.innerHTML = "Company not found!"
    }
})


searchBar.addEventListener('input', () => searchCompanies(searchBar.value))
// End of Search Bar JS


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
// End of More Options

// Start of Backgrund changer
const main_page_icon_container = document.getElementsByClassName("main-page-icon-container")[0]
const input_file = document.getElementsByClassName("input-file")[0]
const body = document.querySelector("#body")


main_page_icon_container.addEventListener("click", () => {
    input_file.click()
})

input_file.addEventListener("change", handleImage, false)

function handleImage(e) {
    var reader = new FileReader()

    reader.onload = function (event) {
        var image = new Image()
        body.setAttribute("style", `background-image: url(${event.target.result})`)
    }

    reader.readAsDataURL(e.target.files[0])
}
// End of Background changer

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

// Start of going to manage account page
const profile_settings_manage = document.getElementsByClassName("profile-settings-manage")[0]
profile_settings_manage.addEventListener("click", () => {
    window.location.href = "manage-acc.html"
})
// End of going to manage account page

// Start of signout option
var profile_settings_li_normal = document.getElementsByClassName("profile-settings-li-normal")[1]
profile_settings_li_normal.addEventListener("click", () => {
    auth.signOut().then(() => {
        window.location.href = "../1st/index.html";
    })
})
// End of signout option