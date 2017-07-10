<template>
	<div class="foo">
		<h1>{{ msg }}</h1>
		<button @click="fetchData">Get Data</button>
		<h2>{{artist}}</h2>
    <h3>{{subTitle}}</h3>
    <ul>
      <li v-for="item in albums">{{item.year}}-{{item.name}}</li>
    </ul>
	</div>
</template>

<script>
  import axios from 'axios';
  import SubTitle from './sub_title';

  const apiUrl = 'ttb.json';

export default {
  name: 'discography',
  data() {
    return {
      msg: 'avoriaz-mocha-webpack-vuejs',
      artist: 'TTB',
      subTitle: SubTitle(),
      albums : []
    };
  },
  methods: {
    fetchData() {
      return axios.get( apiUrl ,{
        timeout: 15000
      })
        .then((response) => {

          this.albums = response.data.records;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }
};
</script>
