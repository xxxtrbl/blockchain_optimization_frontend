<template>
    <table-transaction :get-all="false"/>
</template>

<script>
import TableTransaction from '../components/TableTransaction.vue'
export default{
  components: { TableTransaction },
    name:"TransactionsPage",
    data(){
        return{

        }
    }
}
</script>

<style scoped>

</style>