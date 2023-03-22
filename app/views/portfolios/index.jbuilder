json.symbols do
  json.array! @symbols do |symbol|
    json.symbol symbol.symbol
    json.username symbol.created_at
  end
end
