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
    }
    
    $(document).keydown(function( e ) {
        if (e.keyCode == 36 || e.keyCode == 37) {
            slideRewind();
            return false;
        }
        if (e.keyCode == 38 || e.keyCode == 39) {
            slideAdvance();
            return false;
        }
    });
}

function slideAdvance() {
    Present.nextSlide();
    $('pre code').each(function( i, e ) {
        hljs.highlightBlock(e, '    ');
    });
}

function slideRewind() {
    Present.prevSlide();
    $('pre code').each(function( i, e ) {
        hljs.highlightBlock(e, '    ');
    });
}

var filename = location.search && location.search.substr(1).replace(/\+/gi," ");

$(function(){
    // Since the presentation may be hidden in different places with
    // different extensions, we make an array of possibilities to request...
    var urls = [ 'presentations/'+filename+".md",
                 'presentations/'+filename+".txt",
                 '/p/'+filename+".md",
                 '/p/'+filename+".txt", ];
    loadPresentation(urls, beginPresentation);
    
    $("#overlay-right").click(slideAdvance);
    $("#overlay-left").click(slideRewind);
});