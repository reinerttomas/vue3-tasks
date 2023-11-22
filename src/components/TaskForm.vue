<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <input type="text" placeholder="I need to..." v-model="newTask" />
      <button>Add</button>
    </form>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks'
import { ref } from 'vue'

const taskStore = useTaskStore()
const newTask = ref('')

const handleSubmit = () => {
  if (newTask.value.length > 0) {
    taskStore.addTask({
      id: crypto.randomUUID(),
      title: newTask.value,
      isFavorite: false
    })

    newTask.value = ''
  }
}
</script>
