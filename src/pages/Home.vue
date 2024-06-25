<template>
  <v-container class="">
    <v-row>
      <v-col class="">
        <h1>Olá, {{ username }}!</h1>
      </v-col>
      <v-col class="text-end justify-content-center">
          <v-btn class="bg-red" @click="logout()">Sair</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <div class="" style="display: grid; justify-items: center">
    <v-list style="min-width: 300px;">
      <v-list-item v-for="cronogram in cronograms" :key="cronogram.id">
        <v-card v-bind:class="{ 'bg-light-green-darken-4': cronogram.isActivated, 'bg-red': !cronogram.isActivated }">
          <div>
            <v-card-title><h2>{{ cronogram.name }}</h2></v-card-title>
            <div class="text-center">
              <v-btn icon @click="addStage(), setCronogramId(cronogram.id)">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
              
            </div>
          </div>
          <v-divider></v-divider>
          <v-list-item class="rounde" style="border: 2px solid ;" v-bind:class="{ 'bg-green-lighten-1': cronogram.isActivated, 'bg-red-lighten-2': !cronogram.isActivated }" v-for="stage in cronogram.stages" :key="cronogram.stages.id" >
            <h4 class="text-white">{{ stage.name }}</h4>
            <div class="text-center">
              <v-btn v-if="!stage.isCompleted" icon @click="completeStage(stage.id, true)">
                <v-icon>mdi-check</v-icon>
              </v-btn>
              <v-btn v-if="stage.isCompleted" icon @click="completeStage(stage.id, false)">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-list-item>
        </v-card>
      </v-list-item>
    </v-list>
  </div> 

  <div style="display: grid; justify-items: center">
    <v-list-item-action class="text-center">
      <v-btn class="mr-5" icon @click="addCronogram()">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-list-item-action>
  </div>

  <ModalCronogram :dialogState="dialogCronogram" :loadingState="loading" @change="dialogCronogram = $event" @salvar="createCronogram()">
    <v-text-field label="Nome do cronograma" v-model="newCronogram.name" />
  </ModalCronogram>

  <ModalCronogram :dialogState="dialogStage" :loadingState="loading" @change="dialogStage = $event" @salvar="createStage()">
    <v-text-field label="Nome da etapa" v-model="newStage.name" />
  </ModalCronogram>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import { axiosInstance } from '../services/api'
    import ModalCronogram from '../components/CreateCronogram.vue'
    
    const router = useRouter();
    const cronograms = ref([]);
    const dialogCronogram = ref(false);
    const cronogramId = ref(0);
    const dialogStage = ref(false);
    const newCronogram = ref({
      name: ""
    });
    const newStage = ref({
      name: "",
      cronogram: ""
    });
    const username = ref();
    const loading = ref(false);

    async function getUserData() {
      try {
        const api = await axiosInstance.get("users");

        username.value = api.data.username;
      } catch (error) {
        logout();

      }
    }

    async function getAllCronograms() {
      try {
        const api = await axiosInstance.get("cronogram");

        cronograms.value = api.data;
      } catch (error) {
        logout();

      }
    }

    async function addCronogram() {
      newCronogram.value = {};
      dialogCronogram.value = true;
    }

    async function createCronogram(){
      loading.value = true;
      try {
        const api = await axiosInstance.post("cronogram", {
          name: newCronogram.value.name
        });

        await getAllCronograms();
      } catch (error) {
        console.log(error);
      }
      
      loading.value = false;
      dialogCronogram.value = false;
    }

    async function addStage() {
      newStage.value = {};
      dialogStage.value = true;
    }

    async function completeStage(stageId, isCompleted) {
      try {
        const api = await axiosInstance.put(`stage/completed/${stageId}`, {
          isCompleted,
        });

        await getAllCronograms();
      } catch (error) {
        console.log(error);
      }
    }

    function setCronogramId(cronogram_id) {
      cronogramId.value = cronogram_id;
    }

    async function createStage() {
      loading.value = true;
      try {
        const api = await axiosInstance.post("stage", {
          name: newStage.value.name,
          cronogram: cronogramId.value
        });
        
        cronogramId.value = 0;
        await getAllCronograms();
      } catch (error) {
        console.log(error);
      }
      
      loading.value = false;
      dialogStage.value = false;
    }
    
    async function logout() {
      localStorage.removeItem("access_token");
      await router.push({ name: "Login" });
    }
      
    onMounted(async () => {
      getUserData();
      getAllCronograms();
    });
</script>
