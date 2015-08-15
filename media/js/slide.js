
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
		setSlide(this);
    	return false;
	};

	function setSlide(name){
	   var toLoad = '/pages/' + $(name).attr('href');
	   content.animate({
				left: "100%",
				opacity: 0
		   }, 1000, loadContent);

       function loadContent() {
        	content.load(toLoad,'',showNewContent())
    	}

    	function showNewContent() {
        	content.animate({
				left: "0%",
				opacity: 1
		   }, 1000);;
    	}
	}

	function updateArrows(){
		var prev = $(".pagination .selected").prev().attr('href');
		if(prev != null){
			$(".arrow-left").attr('href', prev);
			$(".arrow-left").css("opacity", 1);
		}else{
			$(".arrow-left").css("opacity", 0);
		}
		var next = $(".pagination .selected").next().attr('href');
		if(next != null){
			$(".arrow-right").attr('href', next);
			$(".arrow-right").css("opacity", 1);
		}else{
			$(".arrow-right").css("opacity", 0);
		}
	}

	function prevSlide(){
		setSlide(this);
		return false;
	}

	function nextSlide(){
    	$(".pagination .selected").removeClass("selected").parent().next().find("a").addClass("selected");

		setSlide(this);
		return false;
	}
});
