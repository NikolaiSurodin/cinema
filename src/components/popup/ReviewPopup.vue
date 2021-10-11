<template>
  <div>
    <div class="btn-wrap">
      <div class="but-list">
        <b-icon class="close-btn" icon="x-circle" scale="2" variant="danger" @click="close"></b-icon>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="comment in review" :key="comment.id">
          <b-card bg-variant="dark" :header="comment.author" text-variant="white" class="text-center">
            <b-card-text>{{ comment.title }}</b-card-text>
          </b-card>
        </div>
      </div>
    </div>
    <div class="chat-button">
      <b-icon class="chat-left" icon="chat-left" scale="2"></b-icon>

    </div>
  </div>
</template>

<script>

export default {
  name: "ReviewPopup",
  data() {
    return {

    }
  },
  components: {

  },
  props: {
    review: Array
  },
  methods: {
    close() {
      this.$emit( 'close' )
    }
  }
}
</script>

<style scoped>
.btn-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.comment-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2vw;
  padding: 4px;
}

.close-btn {
  margin: 20px;
  cursor: pointer;
}
.chat-button {
  display: flex;
  justify-content: end;
  width: 50vw;
  margin-top: 10px;
}
</style>