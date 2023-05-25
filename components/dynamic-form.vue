<template>
  <v-form>
    <v-container>
      <v-card v-if="dynamicForm" class="mx-auto pa-12 pb-8" elevation="8" max-width="550" rounded="lg">
        <div class="text-center my-5">
          <h1>Kuantaz</h1>
          <p>Prueba Tecnica</p>
        </div>
        <v-container v-for="field in dynamicForm.form">
          <div class="text-subtitle-1 text-medium-emphasis">{{ field.question }}</div>
          <div v-if="field.type == 'INPUT'">
            <v-text-field density="compact" variant="outlined" v-model="field.response"></v-text-field>
          </div>
          <div v-if="field.type == 'SELECT'">
            <v-select label="Seleccione una respuesta" :items="field.items" item-title="value" item-value="value"
              v-model="field.response"></v-select>
          </div>
          <div v-if="field.type == 'CHECKBOX'">
            <v-checkbox v-model="field.response"
              :label="`${field.response ? field.items[0] : field.items[1]}`"></v-checkbox>
          </div>
        </v-container>

        <v-btn block class="mb-8" color="blue-grey-lighten-1" size="large" variant="elevated" @click="dialog = true"
          :disabled="!validateInputs">
          Confirmar
        </v-btn>
        <div>
        </div>
      </v-card>
    </v-container>
  </v-form>
  <div>
    <v-dialog v-model="dialog" width="auto">
      <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="500" rounded="lg">
        <v-card-title class="text-center">Gracias!</v-card-title>
        <v-card-subtitle>A continuacion te mostramos tus respuestas:</v-card-subtitle>
        <v-list lines="one" class="my-5">
          <v-list-item class="py-5" v-for="item in dynamicForm.form" :key="item.question">
            <v-list-item-title>{{ item.question }}</v-list-item-title>
            <v-list-item-subtitle v-if="item.type == 'CHECKBOX'">{{ item.response ? item.items[0] : item.items[1] }}</v-list-item-subtitle>
            <v-list-item-subtitle v-else>{{ item.response.toString() }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
        <v-card-actions>
          <v-btn class="mb-8" color="blue-grey-lighten-1" size="large" variant="elevated" block
            @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>

const dynamicForm = ref(null)
const dialog = ref(false)

onMounted(async () => {
  const { data: formData } = await useAsyncData("formData", () => $fetch('https://run.mocky.io/v3/6bd01347-72e9-49da-809a-d5002ca63b2c'),
    {
      transform: (formData) =>
        formData.formulario
    }
  )
  console.log(formData.value)
  dynamicForm.value = formData.value
})

const validateInputs = computed(() => {
  return dynamicForm.value.form.every(element => element.response.toString() != '')
})
</script>