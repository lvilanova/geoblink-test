<template>
   <div class="wrapper">
      <div class="wrapper__tag">
         <div class="tag" v-for="item in this.itemSelected" v-bind:key="item">
            <span v-on:click="removeItem(item)">{{item}}</span> 
         </div>
      </div>
      <p>{{texto}}   
         <img src="../src/assets/american-flag.svg" class="american-flag">
      </p>
      <input v-on:input="clickDropdown()" list="lista" type="text" v-model="search" placeholder="list of U.S. states" name ="whatever"/>
      <datalist id="lista">
         <option  v-for = "state in this.mockStates" v-bind:key="state">{{state}}</option>
      </datalist>
   </div>
</template>

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
    filterState() {
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
      //load list and filter all elements except we already have.
      //check and delete them
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
      padding: 0 15px 0 23px;
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
  .american-flag {
      position: relative;
      top: 4px;
      width: 40px;
      padding-left: 8px;
  }
  @media only screen and (min-width: 48em) {
      input {
          width: 50%;
      }
      .wrapper__tag {
          width: 60%;
          margin: 0 auto;
      }
  }
</style>

