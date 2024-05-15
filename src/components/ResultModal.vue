<template>
  <div
    class="fixed inset-0 w-full h-full bg-[rgba(0,0,0,0.7)] flex justify-center items-center cursor-pointer"
    @click.self="$emit('closeResultModal')"
  >
    <div
      class="p-4 pt-12 lg:p-12 w-[18rem] h-[18rem] sm:w-[30rem] sm:h-[22rem] md:w-[35rem] md:h-[27rem] lg:w-[50rem] lg:h-[30rem] bg-white cursor-default relative rounded"
    >
      <Icon
        @click="$emit('closeResultModal')"
        class="w-10 h-10 absolute top-2 right-2 cursor-pointer"
        icon="basil:cross-solid"
      />
      <div class="text-lg font-bold text-center mb-4">
        {{ pollDetails?.title }}
      </div>
      <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
import { Icon } from "@iconify/vue";
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

const props = defineProps([
  "pollDetails",
  "resultLabels",
  "resultValues",
  "labelText",
]);
defineEmits(["closeResultModal"]);

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const chartData = {
  labels: props.resultLabels,
  datasets: [
    {
      label: props.labelText,
      data: props.resultValues,
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)", 
        "rgba(75, 192, 192, 1)", 
      ],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
};
</script>
