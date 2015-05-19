(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    var tokenID = "";
    var socket = new WebSocket("ws://192.168.0.109:1337");
     
    socket.onopen = function(){
        $('#txt-1').text('connected');
    };

     /* button  #btn-1 */
    $(document).on("click", "#btn-1", function(evt)
    {
        /* your code goes here */ 
        sendMsg(tokenID);
    });
    
        /* button  #btn-2 */
    $(document).on("click", "#btn-2", function(evt)
    {
        /* your code goes here */ 
        sendNudge();
    });
     
    function sendMsg(myToken) {
        var msg = {
            //expand the list of type here
            type: "token",
            text: myToken
        };

        // Send the msg object as a JSON-formatted string.
        socket.send(JSON.stringify(msg));
    }
     
    function sendNudge() {
        var msg = {
            //expand the list of type here
            type: "nudge",
            text: "nudge you",
            anytag: "nothing"
        };

        // Send the msg object as a JSON-formatted string.
        socket.send(JSON.stringify(msg));
    }
     
    socket.onmessage = function(event) {
        var msg = JSON.parse(event.data);

        switch(msg.type) {
            case "message":
                $('#txt-1').text(msg.text);
                break;
            case "nudge":
                $('#txt-1').text(msg.message);
        }   
    };
     
     
     window.plugins.pushNotification.unregister(successHandler, errorHandler);
     window.plugins.pushNotification.register(
        successHandler,
        errorHandler,
        {
            //senderID is the project ID
            "senderID":"662198846",
            //callback function that is executed when phone recieves a notification for this app
            "ecb":"onNotification"
    });
     
     function successHandler (result) {
            alert('result = ' + result);
        }
     
     function errorHandler (error) {
            alert('error = ' + error);
        }
     
     window.onNotification = function(e) 
        {
            switch( e.event )
            {
                //app is registered to receive notification
                case 'registered':
                    if(e.regid.length > 0)
                    {
            // Your Android push server needs to know the token before it can push to this device
            // here is where you might want to send the token to your server along with user credentials.
                        alert('registration id = '+e.regid);
                        tokenID = e.regid;
                        //socket.send(tokenID);
                    }
                    break;
                case 'message':
                  //Do something with the push message. 
                  //This function is fired when push message is received or if user clicks on the tile.
                  alert('message = '+e.message+' msgcnt = '+e.msgcnt);
                break;
                case 'error':
                  alert('GCM error = '+e.msg);
                break;
                default:
                  alert('An unknown GCM event has occurred');
                  break;
            }
        };
     
    
    }
 document.addEventListener("deviceready", register_event_handlers, false);
})();

            
 
       