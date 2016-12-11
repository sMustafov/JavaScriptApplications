function attachEvents() {
    let code = '';
    $('#submit').click(weather);

    let baseServiceUrl = 'https://judgetests.firebaseio.com/locations.json';

    function weather() {
        $.get(baseServiceUrl)
            .then(displayWeather)
            .catch(displayError);
    }
    
    function displayWeather(locations) {
        for (let key in locations) {

            let city = locations[key]['name'];
            if(city == $('#location').val()){
                code = locations[key]['code'];

                let url = `https://judgetests.firebaseio.com/forecast/today/${code}.json`;

                $.get(url)
                    .then(weatherLoad)
                    .catch(displayError);
            }
        }
    }

    function weatherLoad(city) {
        $('#forecast').attr('style','visible');
        let c = '';
        if(city['forecast'].condition == 'Rain'){
            c = '&#x2614;';
        }else if(city['forecast'].condition == 'Sunny'){
            c = '&#x2600;';
        }else if(city['forecast'].condition == 'Partly sunny'){
            c = '&#x26C5;';
        }else if(city['forecast'].condition == 'Overcast'){
            c = '&#x2601;';
        }
        $('#current').append(`<span class="condition symbol"> ${c} </span>`);

        let span = $('<span>').attr('class', 'condition');
        span.append(`<span class="forecast-data"> ${city['name']} </span>`);
        span.append(`<span class="forecast-data"> ${city['forecast'].low}&#176;/${city['forecast'].high}&#176;</span>`);
        span.append(`<span class="forecast-data"> ${city['forecast'].condition} </span>`);

        $('#current').append(span);

        let url1 = `https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`;

        $.get(url1)
            .then(weatherLoadForThree)
            .catch(displayError);
    }

    function weatherLoadForThree(city) {
        for (let i = 0; i < 3; i++) {
            let c = '';

            if(city['forecast'][i].condition == 'Rain'){
                c = '&#x2614;';
            }else if(city['forecast'][i].condition == 'Sunny'){
                c = '&#x2600;';
            }else if(city['forecast'][i].condition == 'Partly sunny'){
                c = '&#x26C5;';
            }else if(city['forecast'][i].condition == 'Overcast'){
                c = '&#x2601;';
            }

            let span = $('<span>').attr('class', 'upcoming');

            span.append(`<span class="symbol"> ${c} </span>`);

            span.append(`<span class="forecast-data"> ${city['forecast'][i].low}&#176;/${city['forecast'][i].high}&#176;</span>`);
            span.append(`<span class="forecast-data"> ${city['forecast'][i].condition} </span>`);

            $('#upcoming').append(span);
        }
    }

    function displayError() {

    }
}