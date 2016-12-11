function solve() {
    let apiUrl = 'https://messenger-40767.firebaseio.com/messenger';

    $('#refresh').on('click', function () {
        getMessages();
    });

    $('#submit').on('click', function () {
        addNewMessage();
    });

    function addNewMessage() {
        let author = $('#author').val().trim();
        let content = $('#content').val().trim();
        if (author != '' && content != '') {
            let timestamp = Date.now();
            $.ajax({
                method: 'POST',
                data: JSON.stringify({
                    author,
                    content,
                    timestamp
                }),
                url: apiUrl + '.json',
                success: function () {
                    $('#content').val('');
                    getMessages();
                }
            });
        }
    }

    function getMessages() {
        $.ajax({
            method: 'GET',
            url: apiUrl + '.json',
            success: renderMessages
        })
    }

    function renderMessages(messages) {
        $('#messages').val('');
        let sortedMessages = [...Object.keys(messages)]
            .sort((mA, mB) => messages[mA].timestamp - messages[mB].timestamp)
            .map(m => messages[m]);

        for (let msg of sortedMessages) {
            $('#messages').val($('#messages').val() + `${msg.author}: ${msg.content}\n`);
            $('#messages').text($('#messages').text() + `${msg.author}: ${msg.content}\n`); // JUDGE WTF?????
        }
    }
}