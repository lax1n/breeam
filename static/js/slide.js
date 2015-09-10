$(function(){

	var loader;
	var $icon;
	var slider;
	var buttons;
	var page_title;
	var headline;
	var image;
    var timeline;

	//Decor variables
	var decor;
	var decor_id;

	//Macro & Timeline view variables
    var view = 0; //Use to keep up which timeline is currently active, can correspond with macro view
    var start = 0;
    var end = interval;
	
	var init = function(){
		setHTMLObjects();
		setStartUp();
		setEvents();
		
		function setHTMLObjects(){
            timeline = $("div#timeline");
			decor = $('header img, footer img');
			loader = $("#loader");
			$icon = $('.magnifier-icon');
			slider = $("#slider");
			buttons = $("#buttons");
			page_title = $("#page_title");
			headline = $("#headline");
			image = $("#image");
		};
		
		function setStartUp(){
			var first = $('div#timeline a:first-child').attr('href');
			//Set correct slide content
			$.get('/pages/' + first + '/', function(data){
				$("#slider").html($(data).find("#slider").html());
			});
            $('div#timeline a:first-child').addClass("selected");
			updateArrows();
			initiate_macro_view_nav();
			$('.tooltip').tooltipster();
		};
		
		function setEvents(){
			$(document).on('click', "#timeline a", function(e){
				e.preventDefault();
				if(!($(this).hasClass('selected'))){
					findClickPosition($(this));
					// Remove the selected class from the currently selected indicator
					$(this).parent().parent().find(".selected").removeClass("selected");
					// Make the clicked indicator the selected one
					$(this).addClass("selected");
					updateArrows();
				}
			});
			$(".mainContainer").not("#prev_slide", "#next_slide").swipe( {
        		swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
					if($("#timeline .selected").next().attr('href') != null && !($("#macro_wrapper").hasClass("macroWrapper"))){
						nextSlide($("#timeline .selected").next());
					}else if($("#macro_nav .selected").next().attr('href') != null && $("#macro_wrapper").hasClass("macroWrapper")){
						nextMacroView();
					}
        		},

				swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
					if($("#timeline .selected").prev().attr('href') != null && !($("#macro_wrapper").hasClass("macroWrapper"))){
						prevSlide($("#timeline .selected").prev());
					}else if($("#macro_nav .selected").prev().attr('href') != null && $("#macro_wrapper").hasClass("macroWrapper")){
						prevMacroView();
					}
        		},
				threshold:75
      		});

			$(document).keydown(function(e){
				if(e.which == 39){ // Right arrow click
					if($("#macro_wrapper").hasClass("macroWrapper")){
						nextMacroView();
					}else{
						nextSlide($("#timeline .selected").next());
					}
				}else if (e.which == 37){ // Left arrow click
					if($("#macro_wrapper").hasClass("macroWrapper")){
						prevMacroView();
					}else{
						prevSlide($("#timeline .selected").prev());
					}
				}
			});

			$('.magnifier-icon').mouseover(function(){
				$(this).addClass("newBefore").css("opacity", "1");
				$(".magnifier-handle, .magnifier-handle-x").css("background", "rgb(20, 20, 20)");
			});
			
			$('.magnifier-icon').mouseleave(function(){
				$(this).removeClass('newBefore').css("opacity", "0.6");
				$(".magnifier-handle, .magnifier-handle-x").css("background", "rgb(100, 100, 100)");
			});	
				
			$('a#prev_slide').click(function(){
				prevSlide(this);
				return false;
			});
			$('a#next_slide').click(function(){
				nextSlide(this);
				return false;
			});
			$icon.on('click', function (){
				if($(this).hasClass('is-open')){
					$(this).toggleClass('is-open');
					exitMacroView();
				}else{
					$(this).toggleClass('is-open');
					showMacroView();
				}
			});
			$(document).on('click', '#macro_url', function() {
				var slide_href = $(this).attr('href');
            	$.get('/pages/' + slide_href + '/', function(data){
					var new_decor_id = $(data).find('#decor-id').text();
					if(decor_id != new_decor_id &&  new_decor_id.trim() != ''){
						decor_id = new_decor_id;
						var decor_src = [];
						$(data).find('#decor img').each(function () {
							decor_src.push($(this).attr('src'));
						});
						updateDecor(decor_src)
					}
					$("#page_title").attr('class', $(data).find("#page_title").attr('class'));
					headline.text($(data).find("#headline").text());
					$("#slider").html($(data).find("#slider").html());
					$("#buttons").html($(data).find("#buttons"));


					$icon.toggleClass('is-open');
					//Update slide surroundings
					$("#timeline").find(".selected").removeClass("selected");
					$('#timeline a[href="' + slide_href + '"]').addClass("selected");
					updateArrows();
					//Exit macro view
					exitMacroView();
				});
				return false;
			});
			
			$(".macroWrapper a").visited(function() {
				$(this).css(
					{
						filter: "grayscale(100%)",
						opacity: 0.5,
					}
				);
			});

			$(document).on("click", "#macro_next", function (e) {
				e.preventDefault();
				nextMacroView();
			});
			$(document).on("click", "#macro_prev", function (e) {
				e.preventDefault();
				prevMacroView();
			});

			$(".macro_nav_a").click(function (e) {
				e.preventDefault();
				if(!($(this).hasClass('selected'))){
					// Remove the selected class from the currently selected indicator
					$(this).parent().parent().find(".selected").removeClass("selected");
					// Make the clicked indicator the selected one
					$(this).addClass("selected");
					setMacroView($(this).attr('href'));
				}
			});

			//TIMELINE EVENTS
            $(document).on('click', "div#timeline a:last-child", function (e) {
                e.preventDefault();
                changeTimeline('next');
            });
            $(document).on('click', "div#timeline a:first-child", function (e) {
                e.preventDefault();
                changeTimeline('prev');
            });
		};
	}();

	/*
	 * SLIDE FUNCTIONS BEGIN
	 */
	
	function findClickPosition(clicked){
		//Check position of click
		if(clicked.position().left > $("#timeline .selected").position().left){
            setSlide(clicked, 'left');
		}else{
            setSlide(clicked, 'right');
		}
    	return false;
	};

	function setSlide(name, direction){
		var toLoad = $(name).attr('href');
		$("#buttons").fadeOut();
        slider.hide('slide', {direction: direction, easing: 'easeInQuint'}, 1000, function () {
        	showLoader();
            loadContent();
        });
		headline.fadeOut();
        function loadContent() {
            $.get('/pages/' + toLoad + '/', function(data){
				var new_decor_id = $(data).find('#decor-id').text();
				if(decor_id != new_decor_id && new_decor_id.trim() != ''){
					decor_id = new_decor_id;
					decor.fadeOut(function () {
						var decor_src = [];
						$(data).find('#decor img').each(function () {
							decor_src.push($(this).attr('src'));
						});
						updateDecor(decor_src)
						decor.fadeIn('slow');
					});
				}
				$("#page_title").attr('class', $(data).find("#page_title").attr('class'));
				headline.text($(data).find("#headline").text());
				$("#slider").html($(data).find("#slider").html());
				$("#buttons").html($(data).find("#buttons"));
                hideLoader();
            });
        }

		function showLoader(){
			loader.fadeTo(1000, 1);
		}

    	function showNewContent() {
            direction = (direction == 'right') ? 'left' : 'right';
            slider.show('slide', {direction: direction, easing: 'easeInQuint'}, 1000);

    	}

		function hideLoader(){
			loader.fadeOut(function(){
				showNewContent();
				buttons.delay(1000).fadeIn();
				headline.delay(1500).fadeIn();
			});
		}
	}

	function updateArrows(){
		var prev = $("#timeline .selected").prev().attr('href');
		if(prev != null){
			$("#prev_slide").attr('href', prev);
			$("#prev_slide").css("display", "block");
		}else{
			$("#prev_slide").css("display", "none");
		}
		var next = $("#timeline .selected").next().attr('href');
		if(next != null){
			$("#next_slide").attr('href', next);
			$("#next_slide").css("display", "block");
		}else{
			$("#next_slide").css("display", "none");
		}
	}

	function prevSlide(prev){
    	$("#timeline .selected").removeClass("selected").prev().addClass("selected");
		setSlide(prev, 'right');
		updateArrows();
		return false;
	}

	function nextSlide(next){
    	$("#timeline .selected").removeClass("selected").next().addClass("selected");
		setSlide(next, 'left');
		if(next == $("#timeline a:last-child").attr('href')){
			
		}
		updateArrows();
		return false;
	}

	/*
	 * SLIDE FUNCTIONS END
	 */


	/*
	 * DECOR FUNCTIONS BEGIN
	 */

	function updateDecor(decor_srcs){
		//Top decor
		$('header img').each(function () {
			$(this).attr('src', decor_srcs.shift());
		});

		//Bottom decor
		$('footer img').each(function () {
			$(this).attr('src', decor_srcs.shift());
		});
	}

	/*
	 * DECOR FUNCTIONS END
	 */

	/*
	 * MACRO VIEW FUNCTIONS BEGIN
	 */
	
	function showMacroView(){
		$("header").fadeOut('slow');
		$("footer").fadeOut('slow');
		updateMacroArrows();
		$("#wrapper").fadeOut('slow', function(){
			$("#macro_wrapper").hide();
			$("#macro_wrapper").load('/macro/' + start + '/' + end + '/', function(){
				loadMacroContent();
				$("#wrapper").css("display", "none");
				$("#macro_wrapper").addClass("macroWrapper");
				$("#macro_wrapper").fadeIn();
				$("div#macro_nav").fadeIn();
			});
		});
	}

	function exitMacroView(){
		$("#macro_nav").fadeOut();
		$("#macro_wrapper").fadeOut('slow', function(){
			$("header").fadeIn('slow');
			$("footer").fadeIn('slow');
			$("#macro_wrapper").removeClass("macroWrapper");
			$("#macro_wrapper").empty();
			$("#wrapper").fadeIn();
		});
	}

	function initiate_macro_view_nav(){
		var first = 0;
		var last = interval;
		$(".macro_nav_a").each(function(){
			$(this).attr('href', '/macro/' + first + '/' + last + '/');
			first += interval - 2;
			last += interval - 2;
		});
		first = 0;
		last = interval;
	}

	function nextMacroView(){
		//Update macro nav
		var href = $("#macro_nav .selected").next().attr("href");
		$("#macro_nav .selected").removeClass("selected").next().addClass("selected");
		setMacroView(href);
	}

	function prevMacroView(){
		//Update macro nav
		var href = $("#macro_nav .selected").prev().attr("href");
		$("#macro_nav .selected").removeClass("selected").prev().addClass("selected");
		setMacroView(href);
	}

	function updateMacroArrows(){
		var prev = $("#macro_nav .selected").prev().attr('href');
		if(prev != null){
			$("#macro_prev").attr('href', prev);
			$("#macro_prev").css("display", "block");
		}else{
			$("#macro_prev").css("display", "none");
		}
		var next = $("#macro_nav .selected").next().attr('href');
		if(next != null){
			$("#macro_next").attr('href', next);
			$("#macro_next").css("display", "block");
		}else{
			$("#macro_next").css("display", "none");
		}
	}

	function setMacroView(href){
		$("#macro_wrapper").fadeOut(function(){
			$("#macro_wrapper").load(href, function(){
				loadMacroContent();
				$("#macro_wrapper").fadeIn();
			});
		});
		updateMacroArrows();
	}

	function loadMacroContent(){
        $(".macro_content").each(function () {
			var element = $(this);
            $.get('/macro-friendly/' + $(this).attr('href') + '/', function(data){
                element.html($(data).find("#slider").html());
            });
        });
		$('.tooltip').tooltipster();
		$(".macroLinks").mouseover(function(){
			$(this).children(".macroTooltip").fadeIn(200)	
		});
				
		$(".macroLinks").mouseleave(function(){
			$(this).children(".macroTooltip").fadeOut(200)	
		});
    }
	
	/*
	 * MACRO VIEW FUNCTIONS END
	 */

	/*
	 * TIMELINE FUNCTIONS BEGIN
	 */

    function changeTimeline(direction){
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

	/*
	 * TIMELINE FUNCTIONS END
	 */
});
