<template>
    <div class="form-card" style="margin-top: 30vh;">
        <form @submit.prevent="submitForm">
            <div>
                <label class="mb-0" for="username">Nome:</label>
                <input class="mb-0" type="text" placeholder="John Doe" id="username" v-model="form.username.value" @blur="validateField('username')" />
                <div class="text-end">
                    <span class="error" v-if="errors.username && !isUsernameValid">{{ errors.username }}</span>
                </div>
                
                <label class="mt-2 mb-0" for="email">Email:</label>
                <input class="mb-0" type="email" placeholder="john@doe.com" id="email" v-model="form.email.value" @blur="validateField('email')" />
                <div class="text-end">
                    <span class="error" v-if="errors.email && !isEmailValid">{{ errors.email }}</span>
                </div>
                
                <label class="mt-2 mb-0" for="password">Senha:</label>
                <input class="mb-0" type="password" placeholder="********" id="password" v-model="form.password.value" @blur="validateField('password')" />
                <div class="text-end">
                    <span class="error" v-if="errors.password && !isPasswordValid">{{ errors.password }}</span>
                </div>
            </div>

            <div class="text-center mt-2">
                <span v-if="errors.register" class="error">{{ errors.register }}</span>
              </div>

            <div class="text-end mt-2">
                <v-btn class="bg-red mr-1" @click="cancel()">Cancelar</v-btn>
                <v-btn :loading="loading" class="bg-blue" type="submit">Cadastrar</v-btn>
            </div>
            
        </form>
    </div>
</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { ref, computed } from 'vue';
    import { axiosInstance } from '../services/api'
    import { onMounted } from 'vue';

    const router = useRouter();
    const loading = ref(false);

    async function signIn() {
        loading.value = true;
        try {
            const api = await axiosInstance.post('auth/register', {
                username: form.username.value,
                email: form.email.value,
                password: form.password.value,
            });
            
            loading.value = false;
            if(api.data.error) {
                errors.value.register = "Ocorreu um erro ao se registrar!";
                return;
            }

            localStorage.setItem('access_token', api.data.access_token);
            
            await router.push({ name: "Home" });
        } catch (error) {
            console.log(error.response.data);
        }
        loading.value = false;
    }

    const form = {
        username: ref(''),
        email: ref(''),
        password: ref(''),
    };

    const errors = ref({});

    const isUsernameValid = computed(() => form.username.value.trim() !== '');
    const isPasswordValid = computed(() => form.password.value.trim() !== '');
    const isEmailValid = computed(() => form.email.value.includes('@'));

    const validateField = (field) => {
        errors.value[field] = '';
        if (field === 'password' && !isPasswordValid.value) {
            errors.value.password = 'A senha não pode ser vazia.';
        }
        if (field === 'email' && !isEmailValid.value) {
            errors.value.email = 'Email inválido.';
        }
        if (field === 'username' && !isUsernameValid.value) {
            errors.value.username = 'Nome de usuário não pode ser vazio.';
        }
    };

    const submitForm = () => {
        errors.value = {};
        validateField('username');
        validateField('email');
        validateField('password');
        
        if (errors.value.email === "" && errors.value.password === "" && errors.value.username === "") {
            console.log('Form submitted successfully!', form);
            signIn();
        } else {
            console.log('Form has validation errors. Please correct them.', errors);
        }
    };

    async function cancel() {
        await router.push({ name: "Login" });
    }

    onMounted(async () => {
        localStorage.removeItem("access_token");
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