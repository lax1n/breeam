$(document).ready(function(){
	//$("#container").css("margin-top", $(window).height() * 0.1);
	//$("#headline").css("position", "relative");
	//$("#headline").css("position", "relative");
	//$("#headline").css("max-width", $(window).width() * 0.1);
	//$("#headline").css("left", $("#image").offset().left + $(window).width() * 0.1);
});

$(window).resize(function(){
	//$("#container").css("margin-top", $(window).height() * 0.1);
	$("#image").css("width", $(window).width() * 0.9);
	//$("#headline").css("left", $("#image").offset().left + $(window).width() * 0.1);
});