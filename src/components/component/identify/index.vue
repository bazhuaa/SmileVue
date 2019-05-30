<template>
  <div class="code" @click="refreshCode">
    <identify-code :identifyCode="identifyCode"></identify-code>
  </div>
</template>

<script>
  import identifyCode from './Sidentify'
    export default {
      name: "index",
      components: {identifyCode},

      data() {
        return {
          identifyCodes: "1234567890",
          identifyCode: ""
        };
      },
      mounted() {
        this.identifyCode = "";
        this.makeCode(this.identifyCodes, 4);
      },
      methods: {
        randomNum(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        },
        refreshCode() {
          this.identifyCode = "";
          this.makeCode(this.identifyCodes, 4);
        },
        makeCode(o, l) {
          for (let i = 0; i < l; i++) {
            this.identifyCode += this.identifyCodes[
              this.randomNum(0, this.identifyCodes.length)
              ];
          }
          this.$emit('getIdentifyCode',this.identifyCode)
        }
      }
    }
</script>

<style>
  .code {
    /*display: inline-block;*/
    width: 114px;
    float: right;
    height: 40px;
    border: 1px solid #282828;
  }
</style>
