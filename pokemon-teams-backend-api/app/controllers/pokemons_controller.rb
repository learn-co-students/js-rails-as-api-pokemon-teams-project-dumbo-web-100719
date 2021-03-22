class PokemonsController < ApplicationController
    def update
        pokemon = Pokemon.find_by_id(params[:id])
    end
end
