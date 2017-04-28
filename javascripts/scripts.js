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

  const checkIdMatch = (hero, team) => {
    console.log(hero);
    const heroArray = hero["id"];
    console.log(heroArray);
    console.log(team.id);
    const teamId = heroArray.indexOf(team.id);
    if (teamId === -1){
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




    Promise.all([loadChar(), loadTeams(), loadGend()])
    .then((results) => {
      // console.log(results);
      results.forEach((xhrResult) => {
        superHeros.push(xhrResult);
      });
      console.log(superHeros);
      let characters = superHeros[0].characters;
      console.log("character array", characters);
      let teams = superHeros[1].teams;
      console.log("teams array", teams);
      // let gender = superHeros[2].genders;

      for(let i=0;i<characters.length;i++){
        console.log("hello loop", characters[i]);
        for(let k=0;k<teams.length;k++){
          console.log("hello loop", teams[k]);
          if(checkIdMatch(characters[i].team_id, teams[k].id)) {
            console.log("hitting if statement");
            superHeros[i].matches.push(superHeros[i]);
            console.log(superHeros[i]);
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





});
