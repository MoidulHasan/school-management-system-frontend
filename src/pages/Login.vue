<template>
    <div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="grid justify-content-center p-2 lg:p-0" style="min-width:80%">
            <div class="col-12 xl:col-6"
                style="border-radius:56px; padding:0.3rem; background: linear-gradient(180deg, var(--primary-color), rgba(33, 150, 243, 0) 30%);">
                <div class="h-full w-full m-0 py-7 px-4"
                    style="border-radius:53px; background: linear-gradient(180deg, var(--surface-50) 38.9%, var(--surface-0));">
                    <div class="text-center mb-5 p-0">
                        <img src="layout/images/Kushdi Khan Bari kindergarten.svg" alt="Kushdi Khan Bari kindergarten"
                            height="200" class="m-0">
                        <div class="text-900 text-3xl font-bold mb-3">Welcome, <span class="uppercase"
                                style="color:#410179"> Kushdi Khan Bari kindergarten!</span></div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div class="w-full md:w-10 mx-auto">
                        <form @submit.prevent="login">
                            <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                            <InputText id="email1" v-model="email" type="text" class="w-full mb-3" placeholder="Email"
                                style="padding:1rem;" />

                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Password</label>
                            <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true"
                                class="w-full mb-3" inputClass="w-full" inputStyle="padding:1rem"></Password>

                            <div class="flex align-items-center justify-content-between mb-5">
                                <!-- <div class="flex align-items-center">
                                    <Checkbox id="rememberme1" v-model="checked" :binary="true" class="mr-2"></Checkbox>
                                    <label for="rememberme1">Remember me</label>
                                </div> -->
                                <a class="font-medium no-underline ml-2 text-right cursor-pointer"
                                    style="color: var(--primary-color)">Forgot password?</a>
                            </div>
                            <Button type="submit" label="Sign In" class="w-full p-3 text-xl"></button>
                            <p class="text-red-600 pt-3"> {{ errorMessage }}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import UserService from '../service/UserService';
import { useUserStore } from '../stores/userStore';
import { useRouter } from 'vue-router'


const User = useUserStore();
const router = useRouter()
// const route = useRoute()


const email = ref('');
const password = ref('');
// const checked = ref(false);

const errorMessage = ref("");


const login = async () => {
    // call api for user login
    const response = await UserService.loginUser({ email, password });

    // get user data from response
    const user = response.status === "success" ? response.data.user : false;

    if (!user) {
        errorMessage.value = response.message;
    } else if (user) {
        errorMessage.value = "";
        User.user = user;
        router.push('/')

    }
}

</script>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>