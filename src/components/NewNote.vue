<template>
  <div class="new-note">
    <form @submit.prevent="submit">
      <label>Title</label>
      <input type="text" v-model="note.title" />
      <label>priority</label>
      <select v-model="note.priority">
        <option :value="priority.index" v-for="(priority, index) in priorities" :key="index">{{priority.title}}</option>
      </select>
      <label>Description</label>
      <textarea v-model="note.descr"></textarea>
      <button class="btn btnPrimary">New Note</button>
    </form>
  </div>
</template>

<script>
export default {
    props: {
        note: {
            type: Object,
            required: true
        },
        priorities: {
            type: Array,
            reqiured: true
        } 
    },
    methods: {
        submit(){
            this.$emit('addNote', this.note);

            this.note.priority = 0;
        }
    }
};
</script>

<style land="scss" scoped>
.new-note{
    text-align: center;
}
button{
    margin: 15px;
}
</style>