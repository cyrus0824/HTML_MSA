jQuery(document).ready(function() {
    (function(window){

        /* A full compatability script from MDN: */
        var supportPageOffset = window.pageXOffset !== undefined;
        var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");

        /* Set up some variables  */
        var header = document.getElementById("headers");
        var position = document.getElementById("position");
        /* Add an event to the window.onscroll event */
        window.addEventListener("scroll", function(e) {

            /* A full compatability script from MDN for gathering the x and y values of scroll: */
            var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
            var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

            header.style.top = -y + 51 + "px";
            position.style.left = -x + "px";
        });
    })(window);

    jQuery.each(MSA, function(seqNum, seqObj) {
        MSA[seqNum]["sequence"] = seqObj["sequence"] + seqObj["sequence"] + seqObj["sequence"] + seqObj["sequence"] + seqObj["sequence"];
    });

    /* Create position numbering line */
    var firstLine = '&nbsp;&nbsp;&nbsp;';
    var secondLine = '';
    var nextMark = 5;
    var preSpaces = 1;
    var postSpaces = 3;
    while(nextMark < MSA[0]["sequence"].length) {
        firstLine += Array(preSpaces + 1).join("&nbsp;") + nextMark.toString() + Array(postSpaces + 1).join("&nbsp;");
        nextMark += 5;
        preSpaces = 2 - Math.floor(nextMark.toString().length/2);
        postSpaces = 3 - Math.floor(nextMark.toString().length/2) - nextMark.toString().length % 2;
    }

    /* Create a mark every 5 positions */
    jQuery(".position").append("<p class='line line0'>" + firstLine + "</p>");

    for(var p=0, len = MSA[0]["sequence"].length; p < len; p++) {
        if(((p+1)%5) === 0) {secondLine += '|';}
        else {secondLine += '&nbsp;';}
    }

    jQuery(".position").append("<p class='line line1'>" + secondLine + "</p>");

    jQuery.each(MSA, function(seqNum, seqObj) {
        jQuery(".headers").append("<p class='line'>" + seqObj["header"] + "</p>");
        var thisSeq = seqObj["sequence"];
        var thisPos = 0;
        var thisHTML = '';
        if("highlight" in seqObj) {
            jQuery.each(seqObj["highlight"], function(hn, ho) {
                thisHTML += thisSeq.slice(thisPos, ho[0] - 1) + '<span style="' + ho[1] + '">' + thisSeq.charAt(ho[0] - 1) + '</span>'
                thisPos = ho[0];
            });
            if(thisPos != thisSeq.length) {thisHTML += thisSeq.slice(thisPos);}
        }
        else {thisHTML = thisSeq;}
        jQuery(".alignment").append("<p class='line'>" + thisHTML + "</p>");
        if(seqNum == 0) {
        }
    });
});
