var socket = io();

function ScrolltoBottom() {
    var messages = $('#messages');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');

    messages.scrollTop(scrollHeight);
}

socket.on('connect',function(){
    console.log('connected to server');
});

socket.on('newMessage',function (Message) {
    var formattedTime = moment(Message.createdAt).format('h:mm a');
    console.log('Message recieved',Message);

    var template = $("#message-template").html();
    var html = Mustache.render(template,{
        text:Message.text,
        from:Message.from,
        createdAt:formattedTime
    });

    $("#messages").append(html);
    ScrolltoBottom();
});

socket.on('newLocationMessage',function (Message) {
    var formattedTime = moment(Message.createdAt).format('h:mm a');
    var template = $("#location-message-template").html();
    var html = Mustache.render(template,{
        from:Message.from,
        url:Message.url,
        createdAt:formattedTime
    });

    $("#messages").append(html);
    ScrolltoBottom();
});

socket.on('disconnect',function(){
    console.log('disconnected from server');
});

$('#message-form').on('submit',function(e){
    e.preventDefault();

    var MessageTextbox = $('[name=message]');
    socket.emit('createMessage',{
        from:'User',
        text: MessageTextbox.val()
    },function(){
        MessageTextbox.val('');
    });
});

var locationButton = $('#send-location');

locationButton.on('click',function () {
   if(!navigator.geolocation){
       return alert("Geolocation is not supported by your browser");
   }

   locationButton.attr('disabled','disabled').text('sending location...');

   navigator.geolocation.getCurrentPosition(function (position) {
       locationButton.removeAttr('disabled').text('send location');

       socket.emit('createLocationMessage',{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
       });
   },function () {
       locationButton.removeAttr('disabled').text('send location');

       return alert("Unable to fetch Location.");
   });
});