<template>
  <div class="wrapper">
    <div class="wrapper-content">
      <section>
        <div class="container">
          
          <message v-if="message" :message="message" />

          <newNote :note="note" :priorities="priorities" @addNote="addNote"/>

          <div class="note-header" style="margin: 36px 0;">
            <h1>{{title}}</h1>

            <search :value="search" placeholder="Find your note" @search="search = $event" />

            <div class="icons">
              <svg :class="{active: grid}"  @click="grid = true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              <svg :class="{active: !grid}" @click="grid = false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3" y2="6"></line><line x1="3" y1="12" x2="3" y2="12"></line><line x1="3" y1="18" x2="3" y2="18"></line></svg>
            </div>
          </div>

          <!-- note list -->
          <notes :notes="notesFilter" :grid="grid" :priorities="priorities" @remove="removeNote"/>
          
        </div>
      </section>
    </div>
  </div>
</template>

<script>

import message from '@/components/Message.vue';
import notes from '@/components/Notes';
import newNote from '@/components/NewNote';
import search from '@/components/Search';

export default {
  components: {
    message,
    notes,
    newNote,
    search
  },
  data() {
    return {
      title: "node app",
      search: '',
      message: null,
      grid: true,
      note: {
        title: "",
        descr: "",
        priority: 0
      },
      priorities: [
        {index: 0, title: 'standart', class:''},
        {index: 1, title: 'important',class:'important'},
        {index: 2, title: 'very important',class:'very-important'}
      ]
    };
  },
  computed: {
    notesFilter() {
      let array = this.$store.getters.getNotes, //this.notes,
          search = this.search;

      //update last ID
      this.$store.dispatch('updateLastId');

      if(!search) return array;

      //Small
      search = search.trim().toLowerCase();
      //Filter
      array = array.filter(item => {
        if (item.title.toLowerCase().indexOf(search) !== -1)
          return item;
      });

      //Error
      return array;
    }
  },
  methods: {
    addNote() {
      const { title, descr, priority } = this.note;

      if (title === "") {
        this.message = "title can`t be blank!";
        return false;
      }

      const id = this.$store.getters.getLastId;

      this.$store.dispatch('addNote', {
          id,
          title,
          descr,
          priority,
          date: new Date(Date.now()).toLocaleString()
      });

      this.note.title = '';
      this.note.descr = '';
      this.message = null;
    },
    removeNote(id) {
        this.$store.dispatch('removeNote', id);
      // this.notes.splice(index, 1);
    },
  }
};
</script>

<style>
</style>