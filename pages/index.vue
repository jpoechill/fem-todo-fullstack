<template>
  <div class="relative">
    <div class="container mx-auto px-5 z-50">
      <div class="md:w-[540px] mx-auto pt-28">
        <h1 class="text-5xl font-bold text-white">
          TODO
          <img src="/icon-sun.svg" class="inline" alt="">
        </h1>
        <div class="bg-white mt-5 rounded p-4 drop-shadow-2xl">
          <div class="w-full pl-1 flex items-center w-full">
            <div class="w-[24px] h-[22px] rounded-full border-2 inline-block"></div>
            <input type="text" ref="todoInput" v-model="newTodo" placeholder="Create a new todo..." v-on:keyup.enter="makeNewTodo()" class="focus:outline-0 w-full p-1 pt-2 ml-3 text-lg">
          </div>
        </div>
        <div class="bg-white mt-5 rounded p-0 drop-shadow-2xl">
          <div class="p-0">
            <ul class="list-none text-lg">
              <li v-for="(todo, index) in todos" :key="index" :class="[todo.isHovered ? 'bg-gray-50' : '', todo.isVisible ? 'visibile' : 'hidden']" draggable="true" 
                  @drop="drop($event, index)" @dragover="dragOver($event, index)" 
                  @dragleave="dragLeave($event, index)" @dragstart="drag($event, index)" 
                  class="ease-in w-full px-5 pt-5 pb-4 flex border-b items-center justify-between w-full group cursor-pointer">
                <div class="flex content-center items-center">
                  <div v-if="todo.isCompleted" class="relative  w-[24px] h-[24px] bg-green-500 rounded-full overflow-hidden">
                    <div @click="toggleCompleted(index)" class="absolute flex items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-gradient-to-br from-cyan-300 to-fuchsia-500">
                      <img src="/icon-check.svg" alt="">
                    </div>
                  </div>
                  <div v-else>
                    <div @click="toggleCompleted(index)" class="relative w-[24px] h-[24px] rounded-full overflow-hidden border-2 hover:border-none">
                      <div class="absolute flex items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-gradient-to-br from-cyan-300 to-fuchsia-500">
                        <div class="bg-white w-[20px] h-[20px] rounded-full">
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <span class="pl-4 decoration-1" :class="[todo.isCompleted ? 'line-through text-gray-300' : '']">
                    {{ todo.description }}
                  </span>
                </div>
                <div>
                  <img @click="removeTodo(index)" src="/icon-cross.svg" class="invisible group-hover:visible float-right" alt="">
                </div>
              </li>
            </ul>
          </div>
          <!-- <hr> -->
          <div class="flex justify-around p-5 text-sm text-gray-500">
            <div class="w-1/3">
              {{ itemsLeft }} items left 
            </div>
            <div class="flex w-1/3 text-center">
              <span @click="show ('all')" class="pr-4 cursor-pointer hover:text-gray-900">
                All
              </span>
              <span @click="show ('active')" class="cursor-pointer hover:text-gray-900">
                Active
              </span>
              <span @click="show ('completed')" class="pl-4 cursor-pointer hover:text-gray-900">
                Completed
              </span>
            </div>
            <div class="w-1/3 text-right cursor-pointer">
              <span @click="clearCompleted()" class="hover:text-gray-900">
                Clear Completed
              </span>
            </div>
          </div>
        </div>

        <div class="mx-auto text-center mt-12 text-xs text-gray-400">
          Drag and drop to reorder list
        </div>
        
      </div>
    </div>
    <div class="absolute w-100 w-full top-0 -z-10 select-none pointer-events-none">
      <!-- <div class="w-full"> -->
        <img src="/bg-desktop-light.jpg" class="min-h-[200px] w-full" alt="">
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  setup() {
    
  },
  data () {
    return {
      newTodo: '',
      dragIndex: 0,
      droppedDesc: 'DROP HERE',
      todos: [
        {
          description: 'lorem ipsum',
          isCompleted: true,
          isVisible: true,
        }
      ]
    }
  },
  computed: {
    itemsLeft: function () {
      let count = 0

      for (let i = 0; i < this.todos.length; i++) {
        !this.todos[i].isCompleted ? count++ : ''
      }

      return count
    }
  },
  methods: {
    dragOver (event, index) {
      event.preventDefault()
      this.todos[index].isHovered = true
      // console.log('You hovered over me')
    },
    dragLeave (event, index) {
      event.preventDefault()
      this.todos[index].isHovered = false
      // console.log('You hovered away from me')
    },
    drop(ev, dropIndex) {
      ev.preventDefault()
      let temp = this.todos[this.dragIndex]
      // this.todos[this.dragIndex].isHovered = false
      this.todos[dropIndex].isHovered = false
      this.todos.splice(this.dragIndex, 1)
      this.todos.splice(dropIndex, 0, temp)
    },
    drag (ev, index) {
      this.dragIndex = index
      ev.dataTransfer.setData("text", this.todos[index].description);
    },
    clearCompleted: function () {
      for (let i = this.todos.length - 1; i >= 0; i--) {
        if (this.todos[i].isCompleted) {
          this.todos.splice(i, 1)
        }
      }
    },
    makeNewTodo: function () {
      if (this.newTodo != '') {
        this.todos.push({
          description: this.newTodo,
          isCompleted: false,
          isHovered: false,
          isVisible: true
        })

        this.newTodo = '';
      }
    },
    show (type) {
      if (type === 'all') {
        this.todos = this.todos.map(x => {
          x.isVisible = true
          return x
        })
      } 
      if (type === 'active') {
        this.todos = this.todos.map(x => {
          x.isVisible = !x.isCompleted
          return x
        })
      } 
      if (type === 'completed') {
        this.todos = this.todos.map(x => {
          x.isVisible = x.isCompleted
          return x
        })
      } 
    },
    toggleCompleted: function (index) {
      this.todos[index].isCompleted = !this.todos[index].isCompleted;
    },
    removeTodo: function (index) {
      this.todos.splice(index, 1)

      this.newTodo = '';
      this.$refs.todoInput.focus()
    }
  }
})
</script>


<style>
html, body {
  font-family: 'Josefin Sans';
}
</style>