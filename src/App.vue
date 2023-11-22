<template>
  <main>
    <!-- heading -->
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <!-- new task form -->
    <div class="new-task-form">
      <TaskForm />
    </div>

    <!-- filter -->
    <nav class="filter">
      <button @click="changeFilter('all')">All Tasks</button>
      <button @click="changeFilter('favorites')">Favorite Tasks</button>
    </nav>

    <!-- loading -->
    <div class="loading" v-if="loading">Loading tasks...</div>

    <!-- task list -->
    <div class="task-list" v-if="filter === 'all'">
      <p>All tasks ({{ totalCount }})</p>
      <div v-for="task in tasks" :key="task.id">
        <TaskDetail :task="task" />
      </div>
    </div>
    <div class="task-list" v-if="filter === 'favorites'">
      <p>Favorite tasks ({{ favoriteCount }})</p>
      <div v-for="task in favoriteTasks" :key="task.id">
        <TaskDetail :task="task" />
      </div>
    </div>
  </main>
</template>

<script setup>
import TaskDetail from '@/components/TaskDetail.vue'
import TaskForm from '@/components/TaskForm.vue'
import { useTaskStore } from '@/stores/tasks'
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

const taskStore = useTaskStore()

const { loading, tasks, favoriteTasks, favoriteCount, totalCount } = storeToRefs(taskStore)

// fetch tasks
taskStore.getTasks()

const filter = ref('all')

const changeFilter = (value) => (filter.value = value)
</script>
