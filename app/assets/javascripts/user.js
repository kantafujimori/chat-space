$(document).on('turbolinks:load', function() {
  var search_list = $("#user-search-result")
  var chat_members = $("#chat-group-users")

  function appendUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user.name }</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${ user.id }" data-user-name="${ user.name }">追加</a>
                </div>`
    search_list.append(html);
  }

  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ user }</p>
                </div>`
    search_list.append(html);
  }

  function appendMoreUser(user_id, user_name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    chat_members.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
        if (users.length !== 0) {
          users.forEach(function(user) {
            appendUser(user);
          });
        }
        else {
          appendNoUser("一致するユーザーはいません");
        }
    })
    .fail(function() {
      alert('ユーザーの検索に失敗しました');
    })
  });

  $(document).on('click', '.user-search-add', function(){
    var user_id = $(this).data('user-id');
    var user_name = $(this).data('user-name');
    appendMoreUser(user_id, user_name);
    $(this).parent().remove();
  })
  $(document).on('click', '.user-search-remove', function() {
    $(this).parent().remove();
  })
});
