function startApp() {
    sessionStorage.clear();

    showHideMenuLinks();
    showView('viewHome');

    const kinveyBaseUrl = "https://baas.kinvey.com/";
    const kinveyAppKey = "kid_HkihhHmGx";
    const kinveyAppSecret = "81c7d8d9158b4c0bb53027bf1074186e";
    const kinveyAppAuthHeaders = {
        'Authorization': "Basic " + btoa(kinveyAppKey + ":" + kinveyAppSecret),
    };

    $("#linkHome").click(showHomeView);
    $("#linkLogin").click(showLoginView);
    $("#linkRegister").click(showRegisterView);
    $("#linkListAds").click(listAds);
    $("#linkCreateAd").click(showCreateAdView);
    $("#linkLogout").click(logoutUser);

    $("#buttonLoginUser").click(loginUser);
    $("#buttonRegisterUser").click(registerUser);
    $("#buttonCreateAd").click(createAd);
    $("#buttonEditAd").click(editAd);

    $("#infoBox, #errorBox").click(function() {
        $(this).fadeOut();
    });

    function showView(viewName) {
        $('main > section').hide();
        $('#' + viewName).show();
    }

    function showHomeView() {
        showView('viewHome');
    }

    function showLoginView() {
        showView('viewLogin');
        $('#formLogin').trigger('reset');
    }

    function showRegisterView() {
        $('#formRegister').trigger('reset');
        showView('viewRegister');
    }

    function showCreateAdView() {
        $('#formCreateAd').trigger('reset');
        showView('viewCreateAd');
    }

    function showHideMenuLinks() {
        $("#linkHome").show();
        if (sessionStorage.getItem('authToken') == null) {
            $("#linkLogin").show();
            $("#linkRegister").show();
            $("#linkListAds").hide();
            $("#linkCreateAd").hide();
            $("#linkLogout").hide();
        } else {
            $("#linkLogin").hide();
            $("#linkRegister").hide();
            $("#linkListAds").show();
            $("#linkCreateAd").show();
            $("#linkLogout").show();
        }
    }

    function registerUser() {
        const kinveyRegisterUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/";
        let userData = {
            username: $('#formRegister input[name=username]').val(),
            password: $('#formRegister input[name=passwd]').val()
        };
        $.ajax({
            method: "POST",
            url: kinveyRegisterUrl,
            headers: kinveyAppAuthHeaders,
            data: userData,
            success: registerSuccess,
            error: handleAjaxError
        });

        function registerSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listAds();
            showInfo('User registration successful.');
        }
    }

    function loginUser() {
        const kinveyLoginUrl = kinveyBaseUrl + "user/" + kinveyAppKey + "/login";
        let userData = {
            username: $('#formLogin input[name=username]').val(),
            password: $('#formLogin input[name=passwd]').val()
        };
        $.ajax({
            method: "POST",
            url: kinveyLoginUrl,
            headers: kinveyAppAuthHeaders,
            data: userData,
            success: loginSuccess,
            error: handleAjaxError
        });

        function loginSuccess(userInfo) {
            saveAuthInSession(userInfo);
            showHideMenuLinks();
            listAds();
            showInfo('Login successful.');
        }
    }

    function createAd() {
        const kinveyAdsUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/ads";
        let bookData = {
            publisher: sessionStorage['userId'],
            title: $('#formCreateAd input[name=title]').val(),
            description: $('#formCreateAd textarea[name=description]').val(),
            datePublished: $('#formCreateAd input[name=datePublished]').val(),
            price: $('#formCreateAd input[name=price]').val()
        };

        $.ajax({
            method: "POST",
            url: kinveyAdsUrl,
            headers: getKinveyUserAuthHeaders(),
            data: bookData,
            success: createAdSuccess,
            error: handleAjaxError
        });

        function createAdSuccess(response) {
            listAds();
            showInfo('Book created.');
        }
    }

    function editAd() {
        const kinveyAdsUrl =  kinveyBaseUrl + "appdata/" + kinveyAppKey +
            "/ads/" + $('#formEditBook input[name=id]').val();
        let bookData = {
            title: $('#formEditAd input[name=title]').val().trim(),
            description: $('#formEditAd textarea[name=description]').val().trim(),
            datePublished: $('#formEditAd input[name=datePublished]').val(),
            price: $('#formEditAd input[name=price]').val()
        };
        $.ajax({
            method: "PUT",
            url: kinveyAdsUrl,
            headers: getKinveyUserAuthHeaders(),
            data: bookData,
            success: editAdSuccess,
            error: handleAjaxError
        });

        function editAdSuccess(response) {
            listAds();
            showInfo('Ad edited.');
        }
    }

    function listAds() {
        $('#ads').empty();
        showView('viewAds');

        const kinveyAdsUrl = kinveyBaseUrl + "appdata/" + kinveyAppKey + "/ads";
        $.ajax({
            method: "GET",
            url: kinveyAdsUrl,
            headers: getKinveyUserAuthHeaders(),
            success: loadAdsSuccess,
            error: handleAjaxError
        });

        function loadAdsSuccess(ads) {
            showInfo('Ads loaded.');
            if (ads.length == 0) {
                $('#ads').text('No ads.');
            } else {
                let adsTable = $('<table>')
                    .append($('<tr>').append(
                        '<th>Title</th>',
                        '<th>Publisher</th>',
                        '<th>Description</th>',
                        '<th>Price</th>',
                        '<th>Date Published</th>')
                    );
                for (let ad of ads) {
                    let links = [];
                    if (ad._acl.creator == sessionStorage['userId']) {
                        let deleteLink = $('<a href="#">[Delete]</a>')
                            .click(function() {
                                deleteAd(ad)
                            });
                        let editLink = $('<a href="#">[Edit]</a>')
                            .click(function() {
                                loadAdForEdit(ad)
                            });
                        links = [deleteLink, ' ', editLink];
                    }
                    adsTable.append($('<tr>').append(
                        $('<td>').text(ad.title),
                        $('<td>').text(sessionStorage['userId']),
                        $('<td>').text(ad.description),
                        $('<td>').text(ad.price),
                        $('<td>').text(ad.datePublished),
                        $('<td>').append(links)
                    ));
                }
                $('#ads').append(adsTable);
            }
        }
    }

    function deleteAd(ad) {
        const kinveyAdsUrl = kinveyBaseUrl + "appdata/" +
            kinveyAppKey + "/ads/" + ad._id;
        $.ajax({
            method: "DELETE",
            url: kinveyAdsUrl,
            headers: getKinveyUserAuthHeaders(),
            success: deleteAdSuccess,
            error: handleAjaxError
        });

        function deleteAdSuccess(response) {
            listAds();
            showInfo('Ad deleted.');
        }
    }

    function loadAdForEdit(ad) {
        const kinveyAdsUrl = kinveyBaseUrl + "appdata/" +
            kinveyAppKey + "/ads/" + ad._id;
        $.ajax({
            method: "GET",
            url: kinveyAdsUrl,
            headers: getKinveyUserAuthHeaders(),
            success: loadAdForEditSuccess,
            error: handleAjaxError
        });

        function loadAdForEditSuccess(ad) {
            $('#formEditAd input[name=id]').val(ad._id);
            $('#formEditAd input[name=publisher]').val(ad.publisher);
            $('#formEditAd input[name=title]').val(ad.title);
            $('#formEditAd textarea[name=description]').val(ad.description);
            $('#formEditAd input[name=datePublished]').val(ad.datePublished);
            $('#formEditAd input[name=price]').val(ad.price);
            showView('viewEditAd');
        }
    }

    function saveAuthInSession(userInfo) {
        let userAuth = userInfo._kmd.authtoken;
        sessionStorage.setItem('authToken', userAuth);
        let userId = userInfo._id;
        sessionStorage.setItem('userId', userId);
        let username = userInfo.username;
        $('#loggedInUser').text("Welcome, " + username + "!");
    }

    function getKinveyUserAuthHeaders() {
        return {
            'Authorization': "Kinvey " + sessionStorage.getItem('authToken'),
        };
    }

    function handleAjaxError(response) {
        let errorMsg = JSON.stringify(response);
        if (response.readyState === 0)
            errorMsg = "Cannot connect due to network error.";
        if (response.responseJSON && response.responseJSON.description)
            errorMsg = response.responseJSON.description;
        showError(errorMsg);
    }

    function showError(errorMsg) {
        $('#errorBox').text("Error: " + errorMsg);
        $('#errorBox').show();
    }

    function logoutUser() {
        sessionStorage.clear();
        $('#loggedInUser').text("");
        showHideMenuLinks();
        showView('viewHome');
        showInfo('Logout successful.');
    }

    function showInfo(message) {
        $('#infoBox').text(message);
        $('#infoBox').show();
        setTimeout(function() {
            $('#infoBox').fadeOut();
        }, 3000);
    }
}