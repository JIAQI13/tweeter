/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json


const renderTweets = function (tweets) {
  for (let tweet of tweets) {
    $('.tweet-section').prepend(createTweetElement(tweet));
  }
};

//preventing xss attack with esacaping
const escape = function (str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const createTweetElement = function (tweet) {
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
      //$('#tweet-form').reset();
      // console.log(tweets);
    });
};


const loadTweetsNew = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
    .then((tweets) => {
      renderTweets([tweets[tweets.length - 1]]);
    });
};


$(function () {
  $("tweet-text").html = "";
  $("section.tweet-section").empty();
  loadTweets();
  $('#tweet-form').on('submit', function (event) {
    event.preventDefault();
    if ($('textarea').val().length > 140) {
      $('.tooLong').slideDown();
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
        loadTweetsNew();
        $('textarea.tweet-text').val('');
        $('output.counter').val('140');
      });
  });
});

