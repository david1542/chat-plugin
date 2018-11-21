Vue.component('tooltip', {
  props: {
    message: {
      required: true,
      type: String
    },
    position: {
      required: true,
      type: Object
    }
  },
  template: `
    <div
      class="tooltip-container"
      :style="position"
    >
      <div class="tooltip-message">
        {{ message }}
      </div>
    </div>
  `
})