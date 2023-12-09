<template>
  <layout-no-menu>
    <ion-page class="ion-page" main>
      <ion-content>
        <div style="background-color:#3880ff;color:#FFFFFF;">
          <ion-img slot="" style="height: 100px" src="./images/trophyflat.png"></ion-img>

          <h1 class="title">Bracket JD</h1>

        </div>
        <div style="padding: 20px; max-width: 600px; margin: 0 auto;">
          <h1>Welcome to Bracket JD</h1>
          <div>
            <p>
              Play live tournaments online. Find an upcoming tournament and
              register to play. The tournaments are hosted live by the
              community. Hosts utilize a live video stream to answer
              questions, create rounds, and entertain the players.
            </p>
          </div>

          <div class="searchBox">
            <h2>Find Tournament</h2>
            <div style=" display: flex;">
              <input type="text" placeholder="Search.." class="searchText" v-model="searchQuery" />
              <input type="submit" value="Search" class="searchButton" v-on:click="search()" />
            </div>
            <p>
              <a href="Tournaments/all">All</a> |
              <a href="Tournaments/chess">Chess</a> |
              <a href="Tournaments/cribbage">Cribbage</a> |
              <a href="Tournaments/ginrummy">Gin Rummy</a>
            </p>

          </div>

          <div class="quoteBox">
            <div>
              <h2>How to play</h2>
              <ol>
                <li>Click on <a href="Login">Login / Sign up</a> and create an
                  account (FREE)</li>
                <li>Find a tournament</li>
                <li>Registrater for a tournament</li>
                <li>Read the tournament's FAQ/Rules</li>
                <li>Be on the tournament page when it starts</li>
                <li>These tournaments are FUN and CASUAL!</li>
              </ol>
            </div>
          </div>

          <footer>
            <p>
              <a href="https://bracketjd.com">Bracket JD</a> |
              <a href="mailto:tournament@jdsoftwarellc.com">Contact</a> | <a href="">version 1.0.0</a>
       
            </p>
          </footer>
        </div>
      </ion-content>
    </ion-page>
  </layout-no-menu>
</template>
<style>
.title {
  margin: 0;
  padding: 0;
  font-size: 30px;
  font-weight: 400;
  line-height: 1.2;
  color: #FFFFFF;
  text-align: center;
  padding-bottom: 10px;
}

.searchBox {
  margin: 30px 0;
}

.searchText {
  flex-grow: 1;
  border-radius: 3px;
  margin: 0 5px 0 0px;
  padding: 5px 5px;
  transition: box-shadow 0.2s linear;
  border: 0;
  box-shadow: 0 1px 3px 0 rgba(35, 40, 43, 0.2), 0 1px 3px 0 rgba(0, 0, 0, 0.3), inset 0 0 0 1px #C3CACE;
}

.searchButton {
  background-color: rgb(56, 128, 255);
  border: 1px solid rgb(56, 128, 255);
  color: #FFFFFF;
  border-radius: 3px;
  box-shadow: 0 4px 6px 1px rgba(35, 40, 43, 0.2), 0 1px 3px 0 rgba(35, 40, 43, 0.3);
  padding: 5px 10px
}

.quoteBox {
  margin: 30px 0;
  background-color: #f7f7f7;
  border-radius: 3px;
  padding: 5px 20px 10px 20px;
}
footer{
  margin-top: 30px;
  text-align: center;
}
</style>
<script>
// @ is an alias to /src
export default {
  name: "home",
  components: {},
  data() {
    return {
      searchQuery: ""
    };
  },
  methods: {
    search() {
      const searchQuery = this.searchQuery;
      this.$router.push({ name: "Tournaments", params: { type: "all", searchQuery: searchQuery } });
    },
    login() {
      this.$router.push({ name: "Login" });
    },
    userDetails() {
      this.$router.push({ name: "User" });
    },
    tournamentsPage(type) {
      if (!type) type = "all";
      this.$router.push({ name: "Tournaments" });
    },

  },
  created() {

  },

};
</script>
