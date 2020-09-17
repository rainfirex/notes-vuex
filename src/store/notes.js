export default {
    state: {
        lastId: 3,

        notes: [
            {
                id:1,
                title: "First Note",
                descr: "Descr for first note",
                priority: 0,
                date: new Date(Date.now()).toLocaleString()
            },
            {
                id:2,
                title: "Second Note",
                descr: "Descr for second note",
                priority: 0,
                date: new Date(Date.now()).toLocaleString()
            },
            {
                id:3,
                title: "Third Note",
                descr: "Descr for third note",
                priority: 0,
                date: new Date(Date.now()).toLocaleString()
            }
        ]
    },
    getters: {
        getLastId(state){
            return state.lastId;
        },

        getNotes(state) {
            return state.notes;
        }
    },
    mutations:{
        updateLastId(state) {
            state.lastId++;
        },

        addNote(state, payload) {
            state.notes.unshift(payload);
        },

        removeNote(state, payload) {
            const index = state.notes.findIndex(note => note.id === payload);
            state.notes.splice(index, 1)
        }
    },
    actions: {
        updateLastId({commit}) {
            commit('updateLastId');
        },

        addNote({commit}, payload) {
            commit('addNote', payload)
        },

        removeNote({commit}, payload) {
            commit('removeNote', payload)
        }
    }
}