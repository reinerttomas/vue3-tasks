import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTaskStore = defineStore('tasks', () => {
  const tasks = ref([])
  const loading = ref(false)

  const favoriteTasks = computed(() => tasks.value.filter((task) => task.isFavorite))
  const favoriteCount = computed(() => favoriteTasks.value.length)
  const totalCount = computed(() => tasks.value.length)

  async function getTasks() {
    loading.value = true

    const response = await fetch('http://localhost:3000/tasks')
    const data = await response.json()

    tasks.value = data
    loading.value = false
  }

  async function addTask(task) {
    tasks.value.push(task)

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.error) {
      console.log(response.error)
    }
  }

  async function deleteTask(id) {
    tasks.value = tasks.value.filter((task) => task.id !== id)

    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.error) {
      console.log(response.error)
    }
  }

  async function toggleFavorite(id) {
    const task = tasks.value.find((task) => task.id === id)
    task.isFavorite = !task.isFavorite

    const response = await fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isFavorite: task.isFavorite
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    if (response.error) {
      console.log(response.error)
    }
  }

  return {
    tasks,
    isLoading: loading,
    favoriteTasks,
    favoriteCount,
    totalCount,
    getTasks,
    addTask,
    deleteTask,
    toggleFavorite
  }
})
