<template>
    <div class="map">
        <div v-if="activeName == 'first'">
            <adminMange></adminMange>
        </div>
    </div>
</template>

<script>
import adminMange from "../../components/mapmanage/adminManage.vue"
export default {
    name: 'homeIndex',
    components: {
        adminMange
    },
    data() {
        return {
            activeName: 'first'
        }
    },
    methods: {
        handleClick (tab, event) {
            console.log(tab, event)
        }
    },
    created() {
    }
}
</script>

<style lang="scss" scoped>
.map {
    padding: 20px;
}
</style>