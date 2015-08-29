$(function(){

    var template;
	
	var init = function(){
		setHTMLObjects();
		setStartUp();
		setEvents();
		
		function setHTMLObjects(){
            template = $('select#id_template');
		};
		
		function setStartUp(){
		};
		
		function setEvents(){
            template.on('change', function(){
               //alert($("option:selected", this).text());
            });
		};
	}();
});
