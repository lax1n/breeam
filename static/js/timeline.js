$(function(){

    var startDefault = 1;
    var endDefault = timelineSize;
    var start = 0;
    var end = 0;
    var prevStart = startDefault;
    var prevEnd = endDefault;
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

    function processTimelineVariables(direction){
        var proceed = false;
        if(direction == 'prev'){
            //Check if lower than default values
            if(startDefault >= start){
                start = startDefault;
                end = endDefault;
            }else{
                //Update to last timeline values
                start = prevStart;
                end = prevEnd;
            }
        }else if(direction == 'next'){
            //Check if first time
            if(startDefault == prevStart){
                start = timelineSize - 2;
                end = timelineSize*2 - 2;
                proceed = true;
            }else{
                prevStart = start;
                prevEnd = end;
                //Increase timeline values by interval
                start += timelineSize;
                end += timelineSize;
                proceed = true;
            }

        }else{
            return false;
        }
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
                }else if(direction == 'next'){
                    $('div#timeline a:nth-child(2)').addClass('selected');
                }
                timeline.fadeIn('slow', function () {
                    //Update tooltips
                    $('.tooltip').tooltipster();

                    //Update arrows
                });
            });
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
