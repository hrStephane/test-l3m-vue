import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './style.css'
import App from './App.vue'
// import TransactionList from './views/transactions/TransactionList.vue'

const pinia = createPinia()

const app = createApp(App)

app.use(pinia)
app.use(router)

// app.component('TransactionList', TransactionList)

app.mount('#app')