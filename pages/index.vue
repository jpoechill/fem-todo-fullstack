<template>
  <div :class="darkMode ? 'dark' : ''">
    <div class="relative">
      <div class="absolute w-full z-50 px-5">
        <div class="container mx-auto">
          <div class="md:w-[540px] mx-auto pt-28 align-baseline">
            <div class="flex justify-between items-end w-full">
              <h1 class="text-5xl inline font-bold text-white align-baseline">
                TODO
              </h1>
              <img :src="darkMode ? '/icon-moon.svg' : '/icon-sun.svg'" @click="toggleDarkMode();" class="mb-[11px] inline float-right align-baseline" role="button" alt="">
            </div>
            <div class="bg-white dark:bg-[#25273D] mt-5 rounded p-4 drop-shadow-2xl">
              <div class="w-full pl-1 flex items-center w-full">
                <div class="w-[24px] h-[22px] rounded-full border-2 dark:border-[#393A4B] inline-block"></div>
                <input type="text" ref="todoInput" v-model="newTodo" placeholder="Create a new to do..." v-on:keyup.enter="makeNewTodo()" class="dark:bg-[#25273D] dark:text-[#C8CBE7] focus:outline-0 w-full p-1 pt-2 ml-3 text-lg">
              </div>
            </div>
            <div v-if="hasFetched" class="bg-white mt-5 rounded p-0 drop-shadow-2xl">
              <div class="p-0">
                <ul class="list-none text-lg">

                  <!-- Online List -->
                  <div v-if="online && data && data.todos">
                    <li v-for="(todo, index) in data.todos" :key="index" :class="[todo.isHovered ? 'bg-gray-50' : '', todo.isVisible ? 'visibile' : 'hidden']" draggable="true" 
                      @drop="drop($event, index)" @dragover="dragOver($event, index)" 
                      @dragleave="dragLeave($event, index)" @dragstart="drag($event, index)" 
                      class="ease-in w-full px-5 pt-5 pb-4 flex border-b dark:bg-[#25273D] dark:text-[#C8CBE7] items-center justify-between w-full group cursor-pointer">
                      <div class="flex content-center items-center">
                        <div v-if="todo.isCompleted" class="relative  w-[24px] h-[24px] rounded-full overflow-hidden">
                          <div @click="toggleCompleted(index)" class="absolute flex items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-gradient-to-br from-cyan-300 to-fuchsia-500">
                            <img src="/icon-check.svg" alt="">
                          </div>
                        </div>
                        <div v-else>
                          <div @click="toggleCompleted(index)" class="relative w-[24px] h-[24px] rounded-full overflow-hidden border-2 dark:border-[#393A4B] hover:border-none">
                            <div class="absolute flex items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-gradient-to-br from-cyan-300 to-fuchsia-500">
                              <div class="bg-white dark:bg-[#25273D] w-[20px] h-[20px] rounded-full">
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

                  </div>

                  <!-- Offline List -->
                  <div v-if="!online">
                    <li v-for="(todo, index) in todos" :key="index" :class="[todo.isHovered ? 'bg-gray-50' : '', todo.isVisible ? 'visibile' : 'hidden']" draggable="true" 
                      @drop="drop($event, index)" @dragover="dragOver($event, index)" 
                      @dragleave="dragLeave($event, index)" @dragstart="drag($event, index)" 
                      class="ease-in w-full px-5 pt-5 pb-4 flex border-b dark:bg-[#25273D] dark:text-[#C8CBE7] items-center justify-between w-full group cursor-pointer">
                      <div class="flex content-center items-center">
                        <div v-if="todo.isCompleted" class="relative  w-[24px] h-[24px] rounded-full overflow-hidden">
                          <div @click="toggleCompleted(index)" class="absolute flex items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-gradient-to-br from-cyan-300 to-fuchsia-500">
                            <img src="/icon-check.svg" alt="">
                          </div>
                        </div>
                        <div v-else>
                          <div @click="toggleCompleted(index)" class="relative w-[24px] h-[24px] rounded-full overflow-hidden border-2 dark:border-[#393A4B] hover:border-none">
                            <div class="absolute flex items-center justify-center left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[30px] h-[30px] bg-gradient-to-br from-cyan-300 to-fuchsia-500">
                              <div class="bg-white dark:bg-[#25273D] w-[20px] h-[20px] rounded-full">
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
                  </div>
                </ul>
              </div>
              <!-- <hr> -->
              <div class="flex justify-around p-5 text-sm  dark:bg-[#25273D] text-gray-500">
                <div class="w-1/3">
                  {{ itemsLeft }} items left 
                </div>
                <div class="flex w-1/3 text-center">
                  <span @click="show('all')" class="pr-4 cursor-pointer hover:text-gray-900 active:text-sky-600" :class="[showState === 'all' ? 'text-sky-600' : '']">
                    All
                  </span>
                  <span @click="show('active')" class="cursor-pointer hover:text-gray-900 active:text-sky-600" :class="[showState === 'active' ? 'text-sky-600' : '']">
                    Active
                  </span>
                  <span @click="show('completed')" class="pl-4 cursor-pointer hover:text-gray-900 active:text-sky-600" :class="[showState === 'completed' ? 'text-sky-600' : '']">
                    Completed
                  </span>
                </div>
                <div class="w-1/3 text-right cursor-pointer">
                  <span @click="clearCompleted()" class="hover:text-gray-900 active:text-sky-600">
                    Clear Completed
                  </span>
                </div>
              </div>
            </div>

            <div class="mx-auto text-center mt-12 text-xs pb-10">
              <div class="flex justify-center">
                <div class="form-check form-switch">
                  <input class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top 
                                bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" 
                        type="checkbox" role="switch" id="flexSwitchCheckChecked" v-model="online" :disabled="onlineDisabled">
                  <label class="form-check-label pt-1 inline-block text-sm text-gray-800 dark:text-white" for="flexSwitchCheckChecked">
                    {{ online ? 'Online' : 'Offline' }}
                  </label>
                </div>
              </div>
              <br><br>
              <span class="text-gray-400">Drag and drop to reorder list</span>
            </div>
            
          </div>
        </div>
      </div>
      
      <div class="absolute w-100 w-full top-0 z-20 select-none pointer-events-none h-screen dark:bg-[#171823]">
        <img :src="darkMode ? '/bg-desktop-dark.jpg' : '/bg-desktop-light.jpg'" class="min-h-[200px] w-full z-10" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api'
import { useQuery, useMutation } from '@urql/vue';

export default defineComponent({
async setup() {
    const result = useQuery({
      query: `
        query Todos {
          todos {
            description
            isCompleted
            isVisible
          }
        }
      `
    });

    const updateTodoResult = useMutation(`
      mutation ($description: String!) {
        createTodo (description: $description)
      }
    `);

    const removeTodo = useMutation(`
      mutation ($index: Int!) {
        removeTodo (index: $index)
      }
    `);

    const toggleCompleted = useMutation(`
      mutation ($index: Int!) {
        toggleCompleted (index: $index)
      }
    `);    

    const clearCompleted = useMutation(`
      mutation ($index: Int!) {
        clearCompleted (index: $index)
      }
    `); 

    return {
      CLEARCOMPLETED (index) {
        const variables = { index: index };
        console.log('execute')
        clearCompleted.executeMutation(variables).then(result => {
          this.refresh()
        });
      },
      REMOVETODO (index) {
        const variables = { index: index };

        removeTodo.executeMutation(variables).then(result => {
          this.refresh()
        });
      },
      TOGGLECOMPLETED (index) {
        const variables = { index: index };

        toggleCompleted.executeMutation(variables).then(result => {
          this.refresh()
        });
      },
      makeTodo (description) {
        const variables = {
          description: description
        };
        updateTodoResult.executeMutation(variables).then(result => {
          this.refresh()
        });
      },
      refresh() {
        result.executeQuery({
          requestPolicy: 'network-only',
        });
      },
      fetching: result.fetching,
      data: result.data,
      error: result.error,
    };
  },
  watch: {
    fetching() {
      this.hasFetched = true;

      // default to online mode
      if (this.data && this.fetching === false) {
        this.online = true
      } 
      
      // cannot fetch data
      if (!this.data) {
        this.online = false
        this.onlineDisabled = true
      }
    },
  },
  data () {
    return {
      online: false,
      hasFetched: false,
      onlineDisabled: false,
      darkMode: false,
      newTodo: '',
      showState: 'all',
      dragIndex: 0,
      todos: [
        {
          description: 'Complete online JavaScript course',
          isCompleted: true,
          isVisible: true,
        },
        {
          description: 'Jog around the park 3x',
          isCompleted: false,
          isVisible: true,
        },
        {
          description: 'Read for 1 hour',
          isCompleted: false,
          isVisible: true,
        },
        {
          description: 'Pick up groceries',
          isCompleted: false,
          isVisible: true,
        },
        {
          description: 'Complete Todo App on Frontend Mentor',
          isCompleted: false,
          isVisible: true,
        },
      ]
    }
  },
  computed: {
    itemsLeft: function () {
      if (this.online) {
        return this.data.todos.reduce((previous, key, index) => {
            return previous + (this.data.todos[index].isCompleted ? 0 : 1);
        }, 0);
      } else {
        return this.todos.reduce((previous, key, index) => {
            return previous + (this.todos[index].isCompleted ? 0 : 1);
        }, 0);
      }
    }
  },
  methods: {
    makeNewTodo: function () {
      if (this.newTodo != '') {
        if (this.online) {
          this.makeTodo(this.newTodo)
        } else {
          this.todos.push({
            description: this.newTodo,
            isCompleted: false,
            isHovered: false,
            isVisible: true
          })
        }

        this.newTodo = '';
      }
    },
    removeTodo: function (index) {
      if (this.online) {
        this.REMOVETODO(index)
      } else {
        this.todos.splice(index, 1)

        this.newTodo = '';
        this.$refs.todoInput.focus()
      }
    },
    clearCompleted: function () {
      if (this.online) {
        this.CLEARCOMPLETED(1)
      } else {
        for (let i = this.todos.length - 1; i >= 0; i--) {
          if (this.todos[i].isCompleted) {
            this.todos.splice(i, 1)
          }
        }
      }
    },
    toggleCompleted: function (index) {
      if (this.online) {
        console.log('online: toggle')
        this.TOGGLECOMPLETED(index)
      } else {
        this.todos[index].isCompleted = !this.todos[index].isCompleted;
      }
    },
    show (type) {
      let list 

      if (this.online) {
        list = this.data.todos
      } else {
        list = this.todos
      }
      
      if (type === 'all') {
        this.showState = 'all'
        list = list.map(x => {
          x.isVisible = true
          return x
        })
      } 
      if (type === 'active') {
        this.showState = 'active'
        list = list.map(x => {
          x.isVisible = !x.isCompleted
          return x
        })
      } 
      if (type === 'completed') {
        this.showState = 'completed'
        list = list.map(x => {
          x.isVisible = x.isCompleted
          return x
        })
      } 
    },
    toggleDarkMode () {
      this.darkMode = !this.darkMode
    },
    // onDrag handlers
    dragOver (event, index) {
      event.preventDefault()
      
      if (this.online) {
        this.data.todos[index].isHovered = true
      } else {
        this.todos[index].isHovered = true
      }
    },
    dragLeave (event, index) {
      event.preventDefault()
      
      if (this.online) {
        this.data.todos[index].isHovered = false
      } else {
        this.todos[index].isHovered = false
      }
    },
    drop(event, dropIndex) {
      event.preventDefault()
      
      if (this.online) {
        let temp = this.data.todos[this.dragIndex]
        this.data.todos[dropIndex].isHovered = false
        this.data.todos.splice(this.dragIndex, 1)
        this.data.todos.splice(dropIndex, 0, temp)
      } else {
        let temp = this.todos[this.dragIndex]
        this.todos[dropIndex].isHovered = false
        this.todos.splice(this.dragIndex, 1)
        this.todos.splice(dropIndex, 0, temp)
      }
    },
    drag (ev, index) {
      this.dragIndex = index
      ev.dataTransfer.setData("text", this.todos[index].description);
    },
  }
})
</script>


<style>
html, body {
  font-family: 'Josefin Sans';
}
</style>