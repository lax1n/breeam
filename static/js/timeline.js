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
            $(document).on('click', "a#next_slide", function(e){
                e.preventDefault();
                alert($(this).attr('href'));
                if($(this).attr('href') == $("div#timeline a:last-child").attr('href')){
                    alert('lol');
                    //Initiate next timeline
                }
            });
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

    function processTimelineVariables(direction){
        var proceed = false;
        if(direction == 'prev' && view > 0){
            prevTimelineUpdate();
            proceed = true;
        }else if(direction == 'next' && view < macro_views - 1){
            nextTimelineUpdate();
            proceed = true;
        }else{
            return false;
        }
        if(proceed)
            updateTimeline(direction);
    }

    function prevTimelineUpdate(){
        start -= interval + 2;
        end -= interval + 2;
    }

    function nextTimelineUpdate(){
        start += interval - 2;
        end += interval - 2;
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
});
