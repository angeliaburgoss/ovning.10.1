
//retrives the html button with id="printBtn" and stores it in the variable element
const element = document.getElementById('printBtn');
//adds event listenet to the element. listens for the click event to run the getApi function
element.addEventListener("click", getApi);


//defines the getApi function (that is run when button printBtn is clicked)
//retrives value from the user through the input field. the trim method removes any whitespace
function getApi() {
    const userInput = document.getElementById('input').value.trim();

    //checks if the userInput is an empty string, if empty the message is logged to user
    if (userInput === '') {
        console.log('Enter a valid character name');
        return;
    } else {
        // const apiUrl = `https://www.swapi.tech/api/people/?name=${encodeURIComponent(userInput)}`;
      //  console.log(`https://www.swapi.tech/api/people/?name=${userInput}`)

      //initalizes network request to the Star Wars API. uses the userInput to ask the API for information about a certain character
        fetch(`https://www.swapi.tech/api/people/?name=${userInput}`)

        //converts respons from API to json format.
            .then(res => res.json())
        
        //handles json data from API and checks if respons is ok and if there is any matching data.
            .then(data => 
            {
                if (data.message == "ok" && data.result.length > 0){
                    //console.log(data)
                    //if matching data excists, properties of first character is extracted
                    const character = data.result[0].properties;
                    //test it something is outputed
                    console.log("test", character)
                    //retrives textArea element from html with id output
                    const resultTextArea = document.getElementById('output');
                    //updates value of textArea
                    //displays information about character through a string with `` 
                    // displays character name, gender, height, mass, eye-color, hair-color
                    resultTextArea.value = `Name: ${character.name}\n` +
                                            `Gender: ${character.gender}\n` +
                                            `Height: ${character.height} cm\n` +
                                            `Mass: ${character.mass} kg\n` +
                                            `Eye-Color: ${character.eye_color}\n` +
                                            `Hair-Color: ${character.hair_color}\n`
                } else {
                    throw new Error('Data could not be found for character input');
                }
            })
            .catch(err => 
                console.error(err))
        
    }

}