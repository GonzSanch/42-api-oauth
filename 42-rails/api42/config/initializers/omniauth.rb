Rails.application.config.middleware.use OmniAuth::Builder do
    provider :marvin, ENV["FT_ID"], ENV["FT_SECRET"]
  end