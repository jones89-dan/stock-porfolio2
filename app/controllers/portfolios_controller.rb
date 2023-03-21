class PortfoliosController < ApplicationController
  def add
      token = cookies.signed[:stock_session_token]
      session = Session.find_by(token: token)
      user = session.user
      @symbol = user.portfolio.new(portfolio_params)

      if @symbol.save
        render json: {
          success: true
        }
     else
       render json: {
         success: false
       }
      end
    end

private
  def portfolio_params
       params.require(:portfolio).permit(:symbol)
  end

end
