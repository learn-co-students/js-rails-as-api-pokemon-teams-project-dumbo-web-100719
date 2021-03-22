class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render :json => trainers.to_json(:include =>{
            :pokemons => {
                :only => [:nickname,:species,:id]
            }
        },
        :only => [:name,:id])
    end

    
    def show
        trainer = Trainer.find_by_id(params[:id])
    end
    
    def update
        trainer = Trainer.find_by_id(params[:id])
        if trainer.pokemons.count < 5 
            pokemon = trainer.add_pokemon
            render :json => pokemon
        end
    end
end
