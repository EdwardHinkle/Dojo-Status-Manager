define(["dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/query", "dojo/dom", "dojo/dom-class", "dojo/dom-construct", "dojo/topic"], function(declare, array, lang, query, dom, domClass, construct, topic) {

    return declare(null,
    /**
     * @lends capi/statusManager
     */
    {

        updateProcesses: 0,
        /**
        * Creates a status manager that communicates to users when the map is being updated
        * @author Eddie Hinkle <bhinkle@usaid.gov>
        * @constructs
        */
        constructor: function(config) {

            console.debug("Status Manager Built");

            var containerId = config.containerId || undefined;
            var statusImageIndicator = config.loadingImage || "http://www.ajaxload.info/cache/FF/FF/FF/00/00/00/1-0.gif";
            var loadingMessageString = config.loadingString || "Please Wait...";

            //-- Build Loading Status Box --//
            this.statusBox = construct.create("div", { id: "statusManager" }, dom.byId(containerId));
            var statusImage = construct.create("img", { id: "statusManagerIndicator", src: statusImageIndicator }, this.statusBox);
            domClass.add(statusImage, "statusImage");
            this.loadingString = construct.create("span", { innerHTML: loadingMessageString + "<br>" }, this.statusBox);
            domClass.add(this.loadingString, "loadingString");
            this.statusMessage = construct.create("span", { id: "statusManagerMessage" }, this.statusBox);
            domClass.add(this.statusMessage, "statusMessage");

            //-- Set up map update subscriptions --//
            topic.subscribe("updateStart", lang.hitch(this, function(message){
                this.start(message);
            }));

            topic.subscribe("updateStop", lang.hitch(this, function(message){
                this.stop(message);
            }));

        },

        start: function(message) {
            this.updateProcesses++;
            if (this.updateProcesses > 0)
            {
                domClass.remove(this.statusBox, "hide");
                if (message !== undefined) {
                    //-- todo: There should be a better way then modifying the innerHTML --//
                    this.statusMessage.innerHTML = this.statusMessage.innerHTML + message + "<br>";
                }
                return true;
            }
            return false;
        },

        stop: function(message) {
            this.updateProcesses--;
            //-- todo: There should be a better way then modifying the innerHTML --//
            this.statusMessage.innerHTML = this.statusMessage.innerHTML.replace(message + "<br>", "");
            if (this.updateProcesses < 1)
            {
                domClass.add(this.statusBox, "hide");
                return false;
            }
            return true;
        },

        call: topic.publish

    });
});


