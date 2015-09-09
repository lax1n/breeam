$(function(){

    var view = 0; //Use to keep up which timeline is currently active, can correspond with macro view
    var start = 0;
    var end = interval;
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
                processTimelineVariables('next');
            });
            $(document).on('click', "div#timeline a:first-child", function (e) {
                e.preventDefault();
                processTimelineVariables('prev');
            });
		};
	}();

    var current_direction = null;
    function processTimelineVariables(direction){
        var proceed = false;
        if(direction == 'prev' && view > 0){
            start -= interval;
            end -= interval;
            proceed = true;
        }else if(direction == 'next' && view < macro_views){
            start += interval;
            end += interval;
            proceed = true;
        }else{
            return false;
        }
        //if(direction != current_direction){
            //alert('yes!');
            if(direction == 'next'){
                start -= 2;
                end -= 2;
            }else if(direction == 'prev'){
                start += 2;
                end += 2;
            }
            //current_direction = direction;
        //}
        if(proceed)
            updateTimeline(direction);
    }

    function updateTimeline(direction){
        var data = getTimelineData();
        if(data != null){
            //Load new elements
            timeline.fadeOut('slow', function () {
                timeline.html(data);
                if(direction == 'prev'){
                    $('div#timeline a:nth-last-child(2)').addClass('selected');
                    view--;
                }else if(direction == 'next'){
                    $('div#timeline a:nth-child(2)').addClass('selected');
                    view ++;
                }
                timeline.fadeIn('slow', function () {
                    //Update tooltips
                    $('.tooltip').tooltipster();

                    //Update arrows
                });
            });
        }else if(data == null && direction == 'next'){
            start -= interval + 2;
            end -= interval + 2;
        }
    }

    function getTimelineData(){
        var timelineData = null;
        var timelineUrl = '/timeline/' + start + '/' + end;
        $.ajax({
            url: timelineUrl,
            type: 'get',
            dataType: 'html',
            async: false,
            success: function(data){
                if($(data).find('.pagination__dot').length > 2)
                    timelineData = data;
            }
        });
        return timelineData;
    }

    function nextTimeline(){
        $.get('/timeline/' + start + '/' + end, function(data){
            //Check if more timeline elements
            if($(data).find('.pagination__dot').length > 1){
                //Load new elements
                timeline.fadeOut('slow', function () {
                    /*timeline.load('/timeline/' + start + '/' + end, function(){
                    });*/
                    timeline.html($(data));
                    $('div#timeline a:nth-child(2)').addClass('selected');
                    timeline.fadeIn('slow', function () {
                        //Update tooltips
                        $('.tooltip').tooltipster();

                        //Update arrows
                    });
                });
                //Update timeline variables
            }
        });
    }
    function prevTimeline(){
        $.get('/timeline/' + start + '/' + end, function(data){
            //Check if more timeline elements
            if($(data).find('.pagination__dot').length > 1){
                //Load new elements
                timeline.fadeOut('slow', function () {
                    /*timeline.load('/timeline/' + start + '/' + end, function(){
                    });*/
                    timeline.html($(data));
                    $('div#timeline a:nth-last-child(2)').addClass('selected');
                    timeline.fadeIn('slow', function () {
                        //Update tooltips
                        $('.tooltip').tooltipster();

                        //Update arrows
                    });
                });
            }
        });
    }
});
