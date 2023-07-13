<template>
  <div id="login">
        <h1>Login</h1>
       
        <p>Sign up to be the  first to know about our cool analysis </p>
            <!-- <input type="text" name="name" v-model="input.name" placeholder="Name" /><hr> -->
            
            <input type="email" name="email" v-model="input.email" placeholder="Enter your email here" style="font-size: 1em; height: 17%; width: 80%;" />
            <!-- <div>Department: </div> -->
          
      
            <!-- <select v-model="input.department">
              <option>RD/ICC</option>
              <option>RD/ICI</option>
              <option>RD/ICA</option>
            </select><hr> -->
            <button type="submit" class="btn btn-success" value="submit" v-on:click="login"><router-link :to="{name:'about'}" style="text-decoration: none; color: inherit;">Notify Me</router-link></button>
            <p>Thanks for submitting!</p>
    
      </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'login',
        data()
         {
            return {
                input: {
                    // name: "",
                    email: "",
                    // department: ""
                }
            }
        },
        methods: {
          async login()
          {
            let result = await axios.post("http://localhost:3000/users",{
              // name:this.input.name,
              email:this.input.email,
              // department:this.input.department 
            }
            );

            if(result.status==201)
            {
                if(this.input.email)
              // if(this.input.name && this.input.email && this.input.department)
                  {
                if (this.validEmail(this.input.email))
                  {
                    localStorage.setItem("user-info",JSON.stringify(result.data))
                    this.$router.push({name:"about"})
                  }
                  else{
                    alert("invalid email")
                    this.$router.push({name:"home"})
                  }

                  }
            }
            this.error=[];
            // if(!this.input.name){
            //   alert("Name required");
            //   this.$router.push({name:"home"})
            // }
            if(!this.input.email){
              alert("Email required");
              this.$router.push({name:"home"})
            }
            // if(!this.input.department){
            //   alert("Department required");
            //   this.$router.push({name:"home"})
            // }
          },
          validEmail: function(email){
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
    }
  },
      mounted()
      {
        let user= localStorage.getItem('user-info');
        if(user)
        {
          this.$router.push({name:'about'})
        }
      }

    }


</script>

<style>
#login {
        width: 800px;
        /* border: 1px solid #1d1b1b; */
        /* background-color:whitesmoke; */
        margin: auto;
        margin-top: 20px;
        padding: 20px;
        float: center;
        height: 250px;
        opacity: 150%;
    }
    #login h1{
      color: rgb(237, 239, 239);
      font-size: 4em;
      text-align: center;
    }
    #login p{
      font-size: 15px;
      color: white;
    }
    .btn{
      background-color: rgb(119, 228, 100);
      font-size: 20px;
      margin: 10px;
      height: 17%;
      margin-top: 0px;
    }
    

</style>