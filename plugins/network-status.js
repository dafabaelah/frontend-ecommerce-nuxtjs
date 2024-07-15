export default ({ store, app }) => {
    if (process.client) {
        window.addEventListener('online', () => {
            store.commit('SET_ONLINE_STATUS', true)
                app.$swal.fire({
                    icon: 'success',
                    title: 'Koneksi Diterima',
                    text: 'Anda telah terhubung kembali ke internet.',
                    timer: 3000,
                    showConfirmButton: false
                })
        })
        window.addEventListener('offline', () => {
            store.commit('SET_ONLINE_STATUS', false)
                app.$swal.fire({
                    icon: 'error',
                    title: 'Koneksi Terputus',
                    text: 'Anda sedang offline. Beberapa fitur mungkin tidak tersedia.',
                    timer: 3000,
                    showConfirmButton: false
                })
        })
    }
}