$(function(){

	var loader;
	var $icon;
	var slider;
	var buttons;
	var page_title;
	var headline;
	var image;

	//Macro view variables
	var interval = 12;
	var start = 1;
	var end = interval;
	
	var init = function(){
		setHTMLObjects();
		setStartUp();
		setEvents();
		
		function setHTMLObjects(){
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
		};
		
		function setEvents(){
			$('div#timeline a').click(newPageClickEvent);
			$(".pagination a").click(function(e){
				e.preventDefault();
				// Remove the selected class from the currently selected indicator
				$(this).parent().parent().find(".selected").removeClass("selected");
				// Make the clicked indicator the selected one
				$(this).addClass("selected");
				updateArrows();
			});
			$(".mainContainer").not(".arrow-left", ".arrow-right").swipe( {
        		swipeLeft:function(event, direction, distance, duration, fingerCount, fingerData) {
					if($(".pagination .selected").next().attr('href') != null && !($("#macro_wrapper").hasClass("macroWrapper"))){
						nextSlide($(".pagination .selected").next());
					}
        		},

				swipeRight:function(event, direction, distance, duration, fingerCount, fingerData) {
					if($(".pagination .selected").prev().attr('href') != null && !($("#macro_wrapper").hasClass("macroWrapper"))){
						prevSlide($(".pagination .selected").prev());
					}
        		},
				threshold:75
      		});

			$(document).keydown(function(e){
				if(e.which == 39){ // Right arrow click
					nextSlide($(".pagination .selected").next());
				}else if (e.which == 37){ // Left arrow click
					prevSlide($(".pagination .selected").prev());
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
				
			$('a.arrow-left').click(function(){
				prevSlide(this);
				return false;
			});
			$('a.arrow-right').click(function(){
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
					$("#page_title").attr('class', $(data).find("#page_title").attr('class'));
					headline.text($(data).find("#headline").text());
					$("#slider").html($(data).find("#slider").html());
					$("#buttons").html($(data).find("#buttons"));


					$icon.toggleClass('is-open');
					//Update slide surroundings
					$(".pagination").find(".selected").removeClass("selected");
					$('.pagination a[href="' + slide_href + '"]').addClass("selected");
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

			$(document).on("click", "#macro_next", function () {
				nextMacroView();
			});
			$(document).on("click", "#macro_prev", function () {
				prevMacroView();
			});

			$(".macro_nav_a").click(function () {
				setMacroView($(this).attr('href'))
			});
		};
	}();
	
	function newPageClickEvent(){
		//Check position of click
		if($(this).position().left > $(".pagination .selected").position().left){
            setSlide(this, 'left');
		}else{
            setSlide(this, 'right');
		}
    	return false;
	};

	function setSlide(name, direction){
		var toLoad = $(name).attr('href');
		$("#buttons").fadeOut();
        slider.hide('slide', {direction: direction, easing: 'easeInQuint'}, 1000, function () {
            loadContent();
        });
        showLoader();
		headline.fadeOut();
        function loadContent() {
            $.get('/pages/' + toLoad + '/', function(data){
				$("#page_title").attr('class', $(data).find("#page_title").attr('class'));
				headline.text($(data).find("#headline").text());
				$("#slider").html($(data).find("#slider").html());
				$("#buttons").html($(data).find("#buttons"));
                /*if(data.align_title_in_image){
                    page_title.attr('class', 'pageTitleFloat')
                }else{
                    page_title.attr('class', 'pageTitleStandard')
                }
                $("#headline").text(data.title);
                image.attr('src', data.image_src);*/
                showNewContent();
            });
        }

		function showLoader(){
			loader.fadeTo(1000, 1);
		}

    	function showNewContent() {
            direction = (direction == 'right') ? 'left' : 'right';
            slider.show('slide', {direction: direction, easing: 'easeInQuint'}, 1000);
            hideLoader();
    	}

		function hideLoader(){
			loader.fadeOut(function(){
				buttons.delay(1000).fadeIn();
				headline.delay(1500).fadeIn();
			});
		}
	}

	function updateArrows(){
		var prev = $(".pagination .selected").prev().attr('href');
		if(prev != null){
			$(".arrow-left").attr('href', prev);
			$(".arrow-left").css("display", "block");
		}else{
			$(".arrow-left").css("display", "none");
		}
		var next = $(".pagination .selected").next().attr('href');
		if(next != null){
			$(".arrow-right").attr('href', next);
			$(".arrow-right").css("display", "block");
		}else{
			$(".arrow-right").css("display", "none");
		}
	}

	function prevSlide(prev){
    	$(".pagination .selected").removeClass("selected").prev().addClass("selected");
		setSlide(prev, 'right');
		updateArrows();
		return false;
	}

	function nextSlide(next){
    	$(".pagination .selected").removeClass("selected").next().addClass("selected");
		setSlide(next, 'left');
		updateArrows();
		return false;
	}

	function showMacroView(){
		$("header").fadeOut('slow');
		$("footer").fadeOut('slow');
		$("#wrapper").fadeOut('slow', function(){
			$("#macro_wrapper").hide();
			$("#macro_wrapper").load('/macro/' + start + '/' + end + '/', function(){
				loadMacroContent();
				$("#wrapper").css("display", "none");
				$("#macro_wrapper").addClass("macroWrapper");
				$("#macro_wrapper").fadeIn();
				$("#macro_nav").fadeIn();
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
		start = 1;
		end = interval;
	}

	function initiate_macro_view_nav(){
		$(".macro_nav_a").each(function(){
			$(this).attr('href', '/macro/' + start + '/' + end + '/');
			start += interval;
			end += interval;
		});
		start = 1;
		end = interval;
	}

	function nextMacroView(){
		start += interval;
		end += interval;
		setMacroView('/macro/' + start + '/' + end + '/');
	}

	function prevMacroView(){
		if(start - interval < 1){
			start = 1;
			end = interval
		}else{
			start -= interval;
			end -= interval;
		}
		setMacroView('/macro/' + start + '/' + end + '/');
	}

	function setMacroView(view){
		$("#macro_wrapper").fadeOut(function(){
			$("#macro_wrapper").load(view, function(){
				$("#macro_wrapper").fadeIn();
			});
		});
	}

	function loadMacroContent(){
        $(".macro_content").each(function () {
            //alert('/pages/' + $(this).attr('href') + '/');
            $.get('/pages/' + $(this).attr('href') + '/', function(data){
                //$(this).html($(data).find("#slider").html());
				$(this).addClass('derp');
            });
        });
    }
});
