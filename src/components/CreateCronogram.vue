<template>
    <v-dialog v-model="dialog" @click:outside="fecharModal()" width="350">
      <v-card class="pa-6" rounded="xl">
        <slot />
        <v-card-actions class="d-flex justify-end">
            <v-btn class="bg-red" text @click="fecharModal()">Cancelar</v-btn>
            <v-btn class="bg-green" :loading="loading" text @click="$emit('salvar')">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
  
<script setup>
  //vue
  import { defineProps, ref, watch, defineEmits} from 'vue';
  
  //propriedades
  const props = defineProps({
    dialogState: {
      type: Boolean,
      default: false
    },
    loadingState: {
      type: Boolean,
      default: false
    }
  });
  
  //variaveis reativas
  const dialog = ref(false);
  const loading = ref(false);
  
  //variaveis
  const emit = defineEmits(["change"]);
  
  watch(() => props.dialogState, (newValue) => {
    dialog.value = newValue;
  });

  watch(() => props.loadingState, (newValue) => {
    loading.value = newValue;
  });
  
  const fecharModal = () => {
    emitChange(false);
  };
  
  const emitChange = (value) => {
    emit('change', value);
  };

  const onSalvar = () => {
    loading.value = true;

    this.$emit('salvar');

    loading.value = false;
  }
</script>