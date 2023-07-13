<template>
  <div class="app">
    <div class="person" v-for="person in people" :key="person.id">
      <div class="person-image">
        <img :src="require(`@/assets/${person.image}`)" :alt="person.name" />
      </div>
      <div class="person-content">
        <h2>{{ person.name }}</h2>
        <p>{{ person.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      people: [
        {
          id: 1,
          name: 'John Doe',
          description: 'Share the amazing things customers are saying about your business. Double click, or click Edit Text to make it yours.',
          image: 'img1.jpg',
        },
        {
          id: 2,
          name: 'Jane Smith',
          description:'Share the amazing things customers are saying about your business. Double click, or click Edit Text to make it yours.',
          image: 'img2.jpg',
        },
        {
          id: 2,
          name: 'Jane Smith',
          description: 'Share the amazing things customers are saying about your business. Double click, or click Edit Text to make it yours.',
          image: 'img2.jpg',
        },
        {
          id: 2,
          name: 'Jane Smith',
          description: 'Share the amazing things customers are saying about your business. Double click, or click Edit Text to make it yours.',
          image: 'img2.jpg',
        },
        // Add more person objects as needed
      ],
    };
  },
};
</script>

<style scoped>
.app{
  background-color: rgb(24, 23, 23);
  display: flex;
 
}
body{
  background-color: antiquewhite;
}
.person {
  display: inline-grid;
  /* align-items: center; */
  margin-bottom: 1em;
}

.person-image img {
  width: 70%;
  height: 70%;
  border-radius: 50%;
  margin-top: 5em;
}

.person-content {
  margin-left: 1em;
  color: aliceblue;
  padding:6em;
}

</style>
