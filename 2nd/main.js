// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyAohkpWoFrFVdrKKUKXB2-iU2MkNVAaUWM",
	authDomain: "ethioshare-f13bf.firebaseapp.com",
	projectId: "ethioshare-f13bf",
	storageBucket: "ethioshare-f13bf.appspot.com",
	messagingSenderId: "225389897373",
	appId: "1:225389897373:web:761eab1640226178301674",
	measurementId: "G-7N289P22GB",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const dbf = firebase.firestore();
const dbs = firebase.storage();

// Start Of Search Bar JS
const searchBar = document.querySelector(".head-create-email");
const matchList = document.getElementById("match-list");
const options = document.getElementsByClassName("options");
const searchBtn = document.getElementById("head-submit-email");

function outputToHtml(companies) {
	if (companies.length > 0) {
		for (var i = 0; i < companies.length; i++) {
			var company = companies[i].name;
			var firstPartCompany = company.slice(" ");

			var firstCompany =
				firstPartCompany[0].toUpperCase() + firstPartCompany.slice(1);
			company = firstCompany;
			options[i].setAttribute("value", company);
		}
	}
}

const searchCompanies = async (searchText) => {
	const res = await fetch("companies.json");
	const companies = await res.json();

	let matches = companies.filter((company) => {
		const regex = new RegExp(`^${searchText}`, "gi");
		return company.name.match(regex);
	});

	if (searchText.length === 0) {
		matches = [];
	}

	outputToHtml(matches);
};

window.addEventListener("keypress", (e) => {
	if (e.keyCode == 13) {
		searchBtn.click();
	}
});

searchBar.addEventListener("keypress", (e) => {
	if (e.keyCode === 13) {
		searchBtn.click();
		e.preventDefault();
	}
});

searchBtn.addEventListener("click", () => {
	if (searchBar.value != "") {
		searchBtn.innerHTML = "Searching";
		searchBtn.style.backgroundColor = "rgb(55, 109, 247)";
		var val = searchBar.value;
		var nonEmptyOptionsArray = [];
		for (var i = 0; i < options.length; i++) {
			if (options[i].value != "") {
				nonEmptyOptionsArray.push(options[i]);
				matchList.display = "none";
			}
		}
		for (var i = 0; i < options.length; i++) {
			if (options[i].value.toLowerCase() == val.toLowerCase()) {
				searchBtn.innerHTML = "Search";
				searchBtn.style.backgroundColor = "#1652f0";
				localStorage["company"] = val;
				window.location.href = "../3rth/buysell_page.html";
				return 0;
			}
		}

		searchBtn.innerHTML = "Search";
		searchBtn.style.backgroundColor = "#1652f0";

		swal(
			"Company not found",
			"Make sure you have the exact value from the dropdown",
			"error"
		);
	}
});

searchBar.addEventListener("input", () => searchCompanies(searchBar.value));
// End of Search Bar JS

// Start of More Options and profile settings
const more_options_container = document.getElementsByClassName(
	"more-options-container"
)[0];
const more_options_btn = document.getElementsByClassName("more-options-btn")[0];
const profile_settings_container = document.getElementsByClassName(
	"profile-settings-container"
)[0];
const profile_picture = document.getElementsByClassName("profile-picture")[0];

profile_picture.addEventListener("click", () => {
	if (profile_settings_container.style.display == "none") {
		profile_settings_container.style.display = "block";
		more_options_container.style.display = "none";
	} else if (profile_settings_container.style.display == "block") {
		// TODO: Fix not display none after icon click

		profile_settings_container.style.display = "none";
	}
	document.addEventListener("mouseup", function (e) {
		if (!profile_settings_container.contains(e.target)) {
			profile_settings_container.style.display = "none";
		}
	});
});

more_options_btn.addEventListener("click", () => {
	if (more_options_container.style.display == "none") {
		profile_settings_container.style.display = "none";
		more_options_container.style.display = "block";
	} else if (more_options_container.style.display == "block") {
		// TODO: Fix not display none after icon click
		more_options_container.setAttribute("style", "display: none;");
	}
	document.addEventListener("mouseup", function (e) {
		if (!more_options_container.contains(e.target)) {
			more_options_container.style.display = "none";
		}
	});
});

var seller;
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// console.log(firebase.auth().currentUser)
		dbf.collection("users")
			.doc(user.uid)
			.get()
			.then((doc) => {
				seller = doc.data().seller;
				if (seller) {
					const newListElement = document.createElement("li");
					newListElement.innerHTML = "Buyers Requests";

					more_options_container.insertBefore(
						newListElement,
						more_options_container.children[1]
					);
					newListElement.addEventListener("click", () => {
						window.location.href = "../3rth/buyer_requests.html";
					});

					const verify_me_tab = document.getElementsByClassName(
						"profile-settings-li profile-settings-li-normal"
					)[0];
					verify_me_tab.remove();
				}
			});
	}
});

const all_companies = more_options_container.children[0];
all_companies.addEventListener("click", () => {
	window.location.href = "../3rth/all_companies.html";
});

// End of More Options

// Start of Backgrund changer
const main_page_icon_container = document.getElementsByClassName(
	"main-page-icon-container"
)[0];
const input_file = document.getElementsByClassName("input-file")[0];
const body = document.querySelector("#body");

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		const photoid = auth.currentUser.uid;
		const ref = dbs.ref();
		ref.child("user_backgrounds/" + photoid)
			.getDownloadURL()
			.then((url) => {
				body.setAttribute("style", `background-image: url(${url})`);
			})
			.catch(() => {
				body.setAttribute(
					"style",
					"background-image: url('wallpaper.jpg')"
				);
			});
	}
});

main_page_icon_container.addEventListener("click", () => {
	input_file.click();
});

function handleWallpaper(e) {
	const file = input_file.files[0];
	const photoid = auth.currentUser.uid;
	const ref = dbs.ref();
	const metatype = {
		contentType: file.type,
	};

	const task = ref.child("user_backgrounds/" + photoid).put(file, metatype);
	task.then((snapshot) => snapshot.ref.getDownloadURL()).then((url) => {
		body.setAttribute("style", `background-image: url(${url})`);
	});
}

input_file.addEventListener("change", handleWallpaper);
// End of Background changer

// Start email
const profile_settings_email = document.getElementsByClassName(
	"profile-settings-email"
)[0];
firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		const email = user.email;
		profile_settings_email.innerHTML = email;
	}
});
// End email

// Start of home bottom
const home_btn = document.getElementsByClassName("home-btn")[0];
home_btn.addEventListener("click", () => {
	window.location.href = "main-page.html";
});
// End of home button

// Start of Name
const profile_settings_name = document.getElementsByClassName(
	"profile-settings-name"
)[0];

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// console.log(firebase.auth().currentUser)
		dbf.collection("users")
			.doc(user.uid)
			.get()
			.then((doc) => {
				const firstName = doc.data().firstName;
				const lastName = doc.data().lastName;
				profile_settings_name.innerHTML = firstName + " " + lastName;
			});
	}
});
// End of Name

// Start of profile pic change
const profile_settings_camera_icon = document.getElementsByClassName(
	"profile-settings-camera-icon"
)[0];
const proflie_settings_profilepicture = document.getElementsByClassName(
	"proflie-settings-profilepicture"
)[0];
const profile_settings_profilepicture_input = document.getElementById(
	"profile-settings-profilepicture-input"
);
const profile_picture_nav = document.getElementById("profile-picture-nav");

firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		const photoid = auth.currentUser.uid;
		const ref = dbs.ref();
		ref.child("user_profile_pictures/" + photoid)
			.getDownloadURL()
			.then((url) => {
				proflie_settings_profilepicture.setAttribute(
					"style",
					`background-image: url(${url})`
				);
				profile_picture_nav.setAttribute(
					"style",
					`background-image: url(${url})`
				);
			})
			.catch(() => {
				proflie_settings_profilepicture.setAttribute(
					"style",
					"background-image: url('place-holder-pp.png')"
				);
				profile_picture_nav.setAttribute(
					"style",
					"background-image: url('place-holder-pp.png')"
				);
			});
	}
});

profile_settings_camera_icon.addEventListener("click", () => {
	profile_settings_profilepicture_input.click();
});

profile_settings_profilepicture_input.addEventListener(
	"change",
	handleProfilePicture,
	false
);

function handleProfilePicture(e) {
	const file = profile_settings_profilepicture_input.files[0];
	const photoid = auth.currentUser.uid;
	const ref = dbs.ref();
	const metatype = {
		contentType: file.type,
	};

	const task = ref
		.child("user_profile_pictures/" + photoid)
		.put(file, metatype);
	task.then((snapshot) => snapshot.ref.getDownloadURL()).then((url) => {
		proflie_settings_profilepicture.setAttribute(
			"style",
			`background-image: url(${url})`
		);
		profile_picture_nav.setAttribute(
			"style",
			`background-image: url(${url})`
		);
	});
}
// End of profile pic change

// Start of going to manage account page
const profile_settings_manage = document.getElementsByClassName(
	"profile-settings-manage"
)[0];
profile_settings_manage.addEventListener("click", () => {
	window.location.href = "manage-acc.html";
});
// End of going to manage account page

// Start of signout option
var profile_settings_li_normal_signout = document.getElementsByClassName(
	"profile-settings-li-normal"
)[1];
profile_settings_li_normal_signout.addEventListener("click", () => {
	auth.signOut().then(() => {
		window.location.href = "../../index.html";
	});
});
// End of signout option

// Verify me start
const profile_settings_li_normal_verify = document.getElementsByClassName(
	"profile-settings-li-normal"
)[0];
profile_settings_li_normal_verify.addEventListener("click", () => {
	window.location.href = "verify_me.html";
});
// Verify me end
