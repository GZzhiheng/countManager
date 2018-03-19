 <style>
  #MyModal {color: #666;  }
  #MyModal .vodal-dialog {top: -300px !important;  }
  #MyModal .title {  border-bottom: 1px solid #f2f2f2;  height: 35px;  line-height: 26px;  font-size: 18px;  }
  #MyModal .title .glyphicon {  float: left;  font-size: 25px;  margin-right: 8px;  }
  #MyModal.no-title .vodal-close{display: none !important;}
  #MyModal .content {  padding-top: 15px;padding-bottom:15px; font-size:14px;}
  #MyModal .footer{width:100%;position: absolute; bottom:0; left:0;padding:15px; text-align: right; border-top:1px solid #f2f2f2}
</style>
<template>
  <div :class="{'no-title': value.noTitle }" id="MyModal">
    <vodal :closeOnClickMask="true" :show="value.show" :animation="value.ani" :height="value.height" :width="value.width" @hide="show = index">
      <div v-if="!value.noTitle" class="title">
        <span v-if="value.type == 'success'" class="glyphicon glyphicon-ok-sign text-success"></span>
        <span v-if="value.type == 'error'" class="glyphicon glyphicon-remove-sign text-danger"></span>
        <span v-if="value.type == 'info'" class="glyphicon glyphicon-info-sign text-primary"></span>
        <span v-if="value.type == 'confirm'" class="glyphicon glyphicon-question-sign text-warning"></span>
        {{value.title}}
      </div>
      <div class="content">
        <div v-if="value.html" v-html="value.content">
        </div>
        <div v-else>
          {{value.content}}
        </div>
      </div>
      <div v-if="value.btn" class="footer">
        <button type="button" @click="close" class="btn btn-default">{{value.btnText[0]}}</button>
        <button type="button" @click="yes" class="btn btn-primary">{{value.btnText[1]}}</button>
      </div>
    </vodal>
  </div>
</template>

<script>
  import Vodal from 'vodal'
  import 'vodal/common.css'
  import 'vodal/rotate.css'
  import 'vodal/door.css'
  import 'vodal/flip.css'
  import 'vodal/slide-down.css'
  import 'vodal/slide-left.css'
  import 'vodal/slide-right.css'
  import 'vodal/slide-up.css'
  import 'vodal/zoom.css'
  export default {
    name: 'modals',
    data () {
      return {
        title: 'this is vue modals'
      }
    },
    props: {
      value: {
        type: Object,
        default: function (val) {
          return val
        }
      },
      index: Number
    },
    computed: {
      modal () {
        return this.$store.state.modal
      },
      show: {
        get () {
          return this.$store.state.modal.show
        },
        set (index) {
          this.$store.commit('MODAL_CLOSE', index)
        }
      }
    },
    components: {
      Vodal
    },
    methods: {
      yes () {
        this.value.yes()
        this.$store.commit('MODAL_CLOSE', this.index)
      },
      close () {
        this.value.close()
        this.$store.commit('MODAL_CLOSE', this.index)
      }
    }
  }
</script>
