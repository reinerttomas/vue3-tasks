<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="taskStore.deleteTask(task.id)">delete</i>
      <i
        class="material-icons"
        :class="{ active: task.isFavorite }"
        @click="taskStore.toggleFavorite(task.id)"
        >favorite</i
      >
    </div>
  </div>
</template>

<script setup>
import { useTaskStore } from '@/stores/tasks'

defineProps({
  task: Object
})

const taskStore = useTaskStore()
</script>
