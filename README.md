dojo-status-manager
=================

A dojo module that handles displaying an applications current activity.

You can include it as a module into a dojo project. You provide a dom id to add the status manager to as well as some configuration options.

    require(["managers/statusManager"], function(statusManager) {
        
        var sManager = new statusManager({
            containerId: "{domId}",
            loadingImage: "http://www.ajaxload.info/cache/FF/FF/FF/00/00/00/1-0.gif",
            loadingString: "Loading..."
        });
        
    }


Once you've created the status manager, you can then send updates to it by using the dojo/topic module.

    require(["dojo/topic"], function(topic) {
        // You send an updateStart with a message about what's updating
        topic.publish("updateStart", "Message about what's updating");
        
        // When you are done with that update, send an updateStop with the same message as the
        // original to remove that message
        topic.publish("updateStop", "Message about what's updating");        
        
    }

You will also need to include some css styles. See /css/style.css for example use.

    #statusManager {
    }
    
This will be the main dom node of the status updates You'll want to do coloring and positioning here.
    
    .statusMessage {
    }
    
This is the messages alerting the user what's going on. This is for font style changes.

    .statusImage {
    }
    
This is for customizing sizing and position of the "busy" icon
    
    .hide {
    }
    
This is the class that is added when the status manager is hidden
