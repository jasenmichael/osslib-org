<template>
<div class="">
  <hr>
  <p class="btn-sm login" v-on:click="toggle" v-if="!admin">Admin Login</p>
  <p class="btn-sm login" v-on:click="logout" v-if="admin">Admin Logout</p>

  <div class="modal" v-bind:class="{ in: show }" v-bind:style="showStyle">

    <div class="modal-body" id="login">
      <p  v-if="admin">logging in...</p>
      <div id="loading" v-if="admin"></div>

      <div v-if="!admin">
        <button type="button" class="close" v-on:click="toggle"><span>×</span></button>
        <br>
        <h1 class="text-center">Admin Login</h1>
        <form @submit.prevent="login">
            <input type="text" name="user" placeholder="Username">
            <input type="password" name="pass" placeholder="Password">
            <input type="submit" name="login" class="loginmodal-submit" value="Login">
            <p v-if="error" class="error text-danger">Bad login information</p>
        </form>
      </div>

    </div>

  </div>

</div>
</template>

<script>
export default {
  name: 'adminComponent',
  props: [
    'setAdmin',
    'admin'
  ],
  data () {
    return {
      // admin: false,
      show: false,
      error: false
    }
  },
  methods: {
    toggle () {
      this.show = !this.show
    },
    login () {
      this.setAdmin()
      setTimeout(() => {
        this.toggle()
      }, 1800)
    },
    logout () {
      this.setAdmin()
    }
  },
  computed: {
    showStyle () {
      if (this.show) {
        return { display: 'block' }
      } else {
        return {}
      }
    }
  }
}
</script>

<style scoped>
@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
@import url('https://fonts.googleapis.com/css?family=Righteous|Roboto:400i,500');

.login {
  text-align: center;
  font-family: 'Roboto', sans-serif;
}

.login:hover {
  cursor: pointer;
  border: 1px solid #3079ed;
}

/****** LOGIN MODAL ******/
.modal-body {
  padding: 3rem 6rem;
  max-width: 480px;
  width: 100% !important;
  background-color: #f3f3f3;  /*F7F7F7*/
  margin: 2em auto;
  border-radius: 2px;
  -webkit-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158), 0px 2px 2px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158), 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 5px 7px 9px -4px rgb(158, 158, 158), 0px 2px 2px rgba(0, 0, 0, 0.3);
  overflow: hidden;
}

.loginmodal-container input[type=submit] {
  width: 100%;
  display: block;
  margin-bottom: 10px;
  position: relative;
}

.modal-body input[type=text], input[type=password] {
  height: 44px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  -webkit-appearance: none;
  background: #fff;
  border: 1px solid #d9d9d9;
  border-top: 1px solid #c0c0c0;
  padding: 0 8px;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.modal-body input[type=text]:hover, input[type=password]:hover {
  border: 1px solid #b9b9b9;
  border-top: 1px solid #a0a0a0;
  -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.modal-body h1 {
  font-family: 'Righteous', cursive;
  color: #008cba;
  text-shadow:  0px 2px 2px rgba(0, 0, 0, 0.5), 0px 0 rgba(0, 0, 0, 0.2), 0 .1px rgba(0, 0, 0, 0.2), .1px 0 rgba(0, 0, 0, 0.2), 0 0px rgba(0, 0, 0, 0.2);

}

.loginmodal {
  text-align: center;
  font-size: 14px;
  font-family: 'Righteous', cursive;
  font-weight: 700;
  height: 36px;
  padding: 0 8px;
  border-radius: 3px;
}

.loginmodal-submit {
  border: .5px outset #008cba;
  color: #008cba;
  border-radius: 4px;
  text-shadow: 0 .5px rgba(0,0,0,0.6);
  background-color: #a6ce3a;
  width: 100%;
  padding: 1em;
  font-family: 'Righteous', cursive;
  font-size: 14px;
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.loginmodal-submit:hover {
  -webkit-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158), 0px 2px 2px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158), 0px 2px 2px rgba(0, 0, 0, 0.6);
  box-shadow: 5px 7px 9px -4px rgb(158, 158, 158), 0px 2px 2px rgba(0, 0, 0, 0.6);
}

/*  now loading section - frickin' sweet! */
#loading {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #a6ce3a;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin .8s linear infinite;
  margin-left: calc(50% - 30px);
  display: inline-block;
  margin-top: 10px;
}

/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
