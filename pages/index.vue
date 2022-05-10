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
              <li v-for="(todo, index) in todos" :key="index" class="w-full px-5 pt-5 pb-4 flex border-b items-center justify-between w-full group cursor-pointer">
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
              <!-- <li class="w-full px-5 pt-5 pb-4 flex border-b items-center justify-between w-full group cursor-pointer">
                <div class="flex content-center items-center">
                  <div class="relative  w-[24px] h-[24px] bg-green-500 rounded-full overflow-hidden">
                    <div class="absolute flex items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-gradient-to-br from-cyan-300 to-fuchsia-500">
                      <img src="/icon-check.svg" alt="">
                    </div>
                  </div>
                  <span class="pl-4 line-through  decoration-1 text-gray-300">
                    Complete online JavaScript  course
                  </span>
                </div>
                <div>
                  <img src="/icon-cross.svg" class="invisible group-hover:visible float-right" alt="">
                </div>
              </li>
              <li class="w-full px-5 pt-5 pb-4 flex border-b align-middle justify-between w-full group cursor-pointer">
                <div class="flex">
                  <div class="relative w-[24px] h-[24px] rounded-full overflow-hidden border-2 hover:border-none">
                    <div class="absolute flex items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-gradient-to-br from-cyan-300 to-fuchsia-500">
                      <div class="bg-white w-[20px] h-[20px] rounded-full">
                      </div>
                    </div>
                  </div>
                  <span class="pl-4">
                    Jog around the park 3x xxxx
                  </span>
                </div>
                <div>
                  <img src="/icon-cross.svg" class="invisible group-hover:visible float-right" alt="">
                </div>
              </li> -->
            </ul>
          </div>
          <!-- <hr> -->
          <div class="flex justify-around p-5 text-sm text-gray-500">
            <div class="w-1/3">
              {{ itemsLeft }} items left 
            </div>
            <div class="flex w-1/3 text-center">
              <span class="pr-4 cursor-pointer">
                All
              </span>
              <span class="cursor-pointer">
                Active
              </span>
              <span class="pl-4 cursor-pointer">
                Completed
              </span>
            </div>
            <div class="w-1/3 text-right cursor-pointer">
              Clear Completed
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
      todos: [
        // {
        //   description: 'lorem ipsum',
        //   isCompleted: false
        // },
        // {
        //   description: 'lorem ipsum',
        //   isCompleted: true
        // }
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
    makeNewTodo: function () {
      if (this.newTodo != '') {
        this.todos.push({
          description: this.newTodo,
          isCompleted: false
        })

        this.newTodo = '';
      }
    },
    toggleCompleted: function (index) {
      if (!this.todos[index].isCompleted) {
        this.todos[index].isCompleted = !this.todos[index].isCompleted;

        let fakeCopy = this.todos[index]

        this.todos.splice(index, 1)
        this.todos.unshift(fakeCopy)
      } else {
        this.todos[index].isCompleted = !this.todos[index].isCompleted;

        let fakeCopy = this.todos[index]
        this.todos.splice(index, 1)
        this.todos.push(fakeCopy)
      }
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