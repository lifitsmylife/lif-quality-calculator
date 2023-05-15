<template>
    <div>
        <v-tabs center-active v-model="tabManager.activeTabIndex">
            <v-tab v-for="(item, index) in tabManager.tabs" :key="index">
                {{ item.recipe.name }} ({{ item.recipe.result }})

                <v-btn class="ml-1" text fab x-small @click.stop="onTabRemoved(item)">
                    <v-icon color="red">mdi-close</v-icon>
                </v-btn>
            </v-tab>
        </v-tabs>

        <v-card-text v-if="tab">
            <v-container>
                <template v-for="requirement in tab.recipe.requirements">
                    <v-row :key="requirement.id">
                        <v-col cols="12">
                            <v-text-field
                                :label="requirement.material.name"
                                v-model.number="requirement.material.value"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </template>

                <v-row>
                    <v-col cols="12">
                        <v-text-field label="Quality" :value="tab.recipe.result"></v-text-field>
                    </v-col>
                </v-row>
            </v-container>
        </v-card-text>
    </div>
</template>
<script lang="ts">
import QualityCalculator from '@/core/QualityCalculator';
import TabManager from '@/core/TabManager';
import ITab from '@/core/Values/ITab';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class HomeViewCalculator extends Vue {
    tabManager = TabManager;

    get tab(): ITab | null {
        return this.tabManager.activeTab;
    }

    onTabRemoved(tab: ITab): void {
        TabManager.remove(tab);
    }
}
</script>
