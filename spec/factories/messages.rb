FactoryGirl.define do

  factory :message do
    content  Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/images/IMG_2257.JPG")
    user
    group
  end
end
