/* Step 1 - define dog types */

var canines = {
    activityLevel: ["struggle to sit still", "Or do you prefer hanging out around the house for the most part", "And give yourself a 3 if a six hr movie marathon is right up your alley!"],
    cleanFreak: ["Are you a clean-freak, Dust bunnies are your nemisis", "Give yourself a 2 if you are ok with day to day messes", "give yourself a 3 if messes mean your living...bring it!"],
    smartCanine: ["Would you like your canine friend to be super smart and help you with your taxes", "Smart, but not too smart", "would you rather it just be happy having you call the shots, take a 3"],
    securityDog: ["Do you want your dog to bark to alert you anything is amiss, give yourself a 1", "a bark every now an then when necessary, give yourself a 2", "Silence king in your home, give yourself a 3"],
    homeSize: ["Give yourself a 1 if you have an apartment or small home/no yard.", "2 if you have a decent size home with smallish yard", "Plenty of space and a yard for outdoor fun?! Give yourself a 3"],
    canineSize: ["give yourself a 1 if tiny is good", "a 2 if you might like picking up your dog every once in a while", "a 3 if a larger dog is fine by me"]
};

//use selections by user
var Order = function (orderValues) {
    this.activityLevel = orderValues[0];
    this.cleanFreak = orderValues[1];
    this.smartCanine = orderValues[2];
    this.securityDog = orderValues[3];
    this.canineSize = orderValues[4];
};

//determine type of canine
var Drink = function (pantry, drinkOrder) {
    var ingredientNumber = [];
    var ingredientsArray = [];

    for (var userPreference in drinkOrder) {
        //generate a random number in order to pick up on ingredient in each ingredients category  (for example choose "slug of whisky" for a dring where the client selected the "strong" category of ingredients)
        ingredientNumber = generateRandomNumber(0, 2);
        if (drinkOrder[userPreference]) {
            //for each one of the ingredient categories chose one random ingredient and populate the ingredientsArray with it
            ingredientsArray.push(pantry[userPreference][ingredientNumber]);
        }
    }
    return ingredientsArray;
};

/* Step 2 - define the functions which are going to use the main objects of the app */

//changes the ingredient names from whichever case the are to "Title Case"
var toTitleCase = function (str) {
    // "/\w\S*/g" is a regular expression (http://www.regular-expressions.info/) which searches for all words in a phrase ignoring the spaces
    return str.replace(/\w\S*/g, function (txt) {
        //only the first letter in the word make Upper case and all the other letters apart from the first one ("substr(1)") to lower case
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

// Function to generate the random number
var generateRandomNumber = function (min, max) {
    //Returns a random integer between min (included) and max (included); Math.floor() will give you a non-uniform distribution!
    //random number generator details can be found here https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

// use if statements to piece together name conditionally based on the ingredients that comprise it
var drinkNamer = function (concoction) {
    //if there is at least one ingredient in the concoction
    if (concoction.length > 0) {
        //split the concoction by space to be able to use the words
        var drinkNamerOutput = concoction[0].split(" ");
        //chose the last word of the first ingredient
        var lastWord = drinkNamerOutput[drinkNamerOutput.length - 1];
        //change the title case of the last word
        return toTitleCase(lastWord);
    } else {
        return false;
    }
};

/* Step 3 - use the functions */

$(document).ready(function () {

    //by default the output container is empty
    $('.output').hide();

    //when the form is submitted
    $('form').on('submit', function (event) {

        //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
        event.preventDefault();

        //set the empty orderValues array
        orderValues = [];

        //check if the each one of the ingredient types have been chosen and that to the orderValues array;
        $('select').each(function () {
            if ($(this).val() === 'yes') {
                orderValues.push(true);
            } else {
                orderValues.push(false);
            }
        });

        //use the 2 constructors to create 2 new objects
        drinkOrder = new Order(orderValues); // create new order from existing user choice
        concoction = new Drink(pantry, drinkOrder); // mix drink with Drink constructor

        //if there is at least one ingredient selected then show the concoction
        if (concoction.length > 0) {

            //build the chosen ingredients from the ingredients array
            var buildTheHtmlOutput = "";
            $.each(concoction, function (key, value) {
                buildTheHtmlOutput += "<li>" + value + "</li>";
            });

            //show the output container
            $('.output').show();

            // name the customer's beverage with drinkNamer();
            $(".output h3").html("Here be yer Sparkly " + drinkNamer(concoction) + " Grog, ye scurvy dog!");

            //populate it with the ingredients
            $(".output ul").html(buildTheHtmlOutput);
        }
        //if no selections, show alert below
        else {
            alert('Select a choice');
        }
    });
});