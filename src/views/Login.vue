<template>
<section class="wow animate__fadeIn">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-xl-5 col-md-6 lg-padding-30px-lr md-padding-15px-lr sm-margin-40px-bottom">
                <h6 class="alt-font font-weight-500 text-extra-dark-gray">Login</h6>
                <mcv-validation-errors v-if="validationErrors" :validation-errors="validationErrors"></mcv-validation-errors>
                <form class="bg-light-gray padding-4-rem-all lg-margin-35px-top md-padding-2-half-rem-all" @submit.prevent="onSubmit">
                    <label class="margin-15px-bottom">Username or email address <span class="required-error text-radical-red">*</span></label>
                    <input class="small-input bg-white margin-20px-bottom required" type="text" name="text" placeholder="Enter your email" v-model="email">
                    <label class="margin-15px-bottom">Password <span class="required-error text-radical-red">*</span></label>
                    <input class="small-input bg-white margin-20px-bottom required" type="password" name="password" placeholder="Enter your password" v-model="password">
                    <label class="margin-25px-bottom">
                        <input class="d-inline-block align-middle w-auto mb-0 margin-5px-right" type="checkbox" name="account">
                        <span class="d-inline-block align-middle">Remember me</span> 
                    </label>
                    <button class="btn btn-medium btn-fancy btn-dark-gray w-100 submit" type="submit" :disabled="isSubmitting">Login</button>
                    <p class="text-end margin-20px-top mb-0"><a href="#" class="btn btn-link  btn-medium text-extra-dark-gray">Lost your password?</a></p>
                </form>
            </div>
            <!-- <div class="col-12 col-xl-5 offset-xl-1 col-md-6 lg-padding-30px-lr md-padding-15px-lr">
                <h6 class="alt-font font-weight-500 text-extra-dark-gray">Register</h6>
                <form class="border-all border-color-medium-gray padding-4-rem-all lg-margin-35px-top md-padding-2-half-rem-all">
                    <label class="margin-15px-bottom">Username <span class="required-error text-radical-red">*</span></label>
                    <input class="small-input bg-white margin-20px-bottom required" type="text" name="text" placeholder="Enter your username">
                    <label class="margin-15px-bottom">Email address <span class="required-error text-radical-red">*</span></label>
                    <input class="small-input bg-white margin-20px-bottom required" type="email" name="email" placeholder="Enter your email">
                    <label class="margin-15px-bottom">Password <span class="required-error text-radical-red">*</span></label>
                    <input class="small-input bg-white margin-20px-bottom required" type="password" name="password" placeholder="Enter your password">
                    <p class="text-small">Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our <a href="#" class="text-decoration-underline">privacy policy</a>.</p>
                    <button class="btn btn-medium btn-fancy btn-dark-gray w-100 submit" type="submit">Register</button>
                </form>
            </div> -->
        </div>
    </div>
</section>
</template>

<script>
import { mapState } from 'vuex';
import McvValidationErrors from '@/components/ValidationErrors.vue';
import { actionTypes } from '@/store/modules/auth';

export default {
    name: 'McvLogin',
    components: {
        McvValidationErrors
    },
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapState({
            isSubmitting: state => state.auth.isSubmitting,
            validationErrors: state => state.auth.validationErrors
        })
    },
    methods: {
        onSubmit() {
            this.$store.dispatch(actionTypes.login, {
                email: this.email,
                password: this.password
            })
            .then(() => {
                this.$router.push({name: 'home'})
            })
        }
    }
}
</script>