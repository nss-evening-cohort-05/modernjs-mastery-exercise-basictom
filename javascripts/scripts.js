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
    console.log(char);
    let dom = "";
    for(i=0;i<char.length;i++){
      if(team === char[i].team_id){
        if(i%3===0){
          dom += `<div class="row">`;
        }
        dom += `<div class="col-xs-3 text-center">`;
        dom += `<div class="hero-container">`;
        dom += `<h3>${char[i].name}</h3>`;
        dom += `<section><img class="hero-image hero-${char[i].gender_id}" src="${char[i].image}"></section>`;
        dom += `<p class="text-left">${char[i].description}</p>`;
        dom += `</div>`;
        dom += `</div>`;
        if(i%3===2){
          dom += `</div>`;
        }
      }
    }
    $('.cards').html(dom);
  }

  let genderMatch = (char) => {
    // console.log(char[0].gender_id);
    for(x=0;x<char.length;x++){
      if(char[x].gender_id === 0){
        // console.log("females",);
        $('.hero-0').addClass('pink-border');
      }else{
        // console.log("males", char[x].gender_id === 1);
        $('.hero-1').addClass('blue-border');
      }
    }
  }


    let dataGetter = (c) => {Promise.all([loadChar(), loadTeams(), loadGend()])
    .then((results) => {
      results.forEach((xhrResult) => {
        superHeros.push(xhrResult);
      });
      let characters = superHeros[0];
      let teams = superHeros[1];
      let gender = superHeros[2];

      for(let i=0;i<characters.length;i++){
        for(let k=0;k<teams.length;k++){
          for(let t=0;t<gender.length;t++){
            if(characters[i].team_id === teams[k].id) {
              characters[i].team = teams[k].name;
            }

            if(characters[i].gender_id === gender[t].id){
              characters[i].gender = gender[t].type;
            }

            if(characters[i].description.length < 1){
              if(characters[i].gender === 'Male'){
                characters[i].description = "1234567890";
                // $('.hero-image').addClass('blue-border');
              }else{
                characters[i].description = "abcdef ghijklm nop qrstu vwxyz";
              }
            }
          }
        }

      }
      writeDom(characters, c);
      genderMatch(characters);
    }).catch((error) => {
      console.log("Your promise is failing", error);
    });
  };

});
