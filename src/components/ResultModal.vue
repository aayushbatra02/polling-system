<template>
  <div
    class="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center cursor-pointer"
    @click.self="closeResultModal"
  >
    <div
      class=" p-4 pt-12 lg:p-12 w-[18rem] h-[18rem] sm:w-[30rem] sm:h-[22rem] md:w-[35rem] md:h-[27rem] lg:w-[50rem] lg:h-[30rem] bg-white cursor-default relative rounded"
    >
      <Icon
        @click="closeResultModal"
        class="w-10 h-10 absolute top-2 right-2 cursor-pointer"
        icon="basil:cross-solid"
      />
      <div class="text-lg font-bold text-center mb-4">
        {{ pollDetails.title }}
      </div>
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { defineProps } from "vue";
import { Icon } from "@iconify/vue";

import { usePollStore } from "@/stores/pollStore";

const props = defineProps(["pollDetails"]);

const { showResultModal } = storeToRefs(usePollStore());
import { Bar } from "vue-chartjs";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const barLables = props.pollDetails.optionList.map(
  (option) => option.optionTitle
);
const barValues = props.pollDetails.optionList.map(
  (option) => option.totalVoteCount
);

const chartData = {
  labels: barLables,
  datasets: [{ label: "Vote Count", data: barValues }],
};

const chartOptions = {
  responsive: true,
};

const closeResultModal = () => {
  showResultModal.value = false;
};

</script>
