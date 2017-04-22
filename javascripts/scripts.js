$(document).ready(function(){

  $(".btn").click((event) => {
     console.log($(event.currentTarget));
    //  $(".body-image").hide("fast");
     writeDom();
   });



// PROMISES ==========================

  let superHeros = [];

  // Loading all three json files
  const loadChar = () => {
    return new Promise((resolve, reject) => {
      $.ajax("./db/characters.json")
      .done((data) => resolve(data))
      .fail((error) => reject(error));
    });
  };

  const loadGend = () => {
    return new Promise((resolve, reject) => {
      $.ajax("./db/genders.json")
      .done((data) => resolve(data))
      .fail((error) => reject(error));
    });
  };

  const loadTeams = () => {
    return new Promise((resolve, reject) => {
      $.ajax("./db/teams.json")
      .done((data) => resolve(data))
      .fail((error) => reject(error));
    });
  };

  const dataGetter = () => {

    Promise.all([loadChar(), loadTeams(), loadGend()])
    .then((results) => {
      // console.log(results);
      results.forEach((xhrResult) => {
        superHeros.push(xhrResult);
      });
      let characters = superHeros[0].characters;
      let teams = superHeros[1].teams;
      let gender = superHeros[2].genders;
      console.log(characters, teams, gender);
      for(let i=0;i<characters.length;i++){
        for(let k=0;k<teams.length;i++){
          if(checkIdMatch(characters[i].team_id, teams[i].id)) {
            characters[i].matches.push(superHeros[i]);
          }
        }

      }

      //  && checkGendId(superHeros[i].characters[i], superHeros[i].genders[i])

    });

      // for (let i = 0; i < myHumans.length; i++) {
      //   for (let j = 0; j < myAnimals.length; j++) {
      //     if (checkForTypeMatch(myHumans[i], myAnimals[j]) && checkForKidFriendly(myHumans[i], myAnimals[j])) {
      //       myHumans[i].matches.push(myAnimals[j]);
      //     }
      //   }
      // }

      // writeToDOM(myHumans);
  //   })
  //   .catch((animalErrors) => console.log(animalErrors));
  // })
  // .catch((humanError) => console.log(humanError));
  }
  const checkIdMatch = (hero, team) => {
    const charId = hero["team_id"];
    const teamId = charId.indexOf(teams.id);
    if (teamID === -1){
      return false;
    }else{
      return true;
    }
  }

  const checkGendId = (hero, gend) => {
    const charId = hero["gender_id"];
    const gendId = charId.indexOf(gend.type);
    if (gendId === -1){
      return false;
    }else{
      return true;
    }
  }
  const writeDom = () => {
    dataGetter();
    $(".cards").html(superHeros);
    console.log("super", superHeros);
  }







});
