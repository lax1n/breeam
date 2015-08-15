
$(function(){
	
	var content;
	
	var init = function(){
		setHTMLObjects();
		setStartUp();
		setEvents();
		
		function setHTMLObjects(){
			content = $("#content");
		};
		
		function setStartUp(){
			var first = $('div#timeline a:first-child').attr('href');
            $('div#timeline a:first-child').addClass("selected");
   			content.load('/pages/' + first);
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
	   content.animate({
				opacity: 0
		   }, 300, loadContent);
	   
	   function loadContent() {
        	content.load(toLoad,'',showNewContent())
    	}

    	function showNewContent() {
        	content.animate({
				left: "0%",
				opacity: 1
		   }, 300);
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
			$(".arrow-right").css("display", "block");;
		}else{
			$(".arrow-right").css("display", "none");
		}
	}

	function leftContentAnimation(){
		content.animate({
				left: "-100%",
		   }, 500, function(){
			   		content.css("left", "100%");
		});
	}

	function rightContentAnimation(){
		content.animate({
				left: "100%",
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
