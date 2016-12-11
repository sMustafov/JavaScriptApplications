function getInfo() {
    let url = "https://judgetests.firebaseio.com/businfo/" +
        $("#stopId").val() + ".json";
    $.ajax({
        url: url,
        success: displaySuccess,
        error: displayError
    });

    function displaySuccess(respos) {
        $("#stopName").append(respos.name);
        $("#buses").empty();

        for (let repo of Object.keys(respos['buses'])) {
            $('#buses').append('<li>' + `Bus ${repo} arrives in ${respos['buses'][repo]} minutes`+'</li>');
        }
    }

    function displayError() {
        $("#stopName").text('Error');
        $("#buses").empty();
    }
}