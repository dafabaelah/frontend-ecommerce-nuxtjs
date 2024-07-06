//state
// state adalah tempat menyimpan data yang akan digunakan oleh komponen-komponen pada halaman tersebut.
export const state = () => ({

    //products
    // untuk menyimpan array data produk
    products: [],

    //page
    // untuk menyimpan data halaman berapa yang sedang ditampilkan
    page: 1,

    // product
    product: {}

})

//mutations
// mutations adalah tempat untuk mengubah data pada state.
export const mutations = {

    //mutation "SET_PRODUCTS_DATA"
    // untuk mengubah data state "products"
    SET_PRODUCTS_DATA(state, payload) {

        //set value state "products"
        // dengan data yang diterima dari payload
        state.products = payload
    },

    //mutation "SET_PAGE"
    // untuk mengubah data state "page"
    SET_PAGE(state, payload) {

        //set value state "page"
        // dengan data yang diterima dari payload
        state.page = payload
    },

    //mutation "SET_PRODUCT_DATA"
    SET_PRODUCT_DATA(state, payload) {

        //set value state "product"
        state.product = payload
    },

}

//actions
// actions adalah tempat untuk melakukan request ke server untuk mengambil data.
export const actions = {

    //get products data
    // untuk mengambil data produk dari server
    getProductsData({ commit, state }, payload) {

        //search
        // jika payload tidak ada, maka search = ''
        let search = payload ? payload : ''

        //set promise
        // untuk mengembalikan nilai promise
        return new Promise((resolve, reject) => {

            //fetching Rest API "/api/admin/products" with method "GET"
            // dan mengirimkan parameter "q" dan "page"
            this.$axios.get(`/api/admin/products?q=${search}&page=${state.page}`)
            
            //success
            // jika berhasil
            .then((response) => {

                //commit ti mutation "SET_PRODUCTS_DATA"
                // untuk mengubah data state "products"
                commit('SET_PRODUCTS_DATA', response.data.data)

                //resolve promise
                // mengembalikan nilai true
                resolve()
            })

        })

    },

    //store product
    // untuk menyimpan data produk ke server
    storeProduct({ dispatch, commit }, payload) {

        //set promise
        // untuk mengembalikan nilai promise
        return new Promise((resolve, reject) => {

            //store to Rest API "/api/admin/products" with method "POST"
            // mengirimkan data produk yang akan disimpan dari payload yang diterima
            this.$axios.post('/api/admin/products', payload)

            //success
            // jika berhasil
            .then(() => {

                //dispatch action "getProductsData"
                // untuk mengambil data produk dari server
                dispatch('getProductsData')

                //resolve promise
                // mengembalikan nilai true
                resolve()

            })

            //error
            // jika gagal, reject error
            .catch(error => {
                reject(error)
            })

        })
    },

    //get detail product
    getDetailProduct({ commit }, payload) {

        //set promise
        return new Promise((resolve, reject) => {

            //get to Rest API "/api/admin/products/:id" with method "GET"
            this.$axios.get(`/api/admin/products/${payload}`)

            //success
            .then(response => {

                //commit to mutation "SET_PRODUCT_DATA"
                commit('SET_PRODUCT_DATA', response.data.data)

                //resolve promise
                resolve()

            })

        })

    },

    //update product
    updateProduct({ dispatch, commit }, { productId, payload }) {

        //set promise
        return new Promise((resolve, reject) => {

            //store to Rest API "/api/admin/products/:id" with method "POST"
            this.$axios.post(`/api/admin/products/${productId}`, payload)

            //success
            .then(() => {

                //dispatch action "getProductsData"
                dispatch('getProductsData')

                //resolve promise
                resolve()

            })

            //error
            .catch(error => {
                reject(error)
            })

        })
    },

    //destroy products
    destroyProduct({ dispatch, commit }, payload) {

        //set promise
        return new Promise((resolve, reject) => {
        
            //delete to Rest API "/api/admin/products/:id" with method "DELETE"
            this.$axios.delete(`/api/admin/products/${payload}`)

            //success
            .then(() => {

                //dispatch action "getProductsData"
                dispatch('getProductsData')

                //resolve promise
                resolve()

            })

        })

    }

}