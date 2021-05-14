var gmail_from_homepage = document.getElementById("head-create-email")
var head_submit_email = document.getElementById("head-submit-email")

head_submit_email.addEventListener('click', function () {
    localStorage["gmail_from_homepage"] = gmail_from_homepage.value
});

// Start Of Search Bar JS
const searchBar = document.querySelector(".head-create-email")
const searchBtn = document.getElementById("head-submit-email")
const tbody_container = document.getElementById("tbody-container")

function outputToHtml(companies) {
    if (companies.length > 0) {

    }
}

const searchCompanies = async searchText => {
    tbody_container.innerHTML = ""
    const res = await fetch("../2nd/companies.json")
    const companies = await res.json()

    let matches = companies.filter(company => {
        const regex = new RegExp(`^${searchText}`, 'gi')
        return company.name.match(regex)
    })

    if (searchText.length === 0) {
        matches = []
    }

    for (var i = 0; i < matches.length; i++) {
        var companyName = matches[i].name
        var companyPrice = matches[i].price
        var companyExchangescore = matches[i].exchangescore
        var firstPartCompany = companyName.slice(" ")

        var firstCompany = firstPartCompany[0].toUpperCase() + firstPartCompany.slice(1);

        const HTML = `
                <tr>
                <td>${i + 1}</td>
                <td><span><img alt="ZmnLogo" class="table-company-logo"></span></td>
                <td>
                    <span class="table-company-name">${firstCompany}</span>
                </td>
                <td>${companyPrice}</td>
                <td>${companyExchangescore}</td>
                <td><button class="table-trade-btn btn">Exchange</button></td>
            </tr>
        `

        tbody_container.innerHTML += HTML
    }
}
// searchBtn.addEventListener('click', () => {

//     searchBtn.innerHTML = "Searching"
//     searchBtn.style.backgroundColor = "rgb(55, 109, 247)"

//     if (searchBar.value != "") {
//         var val = searchBar.value;
//         var nonEmptyOptionsArray = []
//         for (var i = 0; i < options.length; i++) {
//             if (options[i].value != "") {
//                 nonEmptyOptionsArray.push(options[i])
//                 matchList.display = 'none'
//             }
//         }
//         for (var i = 0; i < options.length; i++) {
//             if (options[i].value.toLowerCase() == val.toLowerCase()) {
//                 searchBtn.innerHTML = "Search"
//                 searchBtn.style.backgroundColor = "#1652f0"
//                 localStorage["company"] = val
//                 window.location.href = "../3rth/buysell_page.html"
//                 return 0;
//             }
//         }

//         searchBtn.innerHTML = "Search"
//         searchBtn.style.backgroundColor = "#1652f0"

//         swal("Company not found", "Make sure you have the exact value from the dropdown", "error")
//     }
// })


gmail_from_homepage.addEventListener('input', () => searchCompanies(gmail_from_homepage.value))
// End of Search Bar JS