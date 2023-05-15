<template>
    <v-app id="inspire">
        <v-app-bar app>
            <v-toolbar-title>Quality Calculator</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-text-field
                label="Search"
                hide-details="auto"
                v-model="searchString"
                @input="onSearchStringChanged"
            ></v-text-field>
        </v-app-bar>

        <v-main>
            <router-view name="default"></router-view>
        </v-main>
    </v-app>
</template>
<script lang="ts">
// Other
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class App extends Vue {
    searchString = '';

    onSearchStringChanged() {
        this.$router.replace({ query: { ...this.$router.currentRoute.query, search: this.searchString } });
    }

    created() {
        this.searchString = (this.$route.query.search as string) ?? this.searchString;
    }
}
</script>
<style lang="scss">
html,
body {
    overflow: hidden !important;
}
</style>
