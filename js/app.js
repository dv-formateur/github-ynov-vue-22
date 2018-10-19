var app = new Vue({ 
    el: '#app',
    data: {
        nameprojects:["github-ynov-vue"],
        projects:[],
        users:[],
        tabProjects:[],
    },
    method:{
        
    },
    mounted(){
        fetch("https://api.github.com/search/repositories?q=github-ynov-vue",{
            headers: {
                "Authorization": "Basic cnVkeTg1MzA6QXUhMDIyODEwNTgyNA=="
              },
            method: "GET"
        })
            .then(response =>response.json())
            .then((data) => {
                this.projects = data.items
                this.projects.forEach((projet)=>{
                    //Les commits,
                    var monProjet = new Object();
                    monProjet.login=projet.owner.login
                    monProjet.url = projet.owner.url
                    monProjet.nomProjet = projet.name
                    fetch("https://api.github.com/repos/"+projet.full_name+"/commits",{
                        headers: {
                            "Authorization": ""
                          },
                        method: "GET"
                    })
                        .then(response =>response.json())
                        .then((data)=>{
                            var arrayCommits=[];
                            data.forEach((response)=>{
                                // var monCommit= new Object();
                                // monCommit.message = response.commit.message
                                arrayCommits.push(response.commit.message)
                            })
                            monProjet.myCommits=arrayCommits
                        })
                        this.tabProjects.push(monProjet)
                })
                console.log(this.tabProjects)
            })
    }
});