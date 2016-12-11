$(function attachEvents() {
    const appId = 'kid_BJXTsSi-e';
    const username = 'guest';
    const password = 'guest';
    const base64Auth = btoa(`${username}:${password}`);
    const authorizationHeader = {Authorization: `Basic ${base64Auth}`};
    const apiBaseUrl = `https://baas.kinvey.com/appdata/${appId}/`;

    $.get({
        url: apiBaseUrl + 'students',
        headers: authorizationHeader
    })
        .then(fillMenu)
        .catch(renderError);


    function fillMenu(students) {
        students.sort(
            function(a, b) {
                return a['ID'] - b['ID']
            }
        );
        let result = $("#results > tbody:last");
        let tr = '<tr>';
        for (let i = 0; i < students.length; i++) {
            tr = '<tr>';
            tr += "<td>" + students[i]['ID'] + "</td><td>" + students[i]['FirstName'] +
                "</td><td>" + students[i]['LastName'] + "</td><td>" + students[i]['FacultyNumber'] +
                "</td><td>" + students[i]['Grade'] + "</td>";
            tr += '</tr>';
            result.append(tr);
        }
    }

    function renderError(error) {

    }
});