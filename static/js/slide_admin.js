$(function(){

    var template;
	var headers;
	var images;
	
	var init = function(){
		setHTMLObjects();
		setStartUp();
		setEvents();
		
		function setHTMLObjects(){
            template = $('select#id_template');
		};
		
		function setStartUp(){
			$('#slideheader_set-group a:contains("Add another Slide header")').toggle();
			$('#slideimage_set-group a:contains("Add another Slide image")').toggle();
			$(document).ready(function () {
				var values = template_values($("option:selected", this).text())
				headers = values.headers;
				images = values.images;
			});
		};
		
		function setEvents(){
            template.on('change', function(){
				var values = template_values($("option:selected", this).text())
				update_template_values(values.headers, values.images);
            });
		};
	}();

	function template_values(template){
		var nums = template.replace(/[^0-9]/g, '');
		var values = {};
		values['headers'] = parseInt(nums.charAt(0));
		values['images'] = parseInt(nums.charAt(1));
		return values;
	}

	function update_template_values(headers_new, images_new){
		if(headers < headers_new){
			add_headers(headers_new - headers);
		}else if(headers > headers_new){
			remove_headers(headers - headers_new);
		}
		if(images < images_new){
			add_images(images_new - images);
		}else if(images > images_new){
			remove_images(images - images_new);
		}
		headers = headers_new;
		images = images_new;
	}

	function add_headers(headers){
		var add_header = $('#slideheader_set-group a:contains("Add another Slide header")');
		for(var n = 0; n < headers; n++)
			add_header[0].click();
		$('#slideheader_set-group a:contains("Remove")').hide();
		$('#slideheader_set-group th:contains("Delete")').hide();
	}

	function add_images(images){
		var add_image = $('#slideimage_set-group a:contains("Add another Slide image")');
		for(var n = 0; n < images; n++)
			add_image[0].click();
		$('#slideimage_set-group a:contains("Remove")').hide();
		$('#slideimage_set-group th:contains("Delete")').hide();
	}
	
	function remove_headers(headers){
		var remove_header = $('#slideheader_set-group a:contains("Remove")');
		$(remove_header.get().reverse()).each(function (index) {
			if(headers == index){
				return false;
			}
			$(this)[0].click();
		});
	}

	function remove_images(images){
		var remove_image = $('#slideimage_set-group a:contains("Remove")');
		$(remove_image.get().reverse()).each(function (index) {
			if(images == index){
				return false;
			}
			$(this)[0].click();
		});
	}
});
