$(function () {
    //Global data variables
    var urlGlobal = "https://api.covid19api.com/summary";
    var newConfirmedGlobal = $("#new-confirmed-global");
    var totalConfirmedGlobal = $("#total-confirmed-global");
    var newDeathsGlobal = $("#new-deaths-global");
    var totalDeathsGlobal = $("#total-deaths-global");
    var newRecoveredGlobal = $("#new-recovered-global");
    var totalRecoveredGlobal = $("#total-recovered-global");
    var globalDate = $("#date-global");

    //Israel Data Variables
    var newConfirmedIsrael = $("#new-confirmed-israel");
    var totalConfirmedIsrael = $("#total-confirmed-israel");
    var newDeathsIsrael = $("#new-deaths-israel");
    var totalDeathsIsrael = $("#total-deaths-israel");
    var newRecoveredIsrael = $("#new-recovered-israel");
    var totalRecoveredIsrael = $("#total-recovered-israel");
    var israelDate = $("#date-israel");

    //Visited Links
    var first = $('#first');
    var second = $('#second');
    var third = $('#third');
    var fourth = $('#fourth');
    var fifth = $('#fifth');

    var country;
    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: {
            "X-Access-Token": "5cf9dfd5-3449-485e-b5ae-70a60e997864",
        }
    };

    var browserHistory = [];

    //Update  DOM
    function insert_api_data_to_widget_html(result) {
        result = JSON.parse(result);
        newConfirmedGlobal.text(result.Global.NewConfirmed);
        totalConfirmedGlobal.text(result.Global.TotalConfirmed);
        newDeathsGlobal.text(result.Global.NewDeaths);
        totalDeathsGlobal.text(result.Global.TotalDeaths);
        newRecoveredGlobal.text(result.Global.NewRecovered);
        totalRecoveredGlobal.text(result.Global.TotalRecovered);
        globalDate.text(new Date(result.Date));

        country = find_Israel_data(result.Countries);

        newConfirmedIsrael.text(country.NewConfirmed);
        totalConfirmedIsrael.text(country.TotalConfirmed);
        newDeathsIsrael.text(country.NewDeaths);
        totalDeathsIsrael.text(country.TotalDeaths);
        newRecoveredIsrael.text(country.NewRecovered);
        totalRecoveredIsrael.text(country.TotalRecovered);
        israelDate.text(new Date(country.Date));
    }

    //Get Data from API
    function fetch_data(url, requestOptions) {
        fetch(url, requestOptions)
            .then(response => response.text())
            .then(result => insert_api_data_to_widget_html(result))
            .catch(error => console.log('error', error));
    }

    function find_Israel_data(obj) {
        // iterate over each element in the array
        for (var i = 0; i < obj.length; i++) {
            // look for the entry with a matching `code` value
            if (obj[i].CountryCode == "IL") {
                // we found it
                // obj[i].name is the matched result
                var country = obj[i];
            }
        }
        return country;

    }

    function getting_user_browser_history() {
        chrome.history.search({
            text: '',
            maxResults: 5
        }, function (data) {
            data.forEach(function (page) {
                 browserHistory.push(page.url);
            });
        });
    }


    function apply_history_to_dom(browserHistory) {
        setTimeout(() => {
            first.attr('href', `${browserHistory[0]}`);
            second.attr('href', `${browserHistory[1]}`);
            third.attr('href', `${browserHistory[2]}`);
            fourth.attr('href', `${browserHistory[3]}`);
            fifth.attr('href', `${browserHistory[4]}`);
        }, 1000);
    }

    fetch_data(urlGlobal, requestOptions);


    getting_user_browser_history();
    apply_history_to_dom(browserHistory);
});
