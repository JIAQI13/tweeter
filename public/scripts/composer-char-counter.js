$(document).ready(function() {
    //initial word count
    let chars = $('textarea').val().length;
    $('.counter').html(chars + ' characters');

    $('.tweet-text').on('keydown', function () {

        // count when user input
        let chars = $('textarea').val().length;
        $('.counter').html(chars + ' characters');

        //color changing based on word count
        if ($('textarea').val().length > 140) {
            $(".counter").css("color", "red");
            chars = 140 - $('textarea').val().length;
            $('.counter').html(chars + ' characters');
        }else{
            $(".counter").css("color", "");
        }
    });
    /*
    $('.fas').mousemove(function () {
        $(".fas").css("color", "red");
    });
    $('.fas').mouseout(function () {
        $(".fas").css("color", "");
    });
    */

});