<template>
  <div class="header-search">
    <input   class="custom-input"
             placeholder="Search film..."
             @input="handleInput( $event.target.value )"
             :value="value"
    >

  </div>
</template>

<script>
export default {
  name: "CustomInput",
  data() {
    return {

    }
  },
  props:{
    value: {
      type: [ String, Number ],
      default: ''
    },
  },
  methods: {
    handleInput( value ) {
      this.$emit( 'input', value )
    }
  }
}
</script>

<style scoped>
.header-search {
  padding: 0 12em;
  margin-top: 6px;
  display: flex;
  justify-content: center;
  height: 50px;
}
.custom-input {
  outline: none;
  width: 100%;
  border: 1px transparent;
  border-radius: 4px;
  font-size: 20px;
  background: #ffffff;
}
</style>