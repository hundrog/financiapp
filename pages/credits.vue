<template>
  <v-card class="pt-3 px-2 mb-2">
    <v-row>
      <v-col md="3" cols="8">
        <v-text-field label="Amount" prefix="$" v-model="values.amount"
          :error-messages="v$?.amount?.$errors?.map(e => e.$message)"></v-text-field>
      </v-col>
      <v-col md="2" cols="4">
        <v-text-field label="Period" v-model="values.periods"
          :error-messages="v$?.periods?.$errors?.map(e => e.$message)"></v-text-field>
      </v-col>
      <v-col md="2" cols="6">
        <v-select label="Select" :items="['Months', 'Years']" v-model="values.kind"
          :error-messages="v$?.kind?.$errors?.map(e => e.$message)"></v-select>
      </v-col>
      <v-col md="2" cols="6">
        <v-text-field label="Rate" suffix="%" v-model="values.rate"
          :error-messages="v$?.rate?.$errors?.map(e => e.$message)"></v-text-field>
      </v-col>
      <v-col md="2" cols="12" offset-md="1" xs="12">
        <v-btn :class="mobile ? 'mb-2' : 'mt-2'" block size="x-large" color="primary" variant="tonal" rounded="shaped" @click="getResults">Calcular</v-btn>
      </v-col>
    </v-row>
  </v-card>
  <div v-if="Object.hasOwn(result, 'totalPayment')">
    <v-card class="mb-6">
      <v-row align="center" justify="center" class="px-4">
        <v-col cols="2">
          <p>Monthly payment</p>
          <p>Total payment</p>
          <p>Total Interest</p>
        </v-col>
        <v-col cols="2" class="font-weight-medium">
          <p>${{ result?.monthlyPayment.toFixed(2) || '0.00' }}</p>
          <p>${{ result?.totalPayment.toFixed(2) || '0.00' }}</p>
          <p>${{ result?.totalInterest.toFixed(2) || '0.00' }}</p>
        </v-col>
        <v-col cols="2">
          <PieChart
          :interest="result?.totalInterest.toFixed(2)"
          :principal="result?.totalPayment.toFixed(2)"
          />
        </v-col>
      </v-row>
    </v-card>
    <v-expansion-panels>
      <v-expansion-panel title="Details">
        <v-expansion-panel-text>
          <v-table fixed-header>
            <thead>
              <tr>
                <th class="text-left">
                  Period
                </th>
                <th class="text-left">
                  Balance
                </th>
                <th class="text-left">
                  Payment
                </th>
                <th class="text-left">
                  Interest
                </th>
                <th class="text-left">
                  Principal
                </th>
                <th class="text-left">
                  New Balance
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in details" :key="item.name">
                <td>{{ item.period }}</td>
                <td>{{ item.balance.toFixed(2) }}</td>
                <td>{{ item.payment.toFixed(2) }}</td>
                <td>{{ item.interest.toFixed(2) }}</td>
                <td>{{ item.principal.toFixed(2) }}</td>
                <td>{{ item.newBalance.toFixed(2) }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import { useVuelidate } from '@vuelidate/core'
import { required, integer, decimal, minValue } from '@vuelidate/validators'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()

const initialValues = {
  rate: null,
  amount: null,
  periods: 12,
  kind: 'Months',
}

const values = ref({ ...initialValues })

const rules = {
  rate: {
    required,
    decimal,
    minValueValue: minValue(0),
    $autoDirty: true,
  },
  amount: {
    required,
    decimal,
    minValueValue: minValue(0),
    $autoDirty: true,
  },
  periods: {
    required,
    integer,
    minValueValue: minValue(1),
    $autoDirty: true,
  }
}

const v$ = useVuelidate(rules, values)

const result = ref({});
const details = ref([]);

const getResults = async () => {
  const validForm = await v$.value.$validate();
  if (!validForm) return;

  details.value = []
  const monthlyRate = ((values.value.rate / 100) / ((360 * 12) / 365))
  const monthlyPayment = values.value.amount / ((1 - (1 + monthlyRate)**-values.value.periods) / monthlyRate)
  const totalPayment = monthlyPayment * values.value.periods
  const totalInterest = totalPayment - values.value.amount

  result.value = {
    monthlyPayment,
    totalPayment,
    totalInterest,
  }
  // alert(JSON.stringify(result.value, null, 2))
  // getDetails
  for (let i = 0; i < values.value.periods; i++) {
    const balance = i === 0 ? parseFloat(values.value.amount) : details.value[i - 1].newBalance
    const interest = ((balance * (values.value.rate / 100) * 30) / 360);
    const principal = (monthlyPayment - interest)
    const newBalance = (balance - principal)
    details.value.push({
      period: i + 1,
      balance,
      payment: monthlyPayment,
      interest,
      principal,
      newBalance,
    })
  }
}
</script>
