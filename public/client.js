// client-side js
// run by the browser each time your view template is loaded

const modalTemplate = `
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              default body
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>`;

console.log("hello world :o");

Vue.component("modal", {
  template: modalTemplate
});

var app = new Vue({
  el: "#app",
  data: function() {
    return {
      message: "my favorite tiktoks",
      tiktoks: [],
      showModal: false,
      selected: "",
      comKey: 0
    };
  },
  methods: {
    playTikTok(tiktok) {
      this.selected = tiktok;
      console.log(tiktok)
      this.showModal = true;
    }
  },
  mounted: function() {
    fetch("/data", {
      method: "get"
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.tiktoks = json;
      });
  }
});
