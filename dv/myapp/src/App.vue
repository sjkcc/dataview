<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
blockquote,body,button,dd,dl,dt,fieldset,form,h1,h2,h3,h4,h5,h6,hr,input,legend,li,ol,p,pre,td,textarea,th,ul{margin:0;padding:0;}
ol,ul{list-style:none;}
html, body {
  width:100%;
  height:100%;
  min-width:1200px;
  min-height:600px;
  overflow:hidden;
}
body {
  position:relative;
  background:#050d3c url("../src/assets/img/bg.png") 0 0 / 100% 100% no-repeat;
}
a{text-decoration:none;}
input{outline:none;border:none;}
#app {
  font-family:  'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center;
  color: #2c3e50; */
}
</style>
