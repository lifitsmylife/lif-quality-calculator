<template>
    <v-row>
        <v-col class="col-6 ps-0">
            <HomeViewList></HomeViewList>
        </v-col>

        <v-col class="col-6 ps-0">
            <HomeViewCalculator></HomeViewCalculator>
        </v-col>
    </v-row>
</template>

<script lang="ts">
// Components
import HomeViewList from './HomeViewList.vue';
import HomeViewCalculator from './HomeViewCalculator.vue';

// Other
import { Component, Vue } from 'vue-property-decorator';

@Component({
    components: {
        HomeViewList,
        HomeViewCalculator,
    },
})
export default class HomeView extends Vue {}
</script>
