class UsersController < ApplicationController
  #Create user method
  def create
    @user = User.new(user_params)

    if @user.save
      render json: {
        user: {
          username: @user.username
        }
      }
    else
      render json: {
        success: false
      }
    end
  end

  private
    def user_params
      params.permit(:username, :email, :password)
    end
end
