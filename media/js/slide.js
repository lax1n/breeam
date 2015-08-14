$(document).ready(function(){
    var first = $('div#timeline a:first-child').attr('href');
    $('#content').load('/pages/' + first);

   $('div#timeline a').click(function(){
      var page = $(this).attr('href');
       $('#content').load('/pages/' + page);
       return false;
   });
});