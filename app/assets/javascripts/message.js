$(document).on('turbolinks:load', function() {

  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}"> ` : ""
    var html = `<ul class="messages" data-id="${message.id}">
                  <li class="message">
                  <div class="chat-body">
                    <p class="message__name">
                      ${message.user_name}
                    </p>
                    <p class="message__time">
                      ${message.time}
                    </p>
                  </div>
                  <div class="chat-body">
                    <p class="message_text">
                     ${message.text}
                    </p>
                    <p class="message_image">
                      ${image}
                    </p>
                  </div>
                  </li>
                </ul>`
    return html;
  }
  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      var html = buildHTML(message);
      $('.right-content__message').append(html)
      $('#new_message')[0].reset()
      $('.right-content__message').animate({scrollTop: $('.right-content__message')[0].scrollHeight}, 'fast')
    })
    .fail(function() {
      alert('error')
    })
    .always(function(message) {
      $('.bottom-content__send').prop('disabled', false);
    })
  });

  var interval = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var message_id = $('.messages:last').data('id');
      $.ajax({
        url: window.location.href,
        type: 'GET',
        data: { message_id: message_id },
        dataType: 'json'
      })
      .done(function(data) {
        var insertHTML = "";
        if (data.length !== 0) {
          data.forEach(function(message) {
            var insertHTML = buildHTML(message);
            $('.right-content__message').append(insertHTML);
          });
          $('.right-content__message').animate({scrollTop: $('.right-content__message')[0].scrollHeight}, 'fast');
        } else {
          ;
        }
      })
      .fail(function() {
        alert('自動更新に失敗しました')
      });
    } else {
      clearInterval(interval);
    }}, 5000 );
});
