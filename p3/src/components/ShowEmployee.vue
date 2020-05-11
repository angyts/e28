<template>
    <span class='staff'>
        <img :id='"staff_"+ staff.slug' class='rounded-circle img-fluid' :src='imageSrc'/>
        <b-tooltip :target='"staff_"+ staff.slug' triggers="hover">
            I'm <b>{{ staff.name }}</b> and I'm <b v-if="!staff.manager ">not</b> a manager.
        </b-tooltip>
    </span>
</template>

<script>
    export default {
        name: "ShowEmployee",
        props: ['staff'],
        computed: {
            imageSrc: function () {
                try {
                    return require('@/assets/img/employees/' +
                        this.staff.slug +
                        '.jpg');
                } catch (e) {
                    return require('@/assets/img/employees/cat.jpg');
                }
            }
        }
    }
</script>

<style scoped>

</style>