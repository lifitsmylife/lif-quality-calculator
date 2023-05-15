<template>
    <v-virtual-scroll class="mt-2 mb-2" :items="filteredItems" itemHeight="64" height="calc(100vh - 64px)">
        <template v-slot:default="{ item, index }">
            <v-list-item :key="item.id" @click="onOpenNewTab(item)">
                <img class="home-list-img" :alt="item.name" v-lazy="item.imagePath" />

                <v-list-item-content>
                    <v-list-item-title>
                        {{ item.name }}
                    </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                    <v-btn color="orange" text> Open </v-btn>
                </v-list-item-action>
            </v-list-item>

            <v-divider v-if="index < filteredItems.length - 1" :key="index"></v-divider>
        </template>
    </v-virtual-scroll>
</template>
<script lang="ts">
// Other
import Vue from 'vue';
import Component from 'vue-class-component';
import { Watch } from 'vue-property-decorator';
import IXmlRecipe from '@/core/Values/IXmlRecipe';
import TabManager from '@/core/TabManager';
import RecipeCollector from '@/core/RecipeCollector';
import Application from '@/core/Application';

@Component
export default class HomeViewList extends Vue {
    items: IXmlRecipe[] = Application.xmlDataPack.xmlRecipes;

    searchString = '';

    get filteredItems() {
        if (!this.searchString) {
            return this.items;
        }

        return this.items.filter((xmlRecipe) => xmlRecipe.name?.toUpperCase().indexOf(this.searchString) !== -1);
    }

    onOpenNewTab(xmlRecipe: IXmlRecipe) {
        TabManager.add({
            recipe: RecipeCollector.collect(xmlRecipe),
        });
    }

    @Watch('$route.query.search')
    onSearchStringChanged(searchString: string) {
        this.searchString = searchString?.toUpperCase() ?? '';
    }

    created() {
        this.onSearchStringChanged(this.$route.query.search as string);
    }
}
</script>
<style lang="scss">
.home-list-img {
    width: 60px;
    height: 60px;
    object-fit: contain;
}
</style>
