$().ready(function () {
  var getUrl = window.location;
  var url_parent = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
  var baseUrl = url_parent.substr(0,url_parent.lastIndexOf('/'));
  var nextPostUrl = document.getElementById('next-post').getAttribute("href");
  var nextPage = baseUrl + nextPostUrl;


  $(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() === $(document).height()) {
      console.log(nextPage);

      $.get((nextPage),
        function (content) {
            $('.content').append($(content).children(".post").fadeIn());
        });
    }
  });
});
