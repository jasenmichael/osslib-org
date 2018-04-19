<template>
<div>

<navbarComponent></navbarComponent>

  <div id="software">
    <div class="container-fluid">

        <div class="loading" v-if="!softwareLoaded">
        </div>

        <form class="form-inline my-2 my-lg-0 justify-content-center">
          <input class="form-control mr-sm-2" placeholder="Search" type="text" v-model="search">
        </form>

        <transition-group name="trans" class="row mt-3">

        <div class="equal col-xs-6 col-sm-6 col-md-4 col-lg-4 col-xl-3" v-for="software in filteredSoftware" :key="software.id">

          <div class="card">
            <div class="card-block">
              <div class="text-center card-header">{{software.name}}</div>

                <div class="mr-6 row-xs-12 row-md-4">
                  <img class="img-fluid icon"  :src="software.icon">
                </div>

                <div class="card-text row-sm-12 row-xs-12 row-md-7 ">
                  <p>{{software.description}}</p>
                </div>

            </div>

            <div class="software-middle">
              <hr>
              <h6>Supported Operating Systems:</h6>
              <div class="platform-icons main-os-icons">
                <i class="icon" v-for="os in parseObStr(software.os)" :class="os" :key="os"></i>
              </div>
              <hr>
              <h6>Categories:</h6>
              <p class="categories">
                <i v-for="categories in parseObStr(software.categories)" :key="categories">
                  <span class="categories badge badge-pill badge-info">{{ categories }} </span>
                </i>
              </p>

            </div>

            <div class="software-bottom">
              <hr>
              <a target="_blank" :href="software.url" title="software homepage" class="card-link badge badge-pill badge-secondary">{{ software.name }} Homepage</a>

              <div>
                <button title="edit information" class="info badge badge-pill badge-success" v-on:click="(showInfo = !showInfo) && (selected = filteredSoftware.findIndex(obj => obj.id == software.id))" v-if="admin">Edit</button>
                <button title="delete" class="info badge badge-pill badge-success" v-on:click="deleteApp(software.id)" v-if="admin">Delete</button>
              </div>

            </div>

          </div>
        </div>

      </transition-group>

      <!--  none found -->
      <transition name="trans">
        <div v-if="(filteredSoftware.length === 0) && (softwareLoaded)" class="text-center">
          <div class="not card">
            <span class="mx-auto">No results matching "{{ search }}"</span>
          </div>
        </div>
      </transition>

      <!-- admin modal -->
      <transition name="trans">
        <div class="modal center container" v-if="showInfo" v-bind:style="showStyle">

            <div class="modal-content">

              <div class="modal-header">
                <button type="button" class="close" v-on:click="showInfo = !showInfo">
                  <span class="">X</span>
                </button>
              </div>

              <div class="modal-body">
                <div class="form-group">

                  <!-- icon -->
                  <img class="img-fluid info-icon" :src="editSoftware.icon">
                  <hr>

                  <p>Icon:</p>
                  <input class="form-control" id="inputIcon" type="text"  v-model="editSoftware.icon">
                  <hr>

                  <!-- name -->
                  <p>Name:</p>
                  <input class="form-control" v-model="editSoftware.name" id="inputName" type="text">
                  <hr>

                  <!-- description -->
                  <p>Description:</p>
                  <textarea class="form-control" rows="3" v-model="editSoftware.description" id="inputDescription" type="text"></textarea>
                  <hr>

                  <!-- os section -->
                  <p>Operating Systems Supported:</p>
                  <ul class="list-inline" v-for="os in osList" :key="os">
                    <li>
                      <div class="form-check">
                        <label>
                          <input value="os" :checked="editSoftware.os.includes(os)" type="checkbox">
                          {{os}}
                        </label>
                      </div>
                    </li>
                  </ul>
                  <hr>

                  <p>Categories: <small class="text-muted">comma seperated</small></p>
                  <!-- eslint-disable-next-line -->
                  <textarea class="form-control" rows="1">{{parseObStr(editSoftware.categories).join().replace(/,/g, ", ")}}</textarea>
                  <hr>

                  <p>Homepage Url:</p>
                  <input class="form-control" :value="editSoftware.url" id="inputUrl" type="text">

                </div>

                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" v-on:click="saveApp(editSoftware)">Save changes</button>
                  <button type="button" class="btn btn-secondary" v-on:click="showInfo = !showInfo">Close</button>
                </div>
              </div>
            </div>

        </div>

    </transition>
    <div id="overlay" v-if="showInfo" v-on:click="showInfo = !showInfo"></div>
    <!-- end admin modal -->

    </div>
  </div>

  <!-- <img src="https://cdn3.iconfinder.com/data/icons/faticons/32/arrow-up-01-128.png" alt=""> -->

<footerComponent :admin="admin" :setAdmin="setAdmin"></footerComponent>

<button title="Back to top" class="scroll" v-on:click="scrollTop">
  <i class="arrow-up"></i>
  <!-- fa fa-chevron-up -->
</button>

</div>
</template>

<script>
import navbarComponent from '@/components/navbarComponent'
import footerComponent from '@/components/footerComponent'

export default {
  name: 'softwarePageComponent',
  components: {
    navbarComponent,
    footerComponent
  },
  props: [
    'setAdmin',
    'admin'
  ],
  data () {
    return {
      // apiUrl: 'http://localhost:3000/software',
      apiUrl: 'https://osslib.herokuapp.com/software',
      softwareList: [],
      search: '',
      filterList: [],
      softwareLoaded: false,
      showInfo: false,
      selected: '',
      editSoftware: {},
      osList: [
        'windows',
        'linux',
        'osx',
        'android',
        'ios'
      ]
    }
  },
  created () {
    this.getSoftware()
  },
  methods: {
    getSoftware () {
      fetch(this.apiUrl).then(response => {
        return response.json()
      }).then(data => {
        this.softwareList = data.software
        this.softwareLoaded = true
      })
    },
    parseObStr (obStr) {
      return obStr.replace(/{"|"}/g, '').split('","')
    },
    parseStrToOb (arrToOb) {
      return `{"${arrToOb.toString().replace(/,/g, '","')}"}`
    },
    deleteApp (deleteId) {
      fetch(this.apiUrl + '/' + deleteId, {
        // method: 'DELETE'
      }).then(response => {
        return response.json()
      }).then(data => {
        // eslint-disable-next-line
        // if (data.deleted) {
        if (true) {
          let index = this.softwareList.findIndex((o) => {
            return o.id === deleteId
          })
          if (index !== -1) this.softwareList.splice(index, 1)
        }
      })
    },
    saveApp (app) {
      // console.log(app.id)
      fetch(this.apiUrl + '/' + app.id, {
        method: 'PUT',
        body: JSON.stringify(app),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(response => {
        return response.json()
      }).then(data => {
        // eslint-disable-next-line
        let index = this.softwareList.findIndex((o) => {
          return o.id === app.id
        })
        location.reload()
        // console.log(data)
      })
    },
    scrollTop () {
      window.scrollTo(0, 0)
    }
  },
  computed: {
    filteredSoftware () {
      return this.softwareList.filter((app) => {
        // eslint-disable-next-line
        this.filterList =
          app.description.match(new RegExp(this.search, 'i')) ||
          app.name.match(new RegExp(this.search, 'i')) ||
          app.os.match(new RegExp(this.search, 'i')) ||
          app.categories.match(new RegExp(this.search, 'i'))
        return this.filterList
      })
    },
    showStyle () {
      if (this.showInfo) {
        let selected = this.filteredSoftware[this.selected]
        // eslint-disable-next-line
        this.editSoftware = {
          id: selected.id,
          name: selected.name,
          icon: selected.icon,
          description: selected.description,
          os: selected.os,
          categories: selected.categories,
          url: selected.url
        }
        return { display: 'block' }
      } else {
        // eslint-disable-next-line
        this.editSoftware = {}
        return {}
      }
    }
  }
}
</script>

<style scoped>

@import url('https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

body {
    overflow: hidden;
}

* {
  font-size: 101%;
  font-family: 'Roboto', sans-serif;
}

#software {
  /* margin-top: 80px; */
}

.software-bottom {
  margin-top: auto;
}

.software-middle {
  flex-grow: 1;
}

img.icon {
  min-width: 60px;
  max-width: 100px;
  float: left;
  padding: .8em;
}

img.info-logo {
  width: 900px;;
}

img.info-icon {
  width: 150px;
  margin-left: calc(50% - 75px);}

.list-inline {
  display: inline-block;
}

p.info-title, .description {
  font-size: 200%;
  margin-top: .5em;
}

form.form-inline {
  padding-top: 1em;
}

.categories {
    text-transform: capitalize;
    margin-left: .1em;
    margin-right: .1em;
    font-weight: 600;
    margin-bottom: .1em;
    text-shadow: 1px 1px 2px  rgb(158, 158, 158);
}

.equal {
  display: flex;
  display: -webkit-flex;
  flex-wrap: wrap;
}

.not {
  max-width: 600px;
  margin: auto;
  min-height: 175px;
  font-size: 120%;
}

.mx-auto {
  margin: auto;
}

.card-text {
  padding-top: 1em;
}

.card {
  padding: 1rem !important;
  border: 1px solid #a6ce3a;
  border-radius: 3px;
  margin-bottom: 1rem;
  -webkit-transition: .5s all ease;
  -moz-transition: .5s all ease;
  transition: .5s all ease;
}

.card-header {
  font-weight: bold;
  font-size: 110%;
  text-transform: uppercase;
  box-shadow: 1px 1px 2px  rgb(158, 158, 158);
}

.card:hover {
  -webkit-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
  -moz-box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
  box-shadow: 5px 7px 9px -4px rgb(158, 158, 158);
}

.info {
  /* margin-left: .2em; */
  font-weight: 400;
  border: none;
  color: inherit;
  background-color: #a6ce3a;
  cursor: pointer;
  margin-top: 1em;
}

.info:hover {
  box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.2);
}

.screenshot {
  /* max-width: 500px; */
  margin: auto;
}

.close-modal {
  float: right;
}

.card-link {
  font-weight: 400;
  margin-top: .8em;
}

/* platform icons sprite */
.platform-icons .icon {
 background:#fff url("../assets/platform-sprite.png") no-repeat;
 background-size:32px 608px
}
.platform-icons li:last-child {
 border-bottom:0
}
.icon.windows {
 background-position:8px 10px
}
.icon.windows:hover {
 background-position:8px -56px
}
.icon.osx {
 background-position:8px -118px
}
.icon.osx:hover {
 background-position:8px -184px
}
.icon.linux {
 background-position:8px -246px
}
.icon.linux:hover {
 background-position:8px -312px
}
.icon.android {
 background-position:8px -374px
}
.icon.android:hover {
 background-position:8px -440px
}
.icon.ios {
 background-position:8px -502px
}
.icon.ios:hover {
 background-position:8px -566px
}
i.icon {
 padding:24px;
 display:inline-block
}
.main-os-icons {
 text-align:center;
 padding-top:10px
}

/* transistions */
.trans-move {
  -webkit-transition: all 600ms ease-in-out 50ms;
  transition: all 600ms ease-in-out 50ms;
}
.trans-enter-active {
  -webkit-transition: all 300ms ease-out;
  transition: all 300ms ease-out;
}
.trans-leave-active {
  -webkit-transition: all 200ms ease-in;
  transition: all 200ms ease-in;
  position: absolute;
  z-index: 0;
}
.trans-enter, .trans-leave-to {
  opacity: 0;
}
.trans-enter {
  -webkit-transform: scale(0.6);
          transform: scale(0.6);
}

/*  now loading section - frickin' sweet! */
.loading {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #a6ce3a;
  width: 240px;
  height: 240px;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
  margin-left: calc(50% - 120px);
  display: inline-block;
  margin-top: 50px;
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

.modal {
  display: flex;
  width: 100vw;
  /* height: 100vh; */
  padding-right: 0px;
  top: 0;
  left: 0;
  min-width: 90%;
  margin-top: 10px;
  max-height: calc(100vh - 10px);
  overflow-y: auto;
  border-radius: 10px;
}

.info-categories {
    text-transform: capitalize;
    margin-left: 1em;
}

ul {
  list-style-type: none;
}

#overlay {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background:black;
  background:rgba(0,0,0,0.6);
  filter:blur(4px);
  -o-filter:blur(4px);
  -ms-filter:blur(4px);
  -moz-filter:blur(4px);
  -webkit-filter:blur(4px);
  z-index: 400;
  padding-left: 500px;
  height: 400%;
}

.scroll {
  opacity: 0.5;
  background-color: #008cba;
  width: 40px;
  height: 40px;
  position: fixed;
  bottom: 10px;
  right: 10px;
  border-radius: 5px;
  border: none;
}

.scroll:hover {
  opacity: .8;
}

.arrow-up {
  /* color: white;
  margin-top: -9px;
  font-weight: 400; */

  position: absolute;
  margin-left: -5px;
  top: 26%;
  left: 22%;

  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-bottom: 15px solid white;
}

</style>
