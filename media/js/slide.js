
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
		};
		
		function setEvents(){
			$('div#timeline a').click(newPageClickEvent);
			$(".pagination a").click(function(e){
				e.preventDefault();
				// Remove the selected class from the currently selected indicator
				$(this).parent().parent().find(".selected").removeClass("selected");
				// Make the clicked indicator the selected one
				$(this).addClass("selected");
			});
		};
	}();
	
	function newPageClickEvent(){
	   var toLoad = '/pages/' + $(this).attr('href');
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
    	return false;
	};	
});
