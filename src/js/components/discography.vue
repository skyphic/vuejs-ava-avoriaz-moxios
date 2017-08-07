<template>
	<div class="foo">
		<h1>{{ msg }}</h1>
		<button @click="buttonClick">Get Data</button>
		<h2>{{artist}}</h2>
		<h3>{{subTitle}}</h3>
		<p>{{catchText}}</p>
    <ul>
      <li v-for="item in albums">{{item.year}}-{{item.name}}</li>
    </ul>
	</div>
</template>

<script>
  import axios from 'axios';
  import SubTitle from './sub_title';

  const apiUrl = 'ttb.json';
  const globalText = window.globalText;

export default {
  name: 'discography',
  data() {
    return {
      msg: 'ava-avoriaz-vuejs',
      artist: 'TTB',
      subTitle: SubTitle(),
      catchText: globalText,
      albums : []
    };
  },
  mounted () {
    document.querySelector('#btn-to-top').className = "hide";

  },
  methods: {
    fetchData() {
      return axios.get( apiUrl ,{
        timeout: 15000
      })
        .then((response) => {

          return response.data.records;
        })
        .catch(function () {
           return 'error';
        });
    },
    buttonClick() {
      this.albums = this.fetchData();
    }
  }
};
</script>
