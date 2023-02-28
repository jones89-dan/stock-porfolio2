class SessionsController < ApplicationController

  # Create session
  def create
    @user = User.find_by(username: params[:user][:username])

      if @user and BCrypt::Password.new(@user.password) == params[:user][:password]
        session = @user.sessions.create
        cookies.permanent.signed[:stock_session_token] = {
          value: session.token,
          httponly: true
        }

         render json: {
           success: true
         }
      else
        render json: {
          success: false
        }
      end
  end

  # Check authentication
  def authenticated
    token = cookies.permanent.signed[:stock_session_token]
    session = Session.find_by(token: token)
    if session
      user = session.user
      render json: {
        authenticated: true,
        username: user.username
      }
    else
      render json: {
        authenticated: false
      }
    end
  end

  # Destroy session
  def destroy
    token = cookies.permanent.signed[:stock_session_token]
    session = Session.find_by(token: token)
    if session and session.destroy
      render json: {
        success: true
      }
    end
  end

  private
    def user_params
      params.permit(:username, :password)
    end

end
