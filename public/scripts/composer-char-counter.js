$(document).ready(function () {
  $('.tooLong').slideUp();
  $('.tooShort').slideUp();
  $('.tweet-text').on('keyup', function () {
    // count when user input
    let chars = $('textarea').val().length;
    $('.counter').html(140 - chars);

    //color changing based on word count
    if ($('textarea').val().length > 140) {
      // $('.tooLong').slideDown();
      $(".counter").css("color", "red");
      chars = 140 - $('textarea').val().length;
      $('.counter').html(chars);
    } else {
      $('.tooLong').slideUp();
      $('.tooShort').slideUp();
      $(".counter").css("color", "");
    }
  });
});