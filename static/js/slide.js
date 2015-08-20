
$(function(){

	var loader;
	var content;
	var buttons;
	
	var init = function(){
		setHTMLObjects();
		setStartUp();
		setEvents();
		
		function setHTMLObjects(){
			loader = $("#loader");
			content = $("#content");
			buttons = $("#buttons");
		};
		
		function setStartUp(){
			var first = '/pages/' + $('div#timeline a:first-child').attr('href');
            $('div#timeline a:first-child').addClass("selected");
   			content.load(first, function(){
				$("#image").css("width", $(window).width() * 0.9, "height", $(window));
			});
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
	   function loadContent() {
		   content.load(toLoad, function(){
			   $("#image").css("width", $(window).width() * 0.9);
			   showNewContent();
			   setButtons(toLoad);
		   });
    	}

		function showLoader(){
			loader.fadeIn();
		}

    	function showNewContent() {
        	content.animate({
				left: ["0%", "easeInQuint"],
				opacity: 1
		   }, 500, hideLoader());
    	}

		function hideLoader(){
			loader.fadeOut();
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
});