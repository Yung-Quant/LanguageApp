/*(function(){
    var $chatbox = $('#messageBox');
    var pubnub = PUBNUB.init({ 
        publish_key: 'demo', 
        subscribe_key: 'demo', 
        ssl: true 
    });
    var box = PUBNUB.$('box'), input = PUBNUB.$('input'), channel = 'chat';
    pubnub.subscribe({
        channel  : channel,
        callback : function(text) { $messageBox.append("<div class='well'>text</div>") }
        //callback : function(text) { box.innerHTML = ('' + text).replace( /[<>]/g, '' ) + '<br>' + box.innerHTML }
    });
    PUBNUB.bind( 'keyup', input, function(e) {
        (e.keyCode || e.charCode) === 13 && pubnub.publish({
            channel : channel, message : input.value, x : (input.value='')
        })
    })
})()*/

$(function () {
    var socket = io('http://localhost:3000');
    var $messageForm = $('#messageForm');
    var $message = $('#message');
    var $chat = $('#chat');
    var $messageBox = $('#messageBox');

    $messageForm.submit(function (e) {
        e.preventDefault();
        socket.emit('send message', {message: $message.val()});
        $message.val('');
    });

    socket.on('new message', function (data) {
        $messageBox.append("<div class='well' style='width:90%;'>" + data.msg + "</div>");
    })
});