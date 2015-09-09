$(function(){

    var view = 0; //Use to keep up which timeline is currently active, can correspond with macro view
    var start = 0;
    var end = interval;

	var init = function(){
		setHTMLObjects();
		setStartUp();
		setEvents();

		function setHTMLObjects(){
		};

		function setStartUp(){
		};

		function setEvents(){
            $(document).on('click', "a#next_slide", function(e){
                e.preventDefault();
                alert($(this).attr('href'));
                if($(this).attr('href') == $("div#timeline a:last-child").attr('href')){
                    alert('lol');
                    //Initiate next timeline
                }
            });
		};
	}();
});
