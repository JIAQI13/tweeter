/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json


const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    $('.tweet-section').prepend(createTweetElement(tweet));
  }
};

//https://timeago.org/ sample code
const locale = function(number, index, totalSec) {
  return [
    ['just now', 'right now'],
    ['%s seconds ago', 'in %s seconds'],
    ['1 minute ago', 'in 1 minute'],
    ['%s minutes ago', 'in %s minutes'],
    ['1 hour ago', 'in 1 hour'],
    ['%s hours ago', 'in %s hours'],
    ['1 day ago', 'in 1 day'],
    ['%s days ago', 'in %s days'],
    ['1 week ago', 'in 1 week'],
    ['%s weeks ago', 'in %s weeks'],
    ['1 month ago', 'in 1 month'],
    ['%s months ago', 'in %s months'],
    ['1 year ago', 'in 1 year'],
    ['%s years ago', 'in %s years']
  ][index];
};

//preventing xss attack with esacaping
const escape = function(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function(tweet) {
  const $tweet =
    `
  <section class='tweetss-section' style='margin-top:2em;'>
  <div style='width:90%;' class='tweet-header'>
    <div>
      <img class='resize' src=${escape(tweet.user.avatars)} >
      <label>${escape(tweet.user.name)}</label>
    </div>
    <label class='username'>${escape(tweet.user.handle)}</label>
  </div>
  <div>
    <p id='tweet-content'>${escape(tweet.content.text)}</p>
  </div>
  <div id='tweet-button'>
    <label class='time-ago'>${timeago.format(tweet.created_at)}</label>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </div>
  </div>
</section>

  `;
  return $tweet;
};

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
    .then((tweets) => {
      renderTweets(tweets);
      $('#tweet-form').reset();
    });
};


$(function() {
  $("tweet-text").html = "";
  $("section.tweet-section").empty();
  loadTweets();
  $('#tweet-form').on('submit', function(event) {
    event.preventDefault();
    if ($('textarea').val().length > 140) {
      $('.tooLong').show();
      return false;
    }
    if ($('textarea').val().length === 0) {
      $('.tooShort').slideDown();
      return false;
    }
    $.ajax('/tweets', {
      method: 'POST',
      data: $(this).serialize()
    })
      .then(() => {
        $("section.tweet-section").empty();
        loadTweets();
        $('textarea.tweet-text').val('');
        $('output.counter').val('140');
      });
  });
});

