<template>
  <div>
    <form class="flex items-center max-w-sm mx-auto" @submit.prevent="procurar">   
      <label for="simple-search" class="sr-only">Search</label>
      <div class="relative w-full">
        <input type="text" id="simple-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="1" minlength="1" placeholder="Procure o seu pokemon.." required />
      </div>
      <button type="submit" class="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        <span class="sr-only">Procurar</span>
      </button>
    </form>
    <PokeDialog ref="pokeDialog" :selectedPoke="selectedPoke" />
  </div>
</template>

<script>
import PokeDialog from './PokeDialog.vue';
import { ref } from 'vue';

export default {
  components: {
    PokeDialog
  },
  setup() {
    const selectedPoke = ref(null);

    function procurar() { 
      let searchInput = document.querySelector('#simple-search').value.trim();
            
      if (searchInput) { 
          if (!isNaN(searchInput)) {
              // Se for um número, pesquise pelo ID do Pokémon
              fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput}`)
                  .then(response => response.json())
                  .then(data => {
                      console.log(data.order);
                      console.log(data.name);
                      selectedPoke.value = data;
                  })
                  .catch(err => {
                      console.error('Ocorreu um erro: ', err)
                      alert('Este pokemon não existe!')
                  });
          } else {
              // Se for uma string, pesquise pelo nome do Pokémon
              fetch(`https://pokeapi.co/api/v2/pokemon/${searchInput.toLowerCase()}`)
                  .then(response => response.json())
                  .then(data => {
                      console.log(data);
                      selectedPoke.value = data;
                  })
                  .catch(err => {
                      console.error('Ocorreu um erro: ', err)
                    alert('Este pokemon não existe!')
                  });
        }
      } else {
        console.error('Por favor, insira um nome ou ID de Pokémon válido.');
      }
    }

    return {
      selectedPoke,
      procurar
    };
  }
};
</script>

<style>
/* Adicione seu estilo aqui */
</style>
