json.array! @new_message do |message|
  json.text message.content
  json.image message.image.url
  json.time message.created_at
  json.user_name message.user.name
  json.id message.id
end
