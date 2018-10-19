new Vue({})
Vue.component('button-counter', {
        data: function () {
          return {
            count: 0
          }
        },
        template: '<button>Vous m\'avez cliqué fois.</button>'
      })