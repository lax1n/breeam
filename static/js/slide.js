$(function(){

	var loader;
	var $icon;
	var slider;
	var buttons;
	var page_title;
	var headline;
	var image;
	
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
            $('div#timeline a:first-child').addClass("selected");
			setButtons(first);
			updateArrows();
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
				$.getJSON('/pages/' + slide_href + '/json', function(data){
					if(data.align_title_in_image){
						page_title.attr('class', 'pageTitleFloat')
					}else{
						page_title.attr('class', 'pageTitleStandard')
					}
					$("#headline").text(data.title);
					image.attr('src', data.image_src);
					$icon.toggleClass('is-open');

					//Update slide surroundings
					$(".pagination").find(".selected").removeClass("selected");
					$('.pagination a[href="' + slide_href + '"]').addClass("selected");
					updateArrows();
					setButtons(slide_href);
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
		buttons.fadeOut();
        slider.hide('slide', {direction: direction, easing: 'easeInQuint'}, 1000, function () {
            loadContent();
        });
        showLoader();
		headline.fadeOut();
        return false;
        function loadContent() {
            $.getJSON('/pages/' + toLoad + '/json', function(data){
                if(data.align_title_in_image){
                    page_title.attr('class', 'pageTitleFloat')
                }else{
                    page_title.attr('class', 'pageTitleStandard')
                }
                $("#headline").text(data.title);
                image.attr('src', data.image_src);
                showNewContent();
                setButtons(toLoad);
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
				headline.delay(500).fadeIn();
			});
		}
	}

	function setButtons(slide_href){
		buttons.hide().load('/pages/' + slide_href + '/buttons', function(){
			buttons.fadeIn("slow");
		})
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
			$("#macro_wrapper").load('/macro/', function(){
				$("#wrapper").css("display", "none");
				$("#macro_wrapper").addClass("macroWrapper");
				$("#macro_wrapper").fadeIn();
			});
		});
	}

	function exitMacroView(){
		$("#macro_wrapper").fadeOut('slow', function(){
			$("header").fadeIn('slow');
			$("footer").fadeIn('slow');
			$("#macro_wrapper").removeClass("macroWrapper");
			$("#macro_wrapper").empty();
			$("#wrapper").fadeIn();
		});
	}
});