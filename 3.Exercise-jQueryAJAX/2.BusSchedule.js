function solve() {
    let firstId = 'depot';
    let nextSpirka = '';

    function depart() {
        $.get("https://judgetests.firebaseio.com/schedule/" +
            firstId + ".json")
            .then(displayName)
            .catch(displayError);

        $('#arrive').removeAttr('disabled');
        $('#depart').attr('disabled', 'disabled');
    }

    function arrive(){
        $('#info').find('span').text(`Arriving at ${nextSpirka}`);
        $('#depart').removeAttr('disabled');
        $('#arrive').attr('disabled', 'disabled');
    }

    function displayName(spirka) {
        $('#info').find('span').text(`Next stop ${spirka['name']}`);
        firstId = spirka['next'];
        nextSpirka = spirka['name'];
    }

    function displayError(err){
        $('#info').find('span').text('Error');
    }

    return {
        depart,
        arrive
    };
}