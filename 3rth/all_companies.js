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
const ref = dbs.ref()

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

// End of More Options

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
    window.location.href = "../2nd/main-page.html"
})
// End of home button

// Verify me start
const profile_settings_li_normal_verify = document.getElementsByClassName("profile-settings-li-normal")[0]
profile_settings_li_normal_verify.addEventListener("click", () => {
    window.location.href = "../2nd/verify_me.html"
})
// Verify me end

// Start of going to manage account page
const profile_settings_manage = document.getElementsByClassName("profile-settings-manage")[0]
profile_settings_manage.addEventListener("click", () => {
    window.location.href = "../2nd/manage-acc.html"
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

// Taking to the selected-buy/sell page start
const selectd_trade_btn = document.getElementsByClassName("selectd-trade-btn")[0]
// Taking to the selected-buy/sell page end

// Getting all the information from the db and JSON and put it somewhere start
const table_row_container = document.getElementById("table-row-container")

async function getAllCompanies() {
    const res = await fetch("../2nd/companies.json")
    const companies = await res.json()

    let matches = companies.filter(company => {
        const regex = new RegExp('')
        return company
    })



    for (var i = 0; i < matches.length; i++) {
        var HTML = `<tr>
            <td class="table_company_number"></td>
            <td><span>
                    <div class="table-company-logo"></div>
                </span></td>
            <td>
                <span class="table-company-name" id="company_name_${i}"></span>
            </td>
            <td class="table_company_sector"></td>
            <td class="table_company_price" id="company_price_${i}"></td>
            <td class="table_company_exchangescore"></td>
            <td><button class="table-trade-btn btn" id="exchange_btn_${i}">Exchange</button></td>
        </tr>`
        table_row_container.innerHTML += HTML
    }

    const table_company_number = document.getElementsByClassName("table_company_number")
    const table_company_logo = document.getElementsByClassName("table-company-logo")
    const table_company_name = document.getElementsByClassName("table-company-name")
    const table_company_sector = document.getElementsByClassName("table_company_sector")
    const table_company_price = document.getElementsByClassName("table_company_price")
    const table_company_exchangescore = document.getElementsByClassName("table_company_exchangescore")

    var companyLogos = []
    var array = []
    for (var i = 0; i < table_company_logo.length; i++) {
        array.push(table_company_logo[i])
    }




    // TODO: The Logo getter is not working




    for (var i = 0; i < matches.length; i++) {
        ref.child("company_logos/" + matches[i]["name"] + ".png").getDownloadURL().then((url) => {
            // console.log(url)
            companyLogos.push(url)
            setTimeout(() => {
                array.forEach((val, j) => {
                    // console.log(val)
                    // console.log(j)
                    val.setAttribute("style", `background-image: url(${companyLogos[j]})`)
                })
            }, 3000)
        })

        table_company_name[i].innerHTML = matches[i]["name"][0].toUpperCase() + matches[i]["name"].slice(1)
        table_company_sector[i].innerHTML = matches[i]["sector"][0].toUpperCase() + matches[i]["sector"].slice(1)
        table_company_price[i].innerHTML = matches[i]["price"]
        table_company_exchangescore[i].innerHTML = matches[i]["exchangescore"]
        table_company_number[i].innerHTML = i + 1
    }

    for (var i = 0; i < matches.length; i++) {
        const exchangeBtn = document.getElementById(`exchange_btn_${i}`)
        const companyName = document.getElementById(`company_name_${i}`)
        const companyPrice = document.getElementById(`company_price_${i}`)
        exchangeBtn.addEventListener("click", () => {

            localStorage['selectedCompany'] = [companyName.innerHTML, companyPrice.innerHTML]
            window.location.href = "buysell_selected.html"
        })
    }


}

getAllCompanies()
// Getting all the information from the db and JSON and put it somewhere end

// Making the tab filter start
const all_comp_buy_sell_sector = document.getElementsByClassName("buy-sell-sector")[0]
const finance_buy_sell_sector = document.getElementsByClassName("buy-sell-sector")[1]
const resource_buy_sell_sector = document.getElementsByClassName("buy-sell-sector")[2]
const other_buy_sell_sector = document.getElementsByClassName("buy-sell-sector")[3]

async function returnCompnaySectors() {
    const res = await fetch("../2nd/companies.json")
    const companies = await res.json()

    let matches = companies.filter(company => {
        return company
    })
    const table_row_container = document.getElementById("table-row-container")
    all_comp_buy_sell_sector.addEventListener("click", () => {
        table_row_container.innerHTML = ''
        all_comp_buy_sell_sector.classList.add("buy-sell-sector-selected")
        finance_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        resource_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        other_buy_sell_sector.classList.remove("buy-sell-sector-selected")

        const all_companies = []
        for (var i = 0; i < matches.length; i++) {
            all_companies.push(matches[i])
        }

        for (var i = 0; i < all_companies.length; i++) {
            const HTML = `<tr id="company_number_${i}">
                <td class="table_company_number"></td>
                <td><span>
                        <div class="table-company-logo"></div>
                    </span></td>
                <td>
                    <span class="table-company-name" id="company_name_${i}"></span>
                </td>
                <td class="table_company_sector"></td>
                <td class="table_company_price" id="company_price_${i}"></td>
                <td class="table_company_exchangescore"></td>
                <td><button class="table-trade-btn btn" id="exchange_btn_${i}">Exchange</button></td>
            </tr>`

            table_row_container.innerHTML += HTML

            const table_company_number = document.getElementsByClassName("table_company_number")
            const table_company_logo = document.getElementsByClassName("table-company-logo")
            const table_company_name = document.getElementsByClassName("table-company-name")
            const table_company_sector = document.getElementsByClassName("table_company_sector")
            const table_company_price = document.getElementsByClassName("table_company_price")
            const table_company_exchangescore = document.getElementsByClassName("table_company_exchangescore")

            table_company_name[i].innerHTML = all_companies[i]["name"][0].toUpperCase() + all_companies[i]["name"].slice(1)
            table_company_sector[i].innerHTML = all_companies[i]["sector"][0].toUpperCase() + all_companies[i]["sector"].slice(1)
            table_company_price[i].innerHTML = all_companies[i]["price"]
            table_company_exchangescore[i].innerHTML = all_companies[i]["exchangescore"]
            table_company_number[i].innerHTML = i + 1

        }

        for (var i = 0; i < all_companies.length; i++) {
            const exchangeBtn = document.getElementById(`exchange_btn_${i}`)
            const companyName = document.getElementById(`company_name_${i}`)
            const companyPrice = document.getElementById(`company_price_${i}`)
            exchangeBtn.addEventListener("click", () => {

                localStorage['selectedCompany'] = [companyName.innerHTML, companyPrice.innerHTML]
                window.location.href = "buysell_selected.html"
            })
        }


    })

    finance_buy_sell_sector.addEventListener("click", () => {
        table_row_container.innerHTML = ''
        finance_buy_sell_sector.classList.add("buy-sell-sector-selected")
        all_comp_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        resource_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        other_buy_sell_sector.classList.remove("buy-sell-sector-selected")

        const finance_compnaies = []
        for (var i = 0; i < matches.length; i++) {
            if (matches[i]['sector'] == "finance") {
                finance_compnaies.push(matches[i])
            }
        }

        for (var i = 0; i < finance_compnaies.length; i++) {
            const HTML = `<tr id="company_number_${i}">
                    <td class="table_company_number"></td>
                    <td><span>
                            <div class="table-company-logo"></div>
                        </span></td>
                    <td>
                        <span class="table-company-name" id="company_name_${i}"></span>
                    </td>
                    <td class="table_company_sector"></td>
                    <td class="table_company_price" id="company_price_${i}"></td>
                    <td class="table_company_exchangescore"></td>
                    <td><button class="table-trade-btn btn" id="exchange_btn_${i}">Exchange</button></td>
                </tr>`

            table_row_container.innerHTML += HTML

            const table_company_number = document.getElementsByClassName("table_company_number")
            const table_company_logo = document.getElementsByClassName("table-company-logo")
            const table_company_name = document.getElementsByClassName("table-company-name")
            const table_company_sector = document.getElementsByClassName("table_company_sector")
            const table_company_price = document.getElementsByClassName("table_company_price")
            const table_company_exchangescore = document.getElementsByClassName("table_company_exchangescore")


            table_company_name[i].innerHTML = finance_compnaies[i]["name"][0].toUpperCase() + finance_compnaies[i]["name"].slice(1)
            table_company_sector[i].innerHTML = finance_compnaies[i]["sector"][0].toUpperCase() + finance_compnaies[i]["sector"].slice(1)
            table_company_price[i].innerHTML = finance_compnaies[i]["price"]
            table_company_exchangescore[i].innerHTML = finance_compnaies[i]["exchangescore"]
            table_company_number[i].innerHTML = i + 1

        }

        for (var i = 0; i < finance_compnaies.length; i++) {
            const exchangeBtn = document.getElementById(`exchange_btn_${i}`)
            const companyName = document.getElementById(`company_name_${i}`)
            const companyPrice = document.getElementById(`company_price_${i}`)
            exchangeBtn.addEventListener("click", () => {

                localStorage['selectedCompany'] = [companyName.innerHTML, companyPrice.innerHTML]
                window.location.href = "buysell_selected.html"
            })
        }


    })

    resource_buy_sell_sector.addEventListener("click", () => {
        table_row_container.innerHTML = ''
        resource_buy_sell_sector.classList.add("buy-sell-sector-selected")
        finance_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        all_comp_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        other_buy_sell_sector.classList.remove("buy-sell-sector-selected")

        const resource_compnaies = []
        for (var i = 0; i < matches.length; i++) {
            if (matches[i]['sector'] == "resource") {
                resource_compnaies.push(matches[i])
            }
        }

        for (var i = 0; i < resource_compnaies.length; i++) {
            const HTML = `<tr id="company_number_${i}">
                <td class="table_company_number"></td>
                <td><span>
                        <div class="table-company-logo"></div>
                    </span></td>
                <td>
                    <span class="table-company-name" id="company_name_${i}"></span>
                </td>
                <td class="table_company_sector"></td>
                <td class="table_company_price" id="company_price_${i}"></td>
                <td class="table_company_exchangescore"></td>
                <td><button class="table-trade-btn btn" id="exchange_btn_${i}">Exchange</button></td>
            </tr>`

            table_row_container.innerHTML += HTML

            const table_company_number = document.getElementsByClassName("table_company_number")
            const table_company_logo = document.getElementsByClassName("table-company-logo")
            const table_company_name = document.getElementsByClassName("table-company-name")
            const table_company_sector = document.getElementsByClassName("table_company_sector")
            const table_company_price = document.getElementsByClassName("table_company_price")
            const table_company_exchangescore = document.getElementsByClassName("table_company_exchangescore")

            table_company_name[i].innerHTML = resource_compnaies[i]["name"][0].toUpperCase() + resource_compnaies[i]["name"].slice(1)
            table_company_sector[i].innerHTML = resource_compnaies[i]["sector"][0].toUpperCase() + resource_compnaies[i]["sector"].slice(1)
            table_company_price[i].innerHTML = resource_compnaies[i]["price"]
            table_company_exchangescore[i].innerHTML = resource_compnaies[i]["exchangescore"]
            table_company_number[i].innerHTML = i + 1

        }

        for (var i = 0; i < resource_compnaies.length; i++) {
            const exchangeBtn = document.getElementById(`exchange_btn_${i}`)
            const companyName = document.getElementById(`company_name_${i}`)
            const companyPrice = document.getElementById(`company_price_${i}`)
            exchangeBtn.addEventListener("click", () => {

                localStorage['selectedCompany'] = [companyName.innerHTML, companyPrice.innerHTML]
                window.location.href = "buysell_selected.html"
            })
        }

    })

    other_buy_sell_sector.addEventListener("click", () => {
        table_row_container.innerHTML = ''
        other_buy_sell_sector.classList.add("buy-sell-sector-selected")
        finance_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        resource_buy_sell_sector.classList.remove("buy-sell-sector-selected")
        all_comp_buy_sell_sector.classList.remove("buy-sell-sector-selected")

        const other_companies = []
        for (var i = 0; i < matches.length; i++) {
            if (matches[i]['sector'] == "other") {
                other_companies.push(matches[i])
            }
        }

        for (var i = 0; i < other_companies.length; i++) {
            const HTML = `<tr id="company_number_${i}">
                <td class="table_company_number"></td>
                <td><span>
                        <div class="table-company-logo"></div>
                    </span></td>
                <td>
                    <span class="table-company-name" id="company_name_${i}"></span>
                </td>
                <td class="table_company_sector"></td>
                <td class="table_company_price" id="company_price_${i}"></td>
                <td class="table_company_exchangescore"></td>
                <td><button class="table-trade-btn btn" id="exchange_btn_${i}">Exchange</button></td>
            </tr>`

            table_row_container.innerHTML += HTML

            const table_company_number = document.getElementsByClassName("table_company_number")
            const table_company_logo = document.getElementsByClassName("table-company-logo")
            const table_company_name = document.getElementsByClassName("table-company-name")
            const table_company_sector = document.getElementsByClassName("table_company_sector")
            const table_company_price = document.getElementsByClassName("table_company_price")
            const table_company_exchangescore = document.getElementsByClassName("table_company_exchangescore")

            for (var i = 0; i < other_companies.length; i++) {
                table_company_name[i].innerHTML = other_companies[i]["name"][0].toUpperCase() + other_companies[i]["name"].slice(1)
                table_company_sector[i].innerHTML = other_companies[i]["sector"][0].toUpperCase() + other_companies[i]["sector"].slice(1)
                table_company_price[i].innerHTML = other_companies[i]["price"]
                table_company_exchangescore[i].innerHTML = other_companies[i]["exchangescore"]
                table_company_number[i].innerHTML = i + 1
            }


            for (var i = 0; i < other_companies.length; i++) {
                const exchangeBtn = document.getElementById(`exchange_btn_${i}`)
                const companyName = document.getElementById(`company_name_${i}`)
                const companyPrice = document.getElementById(`company_price_${i}`)
                exchangeBtn.addEventListener("click", () => {

                    localStorage['selectedCompany'] = [companyName.innerHTML, companyPrice.innerHTML]
                    window.location.href = "buysell_selected.html"
                })
            }
        }

    })
}
returnCompnaySectors()
// Making the tab filter end

// Search bar start
const buy_sell_input_field = document.getElementsByClassName("buy-sell-input-field")[0]

const buysellSearchCompanies = async searchText => {
    table_row_container.innerHTML = ""

    all_comp_buy_sell_sector.classList.add("buy-sell-sector-selected")
    finance_buy_sell_sector.classList.remove("buy-sell-sector-selected")
    resource_buy_sell_sector.classList.remove("buy-sell-sector-selected")
    other_buy_sell_sector.classList.remove("buy-sell-sector-selected")

    const res = await fetch("../2nd/companies.json")
    const companies = await res.json()

    let matches = companies.filter(company => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return company.name.match(regex)
    })

    if (buy_sell_input_field.length === 0) {
        matches = []
    }

    for (var i = 0; matches.length; i++) {

        //TODO: Error in the HTML says that the name is undefined so the code at the bottom won't run
        const HTML = `<tr id="company_number_${i}">
                <td class="table_company_number">${i + 1}</td>
                <td><span>
                        <div class="table-company-logo"></div>
                    </span></td>
                <td>
                    <span class="table-company-name" id="company_name_${i}">${matches[i]["name"][0].toUpperCase() + matches[i]["name"].slice(1)}</span>
                </td>
                <td class="table_company_sector">${matches[i]["sector"][0].toUpperCase() + matches[i]["sector"].slice(1)}</td>
                <td class="table_company_price" id="company_price_${i}">${matches[i]['price']}</td>
                <td class="table_company_exchangescore">${matches[i]['exchangescore']}</td>
                <td><button class="table-trade-btn btn" id="exchange_btn_${i}">Exchange</button></td>
            </tr>`

        table_row_container.innerHTML += HTML
    }

    for (var i = 0; i < matches.length; i++) {
        const exchangeBtn = document.getElementById(`exchange_btn_${i}`)
        const companyName = document.getElementById(`company_name_${i}`)
        const companyPrice = document.getElementById(`company_price_${i}`)
        exchangeBtn.addEventListener("click", () => {

            localStorage['selectedCompany'] = [companyName.innerHTML, companyPrice.innerHTML]
            window.location.href = "buysell_selected.html"
        })
    }

}

buy_sell_input_field.addEventListener("input", () => buysellSearchCompanies(buy_sell_input_field.value))
// Search bar end