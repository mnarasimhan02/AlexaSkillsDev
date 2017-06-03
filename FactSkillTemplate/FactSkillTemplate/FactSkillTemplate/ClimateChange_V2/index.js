/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask climate change for a fact"
 *  Alexa: "Here's your climate change fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.ask.skill.0e06e042-72f0-4f55-b5a1-09143659df03"; //OPTIONAL: replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing climate change facts.
 */
var FACTS = [
    "16: Number of record-breaking hottest years since 2000. 2016 was the hottest year yet",
    "1.5 degrees: The average worldwide temperature increase in Fahrenheit compared to a century ago.",
    "6.7 inches: Rise in global sea levels over the last century. The rate of rise has doubled in the last decade.",
    "The current pace of global average temperature rise puts approximately 25 to 35 percent of plant and animal species at increased risk of extinction",
    "The United States constitutes 5% of the world population and contributes to 22% of world’s carbon emission.",
    "Around 15% of the carbon released in the environment is due to deforestation and change in use of land.",
    "The golden Toad is the first species to go extinct due to climate change.",
    "Vehicles like cars and truck contribute to 20% of carbon emissions in the United States.",
    "Air conditions and heating elements consume 50% of electricity in America.",
    "Hurricanes, droughts and coral deaths are few of the natural disasters  caused due to climate change.",
    "Over the last 50 years, the concentration of carbon dioxide in the atmosphere has increase by 30%  due to burning of fossil fuels and greenhouse gas emissions like carbon dioxide, nitrous oxide and other gases, trapping more heat in the lower atmosphere.",
    "The rising temperatures will cause more deaths not due to natural reasons but as a result of overheating and rapid spread of deadly diseases",
    "Climate change can have serious health impacts such as heat stress, extreme cold which can cause major deaths due to heart diseases",
    "In 2003, around 70,000 deaths have occurred in Europe alone due to diseases caused by rising temperatures",
    "Pollen and aeroallergen high levels also lead to rising temperature. This can cause asthma which effects 300 million people worldwide",
    "Over the next 20 years, global warming is expected to increase by 0.2 degree per decade",
    "Both the extent and thickness of Arctic sea ice has declined rapidly over the last several decades",
    "The number of record high temperature events in the United States has been increasing, while the number of record low temperature events has been decreasing, since 1950",
    "Satellite observations reveal that the amount of spring snow cover in the Northern Hemisphere has decreased over the past five decades and that the snow is melting earlier",
    "Global sea level rose about 8 inches in the last century. The rate in the last two decades, however, is nearly double that of the last century",
    "Since the beginning of the Industrial Revolution, the acidity of surface ocean waters has increased by about 30 percent.This increase is the result of humans emitting more carbon dioxide into the atmosphere and hence more being absorbed into the oceans",
    "The number of climate change related incidents have increase four fold between 1980 and 2010",
    "Land use change and deforestation contributes to 15% of carbon emission every year",
    "Due to the greenhouse effect, the average temperature of the earth is 15 degrees rather than -18 degrees without the greenhouse effect",
    "Carbon dioxide is not the only contributing gas towards climate change. Other gases like methane and nitrous oxide are far more dangerous than carbon dioxide alone.",
    "The Kyoto Protocol, an organization formed to analyze and fight against climate change will cost more than 100 trillion dollars thus making developing and underdeveloped communities to participate"
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * climate change is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var Fact = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
Fact.prototype = Object.create(AlexaSkill.prototype);
Fact.prototype.constructor = Fact;

Fact.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    //console.log("onSessionStarted requestId: " + sessionStartedRequest.requestId + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

Fact.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    //console.log("onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
Fact.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    //console.log("onSessionEnded requestId: " + sessionEndedRequest.requestId + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

Fact.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can say tell me a climate change fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random climate change fact from the climate change facts list
    var factIndex = Math.floor(Math.random() * FACTS.length);
    var randomFact = FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your climate change fact: " + randomFact;
    var cardTitle = "Your Fact";
    response.tellWithCard(speechOutput, cardTitle, speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the climate changeGeek skill.
    var fact = new Fact();
    fact.execute(event, context);
};

