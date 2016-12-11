function attachEvents(){
    const appId = 'kid_BJcaW3MMl';
    const username = 'user';
    const password = '123';
    const base64Auth = btoa(`${username}:${password}`);
    const authorizationHeader = {Authorization: `Basic ${base64Auth}`};
    const url = `https://baas.kinvey.com/appdata/${appId}/biggestCatches/`;
    const catches = $('#catches');

    clickEvents();

    function createCatch() {
        let data = parseInputData('#addForm');
        if (data) {
            $.ajax({
                method: "POST",
                url: url,
                headers: authorizationHeader,
                data: data,
                success: readCatches,
                error: handleAjaxError
            });
        }
    }

    function readCatches() {
        $.ajax({
            method: "GET",
            url: url,
            headers: authorizationHeader,
            success: processCatches,
            error: handleAjaxError
        });
    }

    function updateCatch(id) {
        let data = parseInputData(id, true);
        if (data) {
            $.ajax({
                method: 'PUT',
                url: url + id,
                headers: authorizationHeader,
                data: data,
                contentType: 'application/json'
            })
                .then(readCatches)
                .catch(handleAjaxError);
        }
    }

    function deleteCatch(id) {
        $.ajax({
            method: 'DELETE',
            url: url + id,
            headers: authorizationHeader
        })
            .then(readCatches)
            .catch(handleAjaxError);
    }

    function processCatches(data) {
        catches.empty();
        for (let item of data) {
            renderCatch(item);
        }
    }

    function renderCatch(catchData) {
        let element = $('<div>')
            .addClass('catch')
            .attr('data-id', catchData._id)
            .append($('<label>').text('Angler'))
            .append($('<input>')
                .attr('type', 'text')
                .addClass('angler')
                .val(catchData.angler))
            .append($('<label>').text('Weight'))
            .append($('<input>')
                .attr('type', 'number')
                .addClass('weight')
                .val(catchData.weight))
            .append($('<label>').text('Species'))
            .append($('<input>')
                .attr('type', 'text')
                .addClass('species')
                .val(catchData.species))
            .append($('<label>').text('Location'))
            .append($('<input>')
                .attr('type', 'text')
                .addClass('location')
                .val(catchData.location))
            .append($('<label>').text('Bait'))
            .append($('<input>')
                .attr('type', 'text')
                .addClass('bait')
                .val(catchData.bait))
            .append($('<label>').text('Capture Time'))
            .append($('<input>')
                .attr('type', 'number')
                .addClass('captureTime')
                .val(catchData.captureTime));

        element
            .append($('<button>')
                .addClass('update').text('Update').on('click', () => updateCatch(catchData._id)))
            .append($('<button>')
                .addClass('delete').text('Delete').on('click', () => deleteCatch(catchData._id)));

        catches.append(element);
    }

    function parseInputData(selector, put = false) {
        if (put) {
            selector = $('#catches').find('[data-id="' + selector + '"]');
        }

        let angler = $(selector).find('.angler').val().trim();
        let weight = $(selector).find('.weight').val().trim();
        let species = $(selector).find('.species').val().trim();
        let location = $(selector).find('.location').val().trim();
        let bait = $(selector).find('.bait').val().trim();
        let captureTime = $(selector).find('.captureTime').val().trim();

        if (angler != '' && weight != '' && species != '' &&
            location != '' && bait != '' && captureTime != '') {
            weight = Number(weight);
            captureTime = Number(captureTime);

            if (Number.isInteger(captureTime)) {
                return JSON.stringify({
                    'angler': angler,
                    'weight': weight,
                    'species': species,
                    'location': location,
                    'bait': bait,
                    'captureTime': captureTime
                });
            }
        }

        return false;
    }

    function clickEvents() {
        $('#aside').find('button.load').on('click', readCatches);
        $('#addForm').find('button.add').on('click', createCatch);
    }

    function handleAjaxError() {
        console.log('Error');
    }
}