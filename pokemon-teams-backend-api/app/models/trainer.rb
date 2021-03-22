class Trainer < ApplicationRecord
    has_many :pokemons

    def add_pokemon
        Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: self.id)
    end

    def do_me
        binding.pry
    end
end
