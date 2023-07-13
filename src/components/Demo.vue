<template>
    <h1>Helllllo</h1>
    <input type="file" @change="previewFile" />
<img v-if="filePreview" :src="filePreview" alt="Preview" />

</template>
<script>
export default {
    data() {
      return {
        filePreview: null,
      };
    },
    methods: {
      previewFile(event) {
        const file = event.target.files[0];
  
        if (file && file.type.match(/^image\//)) {
          const reader = new FileReader();
  
          reader.onload = () => {
            this.filePreview = reader.result;
          };
  
          reader.readAsDataURL(file);
        } else {
          this.filePreview = null;
        }
      },
    },
  };
</script>
  