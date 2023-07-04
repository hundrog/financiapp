<template>
  <Pie :data="data" :options="options" />
</template>

<script setup>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
const props = defineProps(["interest", "principal"])

const data = {
  labels: ['Interest', 'Principal'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651'],
      data: [props.interest, props.principal]
    }
  ]
}

const options = {
  responsive: true,
  maintainAspectRatio: false
}

ChartJS.register(ArcElement, Tooltip, Legend)
</script>
