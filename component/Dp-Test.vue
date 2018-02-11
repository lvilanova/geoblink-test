<template>
<div class="wrapper">
  <p>{{texto}}</p>
<!--   <button v-on:click="loadStates()">Cargar estados</button>-->
<!-- <select>
    <option v-for="item in this.filterState" v-bind:key="item" > {{ item }}</option>
</select> -->
 <input v-on:input="clickDropdown()" list="lista" type="text" v-model="search" placeholder="list of states of USA" name ="whatever"/>
    <datalist id="lista">
        <option  v-for = "state in this.mockStates" v-bind:key="state">{{state}}</option>
     </datalist>       
 

     <div class="tag" v-for="item in this.itemSelected" v-bind:key="item">
        <span v-on:click="removeItem(item)">x</span><span>{{item}}</span> 
    </div>   

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
      texto: "variable texto dropdown",
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
    .wrapper{
        box-sizing: border-box;
        max-width: 1024px;
        min-width: 320px;
        margin: 0 auto;
        padding: 0 8px;
    }
    input{
        width:90%;
        padding: 0.5em 0.5em;
        font-size: 1.2em;
        border-radius: 3px;
        border: 1px solid #D9D9D9;
    }
    li {
        display: block;
    }
    span {
        background: #ccc;
        padding: 10px;
    }
    .tag {
        display: inline;
    }
    @media only screen and (min-width: 48em) {
  
     
    input{
        width: 50%;
        
    }
    }
</style>

