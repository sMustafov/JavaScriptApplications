import $ from 'jquery';

const KinveyRequester = (function() {
    const baseUrl = "https://baas.kinvey.com/";
    const appKey = "kid_B1n5jSlXe";
    const appSecret = "b5fdc50a8d5e4f4690579f7dc55b9896";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " + btoa(appKey + ":" + appSecret),
    };

    function loginUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/login",
            headers: kinveyAppAuthHeaders,
            data: { username, password }
        });
    }

    function registerUser(username, password) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/",
            headers: kinveyAppAuthHeaders,
            data: { username, password }
        });
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
        };
    }

    function logoutUser() {
        return $.ajax({
            method: "POST",
            url: baseUrl + "user/" + appKey + "/_logout",
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findAllBooks() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/products",
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findBookById(bookId) {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/products/" + bookId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function findCommentsById() {
        return $.ajax({
            method: "GET",
            url: baseUrl + "appdata/" + appKey + "/comments",
            headers: getKinveyUserAuthHeaders()
        });
    }

    function createBook(name, publisher, description, price) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/products",
            headers: getKinveyUserAuthHeaders(),
            data: { name, publisher, description, price }
        });
    }

    function editBook(bookId, name, publisher, description, price) {
        return $.ajax({
            method: "PUT",
            url: baseUrl + "appdata/" + appKey + "/products/" + bookId,
            headers: getKinveyUserAuthHeaders(),
            data: { name, publisher, description, price }
        });
    }

    function deleteBook(bookId) {
        return $.ajax({
            method: "DELETE",
            url: baseUrl + "appdata/" + appKey + "/products/" + bookId,
            headers: getKinveyUserAuthHeaders()
        });
    }

    function commentBook(commentId, name, publisher, description, price, comment) {
        return $.ajax({
            method: "POST",
            url: baseUrl + "appdata/" + appKey + "/comments",
            headers: getKinveyUserAuthHeaders(),
            data: { commentId, comment }
        });
    }

    return {
        loginUser, registerUser, logoutUser,
        findAllBooks, createBook, findBookById, editBook, deleteBook,
        commentBook, findCommentsById
    }
})();

export default KinveyRequester;
