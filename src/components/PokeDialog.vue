<template>

  
  <dialog ref="dialog" class="modal">
    <div class="dialog-content">
      <strong><h1 class="text-center font-semibold capitalize">{{ selectedPoke?.name }}</h1></strong>
      <div v-if="selectedPoke">
        <img :src="selectedPoke.sprites.front_default" :alt="`Imagem do ${selectedPoke.name}`" class="modal-image">
        <ul class="details-list">
          <li><strong>ID:</strong> {{ selectedPoke.id }}</li>
          <li><strong>Nome:</strong> <span class="capitalize">{{ selectedPoke.name }}</span></li>
          <li><strong>Altura:</strong> {{ selectedPoke.height }}</li>
          <li><strong>Peso:</strong> {{ selectedPoke.weight }}</li>
          <li class="abilities">
            <strong>Habilidades</strong>
            <ul>
              <li v-for="ability in selectedPoke.abilities" :key="ability.ability.name" class="capitalize">
                {{ ability.ability.name }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <button @click="closeModal" class="close-button">Close</button>
    </div>
  </dialog>
</template>

<script>
import { ref, watch } from 'vue';

export default {
  props: {
    selectedPoke: {
      type: Object,
      required: true
    }
  },
  setup(props, { expose }) {
    const dialog = ref(null);

    function closeModal() {
      if (dialog.value) {
        dialog.value.close();
      }
    }

    function openModal() {
      if (dialog.value) {
        dialog.value.showModal();
      }
    }

    expose({ openModal, closeModal });

    watch(() => props.selectedPoke, (newVal) => {
      if (newVal) {
        openModal();
      }
    });

    return {
      dialog,
      closeModal
    };
  }
};
</script>

<style scoped>
.modal {
  border-radius: 1rem;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25rem;
  padding: 1rem;
  background: white;
  border-radius: 0.5rem;
}

.modal-image {
  width: 100%;
}

.details-list {
  text-align: left;
  margin-top: 1rem;
}

.abilities {
  margin-top: 1rem;
  padding-top: 0.5rem;
}

.close-button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  border: 1px solid gray;
  border-radius: 9999px;
  font-weight: 600;
  transition: all 0.2s;
}

.close-button:hover {
  background-color: black;
  color: white;
}
</style>
