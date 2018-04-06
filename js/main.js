Site = {}

$(document).ready( function(){
  $(window).on("load", Site.removeBlocker)
})

Site.removeBlocker = function(){
  if ($('#projects_blocker').hasClass('hidden')){
    return;
  }
  $('#projects_blocker').fadeToggle();
  $('#projects_blocker').addClass('hidden');

}
