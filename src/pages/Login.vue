<template>
  <div class="form-card">
    <form @submit.prevent="submitForm">
      <div>
      <label for="email">Email:</label>
        <span class="error" v-if="errors.email && !isEmailValid">{{ errors.email }}</span>
        <input type="email" id="email" v-model="form.email.value" @blur="validateField('email')" />

        <label for="password">Senha:</label>
        <span class="error" v-if="errors.password && !isPasswordValid">{{ errors.password }}</span>
        <input type="password" id="password" v-model="form.password.value" @blur="validateField('password')" />
      </div>

      <v-btn type="submit">Submit</v-btn>
      <h6>Ainda não tem conta? <a @click="register">Registre-se aqui!</a></h6>
      
    </form>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, computed } from 'vue';
import { axiosInstance } from '../services/api'
import { onMounted } from 'vue';

const router = useRouter();

async function signIn() {
  try {
    const api = await axiosInstance.post('auth/login', {
      email: form.email.value,
      password: form.password.value
    });
  
    localStorage.setItem("access_token", api.data.access_token);
    localStorage.setItem("username", api.data.username);
    router.push({ name: "Home" });
  } catch (error) {
    console.log(error.response.data);
  }
}

function register() {
  router.push({ name: "Register" });
}

const form = {
  email: ref(''),
  password: ref(''),
};

const errors = ref({});

const isPasswordValid = computed(() => form.password.value.trim() !== '');
const isEmailValid = computed(() => form.email.value.includes('@'));

const validateField = (field) => {
  errors.value[field] = '';
  if (field === 'password' && !isPasswordValid.value) {
    errors.value.password = 'Password is required.';
  }
  if (field === 'email' && !isEmailValid.value) {
    errors.value.email = 'Invalid email address.';
  }
};

const submitForm = () => {
  errors.value = {};
  validateField('password');
  validateField('email');
  console.log(errors.value.password);
  if (errors.value.email === "" && errors.value.password === "") {
    console.log('Form submitted successfully!', form);
    signIn();
  } else {
    console.log('Form has validation errors. Please correct them.', errors);
  }
};

onMounted(async () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("username");

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