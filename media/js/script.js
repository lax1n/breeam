
$(function(){
	
	var leftNavArrow, rightNavArrow;
	
	var init = function(){
		setStartup();
		setHTMLObjects();
		setEvents();
		
		function setStartup(){
			$(document).ready(function() {
               $("body").fadeTo(800, 1); 
            });
			
			$(document).unload(function() {
                $("body").fadeTo(500, 0)
            });
		}
		
		function setHTMLObjects(){
			leftNavarrow = $(".arrow-left");
			rightNavArrow = $(".arrow-right");
		};
		
		function setEvents(){
			
		};
		
	}();
	
});