<template>
  <div class="actor-card">
    <div class="actor-card__img" @click="toActor(actor.id)">
      <img v-if="!actor.profile_path" src="../../assets/no_photo.png"
           height="352.5"
           width="235"
      />
      <img v-else :src="url+actor.profile_path">
    </div>
    <div class="actor-card__title">
      {{ actor.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "PopularActorItem",
  props: {
    actor: Object,
    url: String
  },
  methods: {
    toActor( id ) {
      this.$router.push( `/actor/${ id }` )
    }
  }
}
</script>

<style scoped>
.actor-card {
  cursor: pointer;
}
.actor-card__title{
  text-align: center;
}
.actor-card__img img {
  width: 235px;
  border: 1px white;
  border-radius: 16px;
}

.actor-card {
  padding: 0px 5px;
  flex: 0 1 25%;
}
</style>