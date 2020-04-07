<!-- src/components/ShowFeatured.vue -->
<template>
    <div id='featured'>
        <h2>Featured Products</h2>
        <ul class='cleanList'>
            <li v-for='product in featuredProducts' :key='product.id'>{{ product.name }}</li>
        </ul>
    </div>
</template>

<script>
    import {products} from "./../products";

    export default {
        name: "ShowFeatured",
        props: ['category'],
        data: function () {
            return {products: products}
        },
        computed: {
            // src/components/ShowFeatured.vue
            featuredProducts: function () {
                function isMatch(product) {
                    return product.categories.includes(this);
                }

                return this.products.filter(isMatch, this.category);
            }
        }
    }
</script>

<style scoped>

</style>