
$(function(){

	var loader;
	var $icon;
	var content;
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
			content = $("#content");
			buttons = $("#buttons");
			page_title = $("#page_title");
			headline = $("#headline");
			image = $("#image");
		};
		
		function setStartUp(){
			var first = '/pages/' + $('div#timeline a:first-child').attr('href');
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
			$('a.arrow-left').click(prevSlide);
			$('a.arrow-right').click(nextSlide);
			$icon.on('click', function (){
				if($(this).hasClass('is-open')){
					exitMacroView();
				}
  				$(this).toggleClass('is-open');
				showMacroView();
			});
		};
	}();
	
	function newPageClickEvent(){
		//Check position of click
		if($(this).position().left > $(".pagination .selected").position().left){
			leftContentAnimation();
		}else{
			rightContentAnimation();
		}
		setSlide(this);
    	return false;
	};

	function setSlide(name){
		var toLoad = '/pages/' + $(name).attr('href');
		buttons.fadeOut();
		content.animate({
				opacity: 0,
		   }, 500, loadContent);
		showLoader();
		headline.fadeOut();
	   function loadContent() {
		   $.getJSON(toLoad + '/json', function(data){
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
        	content.animate({
				left: ["0%", "easeInQuint"],
				opacity: 1
		   }, 500, hideLoader());
    	}

		function hideLoader(){
			loader.fadeOut(function(){
				headline.delay(500).fadeIn();
			});
		}
	}

	function setButtons(slide){
		buttons.hide().load(slide + '/buttons', function(){
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

	function leftContentAnimation(){
		content.animate({
				left: ["-100%", "easeOutQuint"]
		   }, 500, function(){
			   		content.css("left", "100%");
		});
	}

	function rightContentAnimation(){
		content.animate({
				left: ["100%", "easeOutQuint"]
		   }, 500, function(){
			   		content.css("left", "-100%");
		});
	}

	function prevSlide(){
    	$(".pagination .selected").removeClass("selected").prev().addClass("selected");
		rightContentAnimation();
		setSlide(this);
		updateArrows()
		return false;
	}

	function nextSlide(){
    	$(".pagination .selected").removeClass("selected").next().addClass("selected");
		leftContentAnimation();
		setSlide(this);
		updateArrows()
		return false;
	}

	function showMacroView(){
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
			$("#macro_wrapper").removeClass("macroWrapper");
			$("#macro_wrapper").empty();
			$("#wrapper").fadeIn();
		});
	}
});