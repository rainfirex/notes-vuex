<template>
  <div class="notes" @click="close">

    <div class="note"
     :class="[priorities[note.priority].class, {'full': !grid}]"
      v-for="(note, index) in notes" :key="note.id" :id="note.id">

      <div class="note-header" :class="{full: !grid}">
        <div>
          <input type="text"
          v-model="note.title"
          v-if="currIndexElement === index"
          @keyup.enter="clickEnter(note)"
          @keyup.esc="clickESC(note)">

          <p v-else @dblclick="showInput(index, note)">{{note.title}}</p>
        </div>
        <p style="cursor: pointer;" @click="removeNote(note.id)">x</p>
      </div>

      <div>

        <select 
        v-model="note.priority"
        v-if="currIndexElement === index"
        @keyup.esc="clickESC(note)"
        >
          <option :value="pr.index" v-for="(pr, index) in priorities" :key="index">{{pr.title}}</option>
        </select>

      </div>

      <div class="note-body">
        <div>
          <input type="text"
          v-model="note.descr"
          v-if="currIndexElement === index"
          @keyup.enter="clickEnter(note)"
          @keyup.esc="clickESC(note)">

          <p v-else>{{note.descr}}</p>
        </div>        
        <span>{{note.date}}</span>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    notes: {
      type: Array,
      required: true
    },
    grid: {
        type: Boolean,
        required: true
    },
    priorities: {
      type: Array,
      required: true
    }
  },

  data() {
    return {
      currIndexElement: null,
      title: '',
      priority: 0,
      descr: '',
      date: '',
      note: { }
    }
  },

  methods: {
    removeNote(index) {
      this.$emit('remove', index);
    },
    showInput(index, note, i) {

        this.note = note;

        this.currIndexElement = index;

        this.title = note.title;
        this.priority = note.priority;
        this.descr = note.descr;
    },
    clickEnter(note) {
      this.currIndexElement = null;
      note.date = new Date(Date.now()).toLocaleString();
    },
    clickESC(note) {
       note.title = this.title;
       note.priority = this.priority;
       note.descr = this.descr;

       this.currIndexElement = null
    },
    close(event) {
      const el = event.target;

      if(el.className === 'notes') {
        this.currIndexElement = null;
        this.note.date = new Date(Date.now()).toLocaleString();
      }
      
    }
  }
};
</script>

<style lang="scss">

.notes{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 40px 0;
}

.note{
    width: 48%;
    padding: 18px 20px;
    margin-bottom: 20px;
    background-color: #ffffff;
    transition: all .25s cubic-bezier(.02, 01, .47, 1);
    box-shadow: 0 30px 30px rgba(0,0,0, .02);
    &:hover{
        box-shadow: 0 30px 30px rgba(0,0,0, .04);
        transform: translate(0, -6px);
        transition-delay: 0s !important;
    }
    &.full{
        width: 100%;
        text-align: center;
    } 
    &.important{
      border: solid 1px #f2ffb1;  
      background: #e3f1a7;
    }
    &.very-important {
      border: solid 1px #ffb1b1;
      background: #efd4d4;
    }
}

.note-header{
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        font-size: 32px;
    }

    p {
        font-size: 22px;
        color: #2d35a5;
    }

    svg{
        color: #999999;
        margin-right: 12px;
        cursor: pointer;
        &.active{
            color: #2d35a5;
        }
        &:last-child {
            margin-right:0;
        }
    }
    &.full{
        justify-content: center;
        p{
            margin-right: 16px;
            &:last-child {
                margin-right: 0px;
            }
        }
    }
}

.note-body{

    p {
        margin: 20px 0;
    }

    span{
        font-size: 14px;
        color: #999999;
    }
}

.hide{
  display: none;
}

</style>