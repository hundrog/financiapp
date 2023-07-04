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
      backgroundColor: ['#CDDC39', '#7E57C2'],
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
