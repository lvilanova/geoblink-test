<template>
<div class="wrapper">

     <div class="tag" v-for="item in this.itemSelected" v-bind:key="item">
        <span v-on:click="removeItem(item)">{{item}}</span> 
    </div>   

  <p>{{texto}}</p>
<!--   <button v-on:click="loadStates()">Cargar estados</button>-->
<!-- <select>
    <option v-for="item in this.filterState" v-bind:key="item" > {{ item }}</option>
</select> -->
 <input v-on:input="clickDropdown()" list="lista" type="text" v-model="search" placeholder="list of states of USA" name ="whatever"/>
    <datalist id="lista">
        <option  v-for = "state in this.mockStates" v-bind:key="state">{{state}}</option>
    </datalist>       


 <!-- 
     por JS utilizamos filterState, por html5, utilizamos this.mockstates
 -->
</div>
</template>
<!-- 
Ahora mismo estamos cargando los estados en un evento click a segundos
Por eso tenemos la variable mockStates vacía en una carga inicial, si no la tendríamos en el mounted que es
cuando carga la página. 

-->
<script>
import axios from "axios";

export default {
  name: "Dropdown",
  data() {
    return {
      texto: "Please, select your state",
      mockStates: [],
      search: "",
      itemSelected: []
    };
  },
  props: {
    textoFromParent: {
      required: false,
      type: String
    }
  },
  computed: {
    // statesArray () {
    //     let _statesArray = []
    //     Object.keys(this.mockStates).forEach(key => {
    //         _statesArray.push(this.mockStates[key])
    //     })
    //     return _statesArray
    // }

    filterState() {
      // let filterTmp= []

      // for (let i=0; i<this.mockStates.length;i++){
      //     let state=this.mockStates[i]
      //     console.log(state);

      //     if(state.toLowerCase().includes(this.search.toLowerCase())){
      //         filterTmp.push(state);
      //     }
      // }
      // return filterTmp;

      return this.mockStates.filter(state => {
        return state.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    loadStates() {
      this.mockStates = [];
      axios.get("http://localhost:3000").then(response => {
        Object.keys(response.data).forEach(key => {
          this.mockStates.push(response.data[key]);
        });
      });
    },
    removeItem(item) {
      this.itemSelected = this.itemSelected.filter(element => {
        return element !== item;
      });
      //queremos la lista otra vez entera menos los elementos seleccionados, hacemos llamada y comparamos
      //para comprobar y eliminarlos elementos.
      this.loadStates();
      this.mockStates = this.mockStates.filter(element => {
        return this.itemSelected.indexOf(element) === -1;
      });
    },
    clickDropdown() {
      if (this.mockStates.indexOf(this.search) !== -1) {
        this.itemSelected.push(this.search);
        this.mockStates = this.mockStates.filter(element => {
          return element !== this.search;
        });
        this.search = "";
      }
      //vaciamos el search

      console.log("EVENTO");
    }
  },

  mounted() {
    this.loadStates();
  }
};
</script>
<style scoped>
.wrapper {
  box-sizing: border-box;
  max-width: 1024px;
  min-width: 320px;
  margin: 0 auto;
  padding: 0 8px;
}
input {
  width: 90%;
  padding: 0.5em 0.5em;
  font-size: 1.2em;
  border-radius: 3px;
  border: 1px solid #d9d9d9;
}
input::-webkit-calendar-picker-indicator {
  opacity: 100;
}
li {
  display: block;
}

.tag {
  display: inline;
}
.tag {
  cursor: pointer;
  background: #eee;
  border-radius: 3px 0 0 3px;
  color: #999;
  display: inline-block;
  height: 26px;
  line-height: 26px;
  padding: 0 20px 0 23px;
  position: relative;
  margin: 0 10px 10px 0;
  text-decoration: none;
}
.tag::before {
  content: "x";
  height: 6px;
  left: 10px;
  position: absolute;
  width: 6px;
}
.tag::after {
  background: #fff;
  border-bottom: 13px solid transparent;
  border-left: 10px solid #eee;
  border-top: 13px solid transparent;
  content: "";
  position: absolute;
  right: 0;
  top: 0;
}
@media only screen and (min-width: 48em) {
  input {
    width: 50%;
  }
}
</style>

