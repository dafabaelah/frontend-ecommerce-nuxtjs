//state
export const state = () => ({

    //invoices
    // diisi dengan array kosong
    invoices: [],

    //page
    // diisi dengan nilai 1 atau halaman pertama
    page: 1,

    // invoice
    invoice: {}

})

//mutations
export const mutations = {

    //mutation "SET_INVOICES_DATA"
    // digunakan untuk mengubah data state "invoices"
    SET_INVOICES_DATA(state, payload) {

        //set value state "invoices"
        state.invoices = payload
    },

    //mutation "SET_PAGE"
    // digunakan untuk mengubah data state "page" yang berasal dari payload
    SET_PAGE(state, payload) {

        //set value state "page"
        state.page = payload
    },

    // mutation "SET_INVOICE_DATA"
    // digunakan untuk mengubah data state "invoice"
    SET_INVOICE_DATA(state, payload) {

        state.invoice = payload
    }

}

//actions
export const actions = {

    //get invoices data
    getInvoicesData({ commit, state }, payload) {

        //search
        let search = payload ? payload : ''

        //set promise
        // digunakan untuk menghandle proses asyncronous
        return new Promise((resolve, reject) => {

            //fetching Rest API "/api/admin/invoices" with method "GET"
            this.$axios.get(`/api/admin/invoices?q=${search}&page=${state.page}`)
            
            //success
            .then((response) => {

                //commit ti mutation "SET_INVOICES_DATA"
                // untuk mengubah data state "invoices"
                commit('SET_INVOICES_DATA', response.data.data)

                //resolve promise
                resolve()
            })

        })

    },

    //get detail invoice
    getDetailInvoice({ commit }, payload) {

        //set promise
        return new Promise((resolve, reject) => {

            //get to Rest API "/api/admin/invoices/:id" with method "GET"
            this.$axios.get(`/api/admin/invoices/${payload}`)

            //success
            .then(response => {

                //commit to mutation "SET_INVOICE_DATA"
                commit('SET_INVOICE_DATA', response.data.data)

                //resolve promise
                resolve()

            })

        })

    },

}