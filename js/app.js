var app = new Vue({
  el: "#app",
  data: {
    selectProject: "dfsdf",
    selectUser: "",
    datebegin: "",
    dateEnded: "",
    nameprojects: ["github-ynov-vue"],
    projects: [],
    users: [
      "mathiasLoiret",
      "Mokui",
      "etienneYnov",
      "gfourny",
      "mael61",
      "alixnzt",
      "mcourant",
      "raphaelCharre",
      "AlexDesvallees",
      "ClementCaillaud",
      "benjaminbra",
      "Nair0fl",
      "Killy85",
      "msaintmartin",
      "sfongue",
      "rudy8530",
      "Dakistos",
      "Coblestone",
      "BenoitCochet",
      "thomaspich",
      "TeofiloJ",
      "maximerolland",
      "LordInateur",
      "KevinPautonnier",
      "AntoineGOSSET"
    ],
    tabProjects: [],
    listAfterSearch: false,
    listTabInit: true
  },
  methods: {
    reinit: function() {
      //Récupère toutes les informations en fonction des noms de projet dans le tableau
      this.nameprojects.forEach(projet => {
        fetch("https://api.github.com/search/repositories?q=" + projet, {
          headers: {
            Authorization: "Basic cnVkeTg1MzA6QXUhMDIyODEwNTgyNA=="
          },
          method: "GET"
        })
          .then(response => response.json())
          .then(data => {
            this.projects = data.items;
            this.projects.forEach(projet => {
              //Les commits,
              var monProjet = new Object();
              monProjet.login = projet.owner.login;
              monProjet.url = projet.owner.html_url;
              monProjet.nomProjet = projet.name;
              monProjet.avatar = projet.owner.avatar_url;
              monProjet.tab = [];

              fetch(
                "https://api.github.com/repos/" + projet.full_name + "/commits",
                {
                  headers: {
                    Authorization: "Basic cnVkeTg1MzA6QXUhMDIyODEwNTgyNA=="
                  },
                  method: "GET"
                }
              )
                .then(response => response.json())
                .then(data => {
                  data.forEach(response => {
                    var monCommit = new Object();
                    var dateCommit = response.commit.author.date,
                      dateCommitNewFormat = moment(dateCommit).format(
                        "YYYY-MM-DD"
                      );
                    monCommit.message = response.commit.message;
                    monCommit.date = dateCommitNewFormat;
                    monProjet.tab.push(monCommit);
                  });
                });
              this.tabProjects.push(monProjet);
            });
          });
      });
      this.datebegin='2018-10-10'
      this.dateEnded='2018-10-26'
    },
    search: function() {
      var nameProject = this.selectProject;
      var nameUser = this.selectUser;
      var dateDebut = this.datebegin;
      var dateFin = this.dateEnded;
      this.tabProjects = [];
      fetch("https://api.github.com/search/repositories?q=" + nameProject, {
        headers: {
          Authorization: "Basic cnVkeTg1MzA6QXUhMDIyODEwNTgyNA=="
        },
        method: "GET"
      })
        .then(response => response.json())
        .then(data => {
          this.projects = data.items;
          this.projects.forEach(projet => {
            if (projet.owner.login == nameUser) {
              var monProjet = new Object();
              monProjet.login = projet.owner.login;
              monProjet.url = projet.owner.html_url;
              monProjet.nomProjet = projet.name;
              monProjet.avatar = projet.owner.avatar_url;
              monProjet.tab = [];
              fetch(
                "https://api.github.com/repos/" + projet.full_name + "/commits",
                {
                  headers: {
                    Authorization: "Basic cnVkeTg1MzA6QXUhMDIyODEwNTgyNA=="
                  },
                  method: "GET"
                }
              )
                .then(response => response.json())
                .then(data => {
                  var arrayCommits = [];
                  data.forEach(response => {
                    var monCommit = new Object();
                    var dateCommit = response.commit.author.date,
                      dateCommitNewFormat = moment(dateCommit).format(
                        "YYYY-MM-DD"
                      );
                    if (
                      dateCommitNewFormat >= dateDebut &&
                      dateCommitNewFormat <= dateFin
                    ) {
                      monCommit.message = response.commit.message;
                      monCommit.date = dateCommitNewFormat;
                      monProjet.tab.push(monCommit);
                    }
                  });
                });
              this.tabProjects.push(monProjet);
              this.listTabInit = false;
              this.listAfterSearch = true;
              return;
            }
          });
        });
    }
  },
  mounted() {
    this.reinit();
  }
});
