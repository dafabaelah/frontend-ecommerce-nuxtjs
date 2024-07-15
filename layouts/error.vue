<template>
    <div class="container-fluid mt-custom mt-mobile">
        <div class="fade-in">
            <div class="row">
                <div class="col-md-3 mt-2 mb-4 col-xl-4 web-custom">
                    <div class="text-center">
                        <div class="d-flex flex-column justify-content-center align-items-center">
                            <img src="/images/error.svg" class="p-2 rounded img-fluid" width="1000" />
                            <h1 v-if="error.statusCode === 404">404 - Page Not Found</h1>
                            <h1 v-else-if="error.statusCode">{{ error.statusCode }} - {{ error.message }}</h1>
                            <h1 v-else class="text-danger">Unexpected Error</h1>
                            <nuxt-link to="/">Go back to Home</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/web/header.vue'
    import Footer from '@/components/web/footer.vue'
    export default {
        components: {
            Header,
            Footer
        },

        props: {
            error: {
                type: Object,
                default: () => ({
                    statusCode: 500,
                    message: 'Internal Server Error'
                })
            }
        }

    }
</script>

<style>
    @media (min-width: 767px) {
            .web-custom {
            align-content: center !important;
            align-items: center !important;
            margin-left: 440px;
            display: flex;
            justify-content: center !important;
            height: 100vh; /* Pastikan elemen ini memiliki tinggi penuh dari viewport */
        }
    }
</style>