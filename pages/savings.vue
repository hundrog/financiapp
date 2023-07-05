<template>
  <v-card class="pa-2" height="350px">
    <v-row>
      <v-col md="6" cols="12">
        <v-text-field label="Initial Investment" prefix="$" v-model="values.investment"
          :error-messages="v$?.investment?.$errors?.map(e => e.$message)"></v-text-field>
      </v-col>
      <v-col md="6" cols="12">
        <v-text-field label="Contribution" prefix="$" v-model="values.contribution"
          :error-messages="v$?.contribution?.$errors?.map(e => e.$message)"></v-text-field>
      </v-col>
      <v-col md="3" cols="4">
        <v-text-field label="Length" v-model="values.periods"
          :error-messages="v$?.periods?.$errors?.map(e => e.$message)"></v-text-field>
      </v-col>
      <v-col md="3" cols="6">
        <v-select label="" :items="['Months', 'Years']" v-model="values.kind"
          :error-messages="v$?.kind?.$errors?.map(e => e.$message)"></v-select>
      </v-col>
      <v-col md="3" cols="6">
        <v-text-field label="Rate" suffix="%" v-model="values.rate"
          :error-messages="v$?.rate?.$errors?.map(e => e.$message)"></v-text-field>
      </v-col>
      <v-col md="3" cols="6">
        <v-select label="Interest Type" :items="['Simple', 'Compound']" v-model="values.compound"
          :error-messages="v$?.compound?.$errors?.map(e => e.$message)"></v-select>
      </v-col>
      <v-col cols="10" offset-md="1" xs="12">
        <v-btn block size="x-large" color="primary" variant="tonal" rounded="shaped" @click="getResults">Calcular</v-btn>
      </v-col>
    </v-row>
  </v-card>
  <div v-if="!Object.hasOwn(result, 'endingBalance')">
    <v-row class="my-2">
      <v-col lg="6" cols="12">
        <v-card class="py-4" height="350px">
        </v-card>
      </v-col>
      <v-col lg="6" cols="12">
        <v-card class="py-4" height="350px">
          <PieChart interest="50" principal="50" />
        </v-card>
      </v-col>
    </v-row>
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
  investment: null,
  contribution: null,
  compound: 'Simple',
  periods: 5,
  kind: 'Years',
}

const values = ref({ ...initialValues })

const rules = {
  rate: {
    required,
    decimal,
    minValueValue: minValue(0),
    $autoDirty: true,
  },
  investment: {
    required,
    decimal,
    minValueValue: minValue(0),
    $autoDirty: true,
  },
  contribution: {
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

  result.value = {
    balance: ""
  }
  console.log(result.value)
  // getDetails
  // for (let i = 0; i < values.value.periods; i++) {
  // }
}
</script>
