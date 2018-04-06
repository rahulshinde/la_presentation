Site = {}

$(document).ready( function(){
  // $(document).on('scroll', Site.toggleHeader);
  Site.modal_container = $('#modal_container');
  Site.video_modal_container = $('#video_modal_container');

  setTimeout(function(){
    Site.loadImages();
  }, 1000);

  $(window).on('resize', Site.loadImages);
  Site.filtering = false;
  $('.filter_show_all').on('click', Site.clearFilters);

  $('.filter_button').on('click', Site.setFilter);

  $('#information').on('click', Site.scrollToBottom);

  Site.modal_background = $('#modal_background');
  Site.modal_caption = $('.modal_caption');
  Site.modal_date = $('.modal_date');
  Site.modal_close = $('.modal_close');
  Site.modal_next = $('.modal_next');
  Site.modal_prev = $('.modal_prev');

  Site.modal_close.on('click', Site.closeModal);
  Site.modal_next.on('click', Site.modalNext);
  Site.modal_prev.on('click', Site.modalPrev);

  $(document).on('keyup', Site.keyCommand);
  
})

Site.keyCommand = function(e){
  if(Site.modal_container.hasClass('show')){
    if(e.keyCode === 27){
      Site.closeModal();
    }

    if(e.keyCode === 37){
      Site.modalPrev();
    }

    if(e.keyCode === 39){
      Site.modalNext();
    }

  }
}

// Site.toggleHeader = function(){
//   Site.scroll_position = $(document).scrollTop();

//   if (Site.scroll_position > 0 && !$('#about').hasClass('scroll')){
//     $('#about').addClass('scroll');
//     $('#tags').addClass('scroll');
//     $('nav').addClass('scroll');
//     $('#projects').addClass('scroll');
//   } else if (Site.scroll_position <= 0 && $('#about').hasClass('scroll')){
//     $('#about').removeClass('scroll');
//     $('#tags').removeClass('scroll');
//     $('#projects').removeClass('scroll');
//     $('nav').removeClass('scroll');
//   }
// }

Site.clearFilters = function(){
  $('.filter_button').removeClass('selected');
  $('.filter_show_all').addClass('selected');
  $('.open_modal').addClass('visible');
  Site.filtering = false;
  Site.loadImages();
}

Site.setFilter = function(){
  $('.filter_show_all').removeClass('selected');
  $('.filter_button').removeClass('selected');

  $(this).addClass('selected');
  $('.open_modal').removeClass('visible');
  var class_name = $(this).data('show');
  $('.' + class_name).addClass('visible');
  Site.filtering = true;
  Site.loadImages();


  // if (Site.filtering){
  //   var class_name = $(this).data('show');
  //   $(this).addClass('selected');
  //   $('.' + class_name).addClass('visible');
  //   Site.loadImages();
  // } else{
  //   $(this).addClass('selected');
  //   $('.open_modal').removeClass('visible');
  //   var class_name = $(this).data('show');
  //   $('.' + class_name).addClass('visible');
  //   Site.filtering = true;
  //   Site.loadImages();
  // }
}

Site.loadImages = function(){

  Site.window_width = $(window).width();
  if (Site.window_width <= 740){
    return;
  } else{
    $('.repeat').remove();
    Site.image_container= $("#original");
    Site.image_width = $('#original').outerWidth();
    Site.repeat = Site.image_width / Site.window_width;
    Site.repeat = Math.ceil(Site.repeat);

    for (var i = 1; i <= Site.repeat - 1; i++) {
      Site.new_line = "<div class='image_container repeat' style='transform: translateX(" + (i * 100 * -1) + "vw);'>" + Site.image_container.html() + "</div>"
      $('#projects').append(Site.new_line);

    };

    Site.setupModal();
  }

  Site.removeBlocker();

}

Site.setupModal = function(){
  Site.visible_images_src = []
  Site.visible_images_date = []
  Site.visible_images_caption = []
  $('#original .open_modal').each(function(){
    if ($(this).hasClass('visible')){
      var image = $(this);
      var src = image.data('src');
      var date = image.data('date');
      var caption = image.data('caption');
      Site.visible_images_src.push(src);
      Site.visible_images_date.push(date);
      Site.visible_images_caption.push(caption);
    }
  });

  $('.open_modal').on('click', Site.openModal);
}

Site.openModal = function(){
  var image = $(this);
  var src = image.data('src');

  Site.slideshow_index = Site.visible_images_src.indexOf(src);
  Site.slideshow_length = Site.visible_images_src.length;

  Site.modal_container.addClass('show');
  Site.modal_caption.empty();
  Site.modal_date.empty();

  console.log(Site.visible_images_src[Site.slideshow_index]);

  Site.modal_background.css('background-image', 'url(' + Site.visible_images_src[Site.slideshow_index] + ')');
  Site.modal_caption.append(Site.visible_images_caption[Site.slideshow_index]);
  Site.modal_date.append(Site.visible_images_date[Site.slideshow_index]);
}

Site.modalNext = function(){
  Site.slideshow_index = Site.slideshow_index + 1;
  if (Site.slideshow_index >= Site.slideshow_length){
    Site.slideshow_index = 0;
  }

  Site.modal_caption.empty();
  Site.modal_date.empty();

  Site.modal_background.css('background-image', 'url(' + Site.visible_images_src[Site.slideshow_index] + ')');
  Site.modal_caption.append(Site.visible_images_caption[Site.slideshow_index]);
  Site.modal_date.append(Site.visible_images_date[Site.slideshow_index]);
}

Site.modalPrev = function(){
  Site.slideshow_index = Site.slideshow_index - 1;
  if (Site.slideshow_index < 0){
    Site.slideshow_index = Site.slideshow_length - 1;
  }

  Site.modal_caption.empty();
  Site.modal_date.empty();

  Site.modal_background.css('background-image', 'url(' + Site.visible_images_src[Site.slideshow_index] + ')');
  Site.modal_caption.append(Site.visible_images_caption[Site.slideshow_index]);
  Site.modal_date.append(Site.visible_images_date[Site.slideshow_index]);
}

Site.getIndex = function(arr, k){
  for (var i = 0; i < arr.length; i++) {
    var index = arr[i].indexOf(k);
    if (index > -1) {
      return [i, index];
    }
  }
}

Site.closeModal = function(){
  Site.modal_container.removeClass('show');
  $('#site').removeClass('light_box');
}

Site.scrollToBottom = function(){
  console.log('hello');
  $("html, body").animate({ scrollTop: $(document).height() }, 1500);
}

Site.removeBlocker = function(){
  if ($('#projects_blocker').hasClass('hidden')){
    return;
  }
  $('#projects_blocker').fadeToggle();
  $('#projects_blocker').addClass('hidden');

}
