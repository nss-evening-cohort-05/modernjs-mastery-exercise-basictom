$(document).ready(function(){

  $(".btn").click((event) => {
     console.log($(event.currentTarget));
     $(".body-image").hide("fast");
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
      // console.log("super wo;gihwerih", superHeros[2].teams);
      // console.log("super wo;gihwerih", superHeros[0].characters);
      let characters = superHeros[0].characters;
      console.log(characters);
      let genders = superHeros[1].genders;
      let teams = superHeros[2].teams;

      // for(let i=0;)

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
    const charId = characters["team_id"];
    const teamId = charId.indexOf(team.id);
    if (teamID === -1){
      return false;
    }else{
      return true;
    }
  }

  const checkGendId = (hero, gend) => {
    const charId = characters["gender_id"];
    const gendId = charId.indexOf(genders.type);
    if (gendId === -1){
      return false;
    }else{
      return true;
    }
  }
  const writeDom = () => {
    dataGetter();
    console.log("super", superHeros);
    let domString = "";
    console.log("domstring", domString);
    for(var i=0;i<superHeros.length;i++){
      console.log(superHeros[i]);
      // domString += `<div class="col-md-6>"`;
      // domString += `<div class="superhero">`;
      // domString += `<p>${superHeros[i].characters[i].name}</p>`;
      // domString += `</div></div>`;
    }
    $(".cards").append(domString);
    console.log("domstring", domString);
  }







});
