<script setup>
const colorBg = '#757A69';
</script>

<template>
    <img src="../../../public/Background/Castle.jpg" alt="Background" class="w-full h-full absolute -z-50" />
    <img src="../../../public/Common/Logo.png" alt="logo" class="absolute top-5 right-5 px-[1.25vh] py-[.125vh]">
    <div class="absolute inset-0 flex items-center justify-center ">
        <form class="bg-slate-500 rounded-xl p-8 w-full max-w-md">
            <div class="mb-4">
                <label for="username" class="text-white block mb-2">Username</label>
                <input type="text" id="username" name="username"
                    class="w-full p-2 rounded rounded-full border border-gray-300 focus:outline-none focus:border-blue-500">
            </div>
            <div class="mb-4">
                <label for="password" class="text-white block mb-2">Password</label>
                <input type="password" id="password" name="password"
                    class="w-full p-2 rounded rounded-full border border-gray-300 focus:outline-none focus:border-blue-500">
            </div>
            <router-link to="ForgetPassword">
                <p class="pb-3 hover:text-blue-700 ">Forget password?</p>
            </router-link>
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded  focus:outline-none focus:shadow-outline flex ">Login
            </button>
            <div class="strike">
                <span>Or</span>
            </div>
            <div class="inline-block ">
                <p class="inline">Not register yet? </p>
                <router-link to="/">
                    <p class="inline pb-3 hover:text-blue-700 ">Sign Up</p>
                </router-link>
            </div>

        </form>
    </div>
</template>

<style scoped>
.strike {
    display: block;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
}

.strike>span {
    position: relative;
    display: inline-block;
}

.strike>span:before,
.strike>span:after {
    content: "";
    position: absolute;
    top: 50%;
    width: 9999px;
    height: 1px;
    background: white;
}

.strike>span:before {
    right: 100%;
    margin-right: 15px;
}

.strike>span:after {
    left: 100%;
    margin-left: 15px;
}
</style>