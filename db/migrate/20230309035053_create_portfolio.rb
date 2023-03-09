class CreatePortfolio < ActiveRecord::Migration[6.1]
  def change
    create_table :portfolios do |t|
      t.string :symbol
      t.belongs_to :user, index: true, foreign_key: true
      t.timestamps
    end
  end
end
