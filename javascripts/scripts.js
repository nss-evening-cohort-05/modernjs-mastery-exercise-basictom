$(document).ready(function(){

  $('#xmen').click(() => {
    $(".body-image").hide("slow");
    let xmen = 0;
    dataGetter(xmen);
  });
  $('#avengers').click(() => {
    $(".body-image").hide("slow");
    let avengers = 1;
    dataGetter(avengers);
  });
  $('#gaurdians').click(() => {
    $(".body-image").hide("slow");
    let gaurdians = 2;
    dataGetter(gaurdians);
  });

// PROMISES ==========================

  let superHeros = [];

  // Loading all three json files
  const loadChar = () => {
    return new Promise((resolve, reject) => {
      $.ajax("./db/characters.json")
      .done((data) => {
        let char = data.characters;
        resolve(char)})
      .fail((error) => reject(error));
    });
  };

  const loadGend = () => {
    return new Promise((resolve, reject) => {
      $.ajax("./db/genders.json")
      .done((data) => {
        let gend = data.genders;
        resolve(gend)})
      .fail((error) => reject(error));
    });
  };

  const loadTeams = () => {
    return new Promise((resolve, reject) => {
      $.ajax("./db/teams.json")
      .done((data) => {
        let teams = data.teams;
        resolve(teams)})
      .fail((error) => reject(error));
    });
  };

  const writeDom = (char, team) => {
    let dom = "";
    console.log(team);
    console.log(char);
    for(i=0;i<char.length;i++){
      console.log(team);
      if(team === char[i].team_id){
        dom += `<div class="col-xs-4 hero-container">`;
        dom += `<h3>${char[i].name}</h3>`;
        dom += `<section><img class="hero-image" src="${char[i].image}"></section>`;
        dom += `<p class="text-left">${char[i].description}</p>`;
        dom += `</div>`;
      }else{
        console.log("nothing");
      }
    }
    $('.cards').html(dom);
  }


    let dataGetter = (c) => {Promise.all([loadChar(), loadTeams(), loadGend()])
    .then((results) => {
      results.forEach((xhrResult) => {
        superHeros.push(xhrResult);
      });
      console.log(results)
      let characters = superHeros[0];
      let teams = superHeros[1];
      let gender = superHeros[2];

      for(let i=0;i<characters.length;i++){
        for(let k=0;k<teams.length;k++){
          if((characters.id === teams.id)) {
            characters.team_id == teams.name;
            // console.log(characters);
          }else{
            alert("hey bone head");
          }
        }
      }

      writeDom(characters, c);
      // console.log("datagetter c", c);

      // if(c === "xmen"){
      //   // console.log("hitting xmen", c);
      //   // console.log(characters);
      //   writeDom(characters);
      //   // let xmen = characters[0].team_id;
      //   console.log(xmen);
      // }else if(c === "avengers"){
      //   console.log("hitting avengers", c);
      // }else{
      //   console.log("hitting gaurdians", c);
      // }
      // writeXmen(characters);
      // writeAvengers(characters);
      // writeGaurd(characters);
    }).catch((error) => {
      alert("Your promise is failing", error);
    });
  };

});
