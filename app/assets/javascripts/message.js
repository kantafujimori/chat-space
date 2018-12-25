$(function() {

  function buildHTML(message){
    var image = message.image ? `<img src="${message.image}"> ` : ""
    var html = `<ul class="messages">
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
      $('.bottom-content__text').val('')
      $('.hidden').val('')
      $('.right-content__message').animate({scrollTop: $('.right-content__message')[0].scrollHeight}, 'fast')
    })
    .fail(function() {
      alert('error')
    })
    .always(function(message) {
      $('.bottom-content__send').prop('disabled', false);
    })
  });
});
