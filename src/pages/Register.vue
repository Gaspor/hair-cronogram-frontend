<template>
    <div class="form-card">
        <form @submit.prevent="submitForm">
            <div>
                <label for="username">Nome:</label>
                <span class="error" v-if="errors.username && !isUsernameValid">{{ errors.username }}</span>
                <input type="text" id="username" v-model="form.username.value" @blur="validateField('username')" />

                <label for="email">Email:</label>
                <span class="error" v-if="errors.email && !isEmailValid">{{ errors.email }}</span>
                <input type="email" id="email" v-model="form.email.value" @blur="validateField('email')" />

                <label for="password">Senha:</label>
                <span class="error" v-if="errors.password && !isPasswordValid">{{ errors.password }}</span>
                <input type="password" id="password" v-model="form.password.value" @blur="validateField('password')" />
            </div>

            <v-btn type="submit">Submit</v-btn>
            
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
            const api = await axiosInstance.post('auth/register', {
                username: form.username.value,
                email: form.email.value,
                password: form.password.value,
            });

            localStorage.setItem('access_token', api.data.access_token);
            
            await router.push({ name: "Home" });
        } catch (error) {
            console.log(error.response.data);
        }
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
            errors.value.password = 'Password is required.';
        }
        if (field === 'email' && !isEmailValid.value) {
            errors.value.email = 'Invalid email address.';
        }
        if (field === 'username' && !isUsernameValid.value) {
            errors.value.username = 'Username is required';
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