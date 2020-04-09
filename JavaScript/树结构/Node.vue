<template>
  <li :class="{hasChild:hasChild}">

    <h2 class="t-node" @click="showChild(true)" v-if="hasChild" data-haschild="true" >{{tnode.value}}</h2>
    <ul class="children" v-if="hasChild"  :class="{show:show}">
      <Node v-for="item in tnode.children" :tnode="item" />
    </ul>

    <h2 class="t-node value" @click="showChild(false)" v-if="!hasChild" data-haschild="false">{{tnode.value}}</h2>
    
  </li>
</template>

<script>
  export default {
    name: 'Node',
    props: {
      tnode: Object
    },
    computed: {
      hasChild() {
        return this.tnode.children.length > 0 ? true : false
      }
    },
    data(){
      return{
        show:true
      }
    },
    methods:{
      showChild(hasChild){
        console.log(hasChild);
        this.show = !this.show
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    opacity: 0;
  }
  ul.show{
    opacity: 1;
  }
  ul li {
    margin: 5px 10px;
  }
  h2 {
    cursor: pointer;
    border: 1px solid #ddd;
    text-align: center;
    margin: 5px 0;
    font-size: 14px;
    background: #999;
  }
  h2:hover{
    opacity: 0.9;
  }
  h2.value{
    background: #fff;
  }
</style>