$(document).ready(function() {
  $('.tooLong').hide();
  $('.tooShort').hide();
  $('.tweet-text').on('keyup', function() {
    // count when user input
    let chars = $('textarea').val().length;
    $('.counter').html(140 - chars);

    //color changing based on word count
    if ($('textarea').val().length > 140) {
      $('.tooLong').show();
      $(".counter").css("color", "red");
      chars = 140 - $('textarea').val().length;
      $('.counter').html(chars);
    } else {
      $('.tooLong').hide();
      $('.tooShort').hide();
      $(".counter").css("color", "");
    }
  });

    
    

    

});