$(function(){

    var timeline_size = timelineSize;
    var start = timelineSize - 1;
    var end = timelineSize*2 - 1;
    var timeline;
	
	var init = function(){
		setHTMLObjects();
		setStartUp();
		setEvents();
		
		function setHTMLObjects(){
            timeline = $("div#timeline");
		};
		
		function setStartUp(){
		};
		
		function setEvents(){
            $(document).on('click', "div#timeline a:last-child", function (e) {
                e.preventDefault();
                nextTimeline();
            });
		};
	}();

    function nextTimeline(){
        $.get('/timeline/' + start + '/' + end, function(data){
            //Check if more timeline elements
            if($(data).find('.pagination__dot').length > 1){
                //Load new elements
                timeline.fadeOut('slow', function () {
                    /*timeline.load('/timeline/' + start + '/' + end, function(){
                    });*/
                    timeline.html($(data));
                    $('div#timeline a:first-child').addClass('selected');
                    timeline.fadeIn('slow', function () {
                        //Update tooltips
                        $('.tooltip').tooltipster();

                        //Update arrows
                    });
                });
                //Update timeline variables
                start += timelineSize;
                end += timelineSize;
            }
        });

    }
});
