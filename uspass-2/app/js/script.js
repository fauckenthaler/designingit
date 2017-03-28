$(document).ready(function () {
  $('.menu-toggler').click(function () {
    $('.nav-header').slideToggle(300);
  });
  
  $(window).resize(function () {
    if ($(window).width() > 992) {
      $('.nav-header, .status_form').removeAttr('style');
    }
  });
  
  $('.status_btn').on('click', function () {
    $('.status_form').fadeToggle(300);
  });
});