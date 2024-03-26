<template>
    <div class="form-card">
        <v-btn @click="sendEmail">
            Enviar código por email
        </v-btn>
    </div>
</template>
  
<script setup>
  import { useRouter } from 'vue-router';
  import { axiosInstance } from '../services/api'
  import { onMounted } from 'vue';
  
  const router = useRouter();

  async function sendEmail() {
    const api = await axiosInstance.post(`active/sendemail`);
  }

  onMounted(() => {
    sendEmail();
  });
</script>
  
  <style scoped>
  .form-card {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  label {
    display: block;
    margin-bottom: 8px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
  
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .error {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
  </style>