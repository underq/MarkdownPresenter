var Present = {};
Present.converter = new Showdown.converter();
Present.showSlide = function( slide ) {
    Present.currentSlide = slide;
    $('.centered').html(Present.slides[Present.currentSlide]);
    $('.slideCount').html(
            'Slide ' + (Present.currentSlide + 1) + ' of '
                    + Present.slides.length);
};
Present.nextSlide = function() {
    if (Present.currentSlide < Present.slides.length - 1) {
        Present.showSlide(Present.currentSlide + 1);
    }
};
Present.prevSlide = function() {
    if (Present.currentSlide > 0) {
        Present.showSlide(Present.currentSlide - 1);
    }
};


function loadPresentation(urls, cb) {
    var url = urls.pop();
    if (url) {
        $("#loading").html("Loading... "+url);
        $.ajax({
            url: url,
            success: cb,
            error: function(err) {
                loadPresentation(urls, cb);
            }
        });
    }
    else {
        $("#loading").html("Can't find "+filename);
        $("#error").html(err).show();
    }
}

function beginPresentation(data) {
    if (data.length>0) {
    	var converted = Present.converter.makeHtml(data);
    	Present.slides = converted.split('<p>!</p>');
    	Present.showSlide(0);
    	
    	hljs.initHighlightingOnLoad();
	setupNotes();
    }
    
    $(document).keydown(function( e ) {
        if (e.keyCode == 37 || e.keyCode == 38) {
            slideRewind();
            return false;
        }
        if (e.keyCode == 39 || e.keyCode == 40) {
            slideAdvance();
            return false;
        }
    });
}

function slideAdvance() {
    Present.nextSlide();
    setupCode();
    setupNotes();
}

function slideRewind() {
    Present.prevSlide();
    setupCode();
    setupNotes();
}

function setupCode() {
    $('pre code').each(function( i, e ) {
        hljs.highlightBlock(e, '    ');
    });
}
function setupNotes() {
    $('blockquote > blockquote').each( function(i,e) {
	var noteimg = $("<img/>")
	    .attr("src", "img/notes-icon.png")
	    .addClass("note-icon")
	    .toggle(showNote, hideNote);
	$(e).unwrap().wrap("<div id='note'/>").before(noteimg);
    });
}
function showNote() {
    $(this).next().show();
}
function hideNote() {
    $(this).next().hide();
}
 
var filename = location.search && location.search.substr(1).replace(/\+/gi," ");

$(function(){
    // Since the presentation may be hidden in different places with
    // different extensions, we make an array of possibilities to request...
    var urls = [ 'presentations/'+filename+".md" ];
    loadPresentation(urls, beginPresentation);
    
    $("#overlay-right").click(slideAdvance);
    $("#overlay-left").click(slideRewind);
});