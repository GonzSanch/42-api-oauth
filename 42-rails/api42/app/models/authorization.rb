class Authorization < ApplicationRecord
    belongs_to :User
    validates :provider, :uid, :presence => true
end
