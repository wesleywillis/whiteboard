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
 *  User: "Alexa, ask WhiteBoard for a challenge"
 *  Alexa: "Here's your challenge: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = "amzn1.echo-sdk-ams.app.3556ea76-1e08-42af-a83b-6005dd3139f8";

/**
 * Array containing programming questions.
 */
 var CODE_QUESTIONS = {
   "Write a function that takes an array of integers (eg. [2, 5, 7, 4, 3, 9]) and returns the first pair of integers that adds up to 10 (eg. [7, 3]).": [""],
   "Given two arrays of numbers, write a function that will return an array with the numbers that are common between the two arrays Ex: arr1 = [100, 200, 300] arr2 = [100, 300, 400] => [100, 300] ": [""],
   "Write a function that takes a number n as a parameter and outputs a 'password' of length n, whose characters are drawn from the letters a-z, A-Z, and 0-9": [""],
   "Given an array remove duplicates and print how often each item appears": [""],
   "Given two 6-sided cube make a calendar cube to display the day of the month, where do you put the numbers?": [""],
   "Write a function that counts the number of times each word appears in a string and prints out the results like this example: string= “I like coding, he likes coding” prints... I 1 like 2 coding 2 he 1 likes 1": [""],
   "Given two strings of words how would check to see if the second string can be created using the words of the first.": [""],
   "Given a matrix (2D array) and a value, write a function that determines whether or not the value exists in the matrix": [""],
   "Given a sorted positive integer array [1,2,3,5,8,10,11,12,15], write a function that would return a string with the ranges collapsed like '1-3,5,8,10-12,15'": [""],
   "Given a tree write breadth first search and depth first search, and explain the run time and space requirements.Convert a binary search tree into an ordered array.  How do you do this as efficiently as possible?": [""],
   "How do you find the 7th element in a binary search tree?  How do you generalize the function to find the Nth element?": [""],
   "Given two binary trees write a function that will compare the two and see if they are equal – both in terms of data and structure.": [""],
   "Design and implement a stack. Implement the different methods: push, pop, retrieve the minimum element in constant time.": [""],
   "Design a queue using stacks as the underlying data structure.": [""],
   "Write a function for reversing a linked list.": [""],
   "We have bunnies standing in a line, numbered 1, 2, ... The odd bunnies (1, 3, ..) have the normal 2 ears. The even bunnies (2, 4, ..) we'll say have 3 ears, because they each have a raised foot. Recursively return the number of 'ears' in the bunny line 1, 2, ... n (without loops or multiplication).": [""],
   "Given three ints, a b c, one of them is small, one is medium and one is large. Return true if the three values are evenly spaced, so the difference between small and medium is the same as the difference between medium and large.": [""],
   "Given two arrays of ints sorted in increasing order, outer and inner, return true if all of the numbers in inner appear in outer. The best solution makes only a single 'linear' pass of both arrays, taking advantage of the fact that both arrays are already in sorted order.": [""],
   "Return an array that contains exactly the same numbers as the given array, but rearranged so that every 3 is immediately followed by a 4. Do not move the 3's, but every other number may move. The array contains the same number of 3's and 4's, every 3 has a number after it that is not a 3 or 4, and a 3 appears in the array before any 4.": [""],
   "Given a non-empty array, return true if there is a place to split the array so that the sum of the numbers on one side is equal to the sum of the numbers on the other side.": [""],
   "We'll say that a 'triple' in a string is a char appearing three times in a row. Return the number of triples in the given string. The triples may overlap.": [""],
   "Given a string, look for a mirror image (backwards) string at both the beginning and end of the given string. In other words, zero or more characters at the very begining of the given string, and at the very end of the string in reverse order (possibly overlapping). For example, the string 'abXYZba' has the mirror end 'ab'.": [""],
   "Given two arrays, A and B, of non-negative int scores. A 'special' score is one which is a multiple of 10, such as 40 or 90. Return the sum of largest special score in A and the largest special score in B. To practice decomposition, write a separate helper method which finds the largest special score in an array.": [""],
   "Given an array of ints, is it possible to divide the ints into two groups, so that the sum of the two groups is the same, with these constraints: all the values that are multiple of 5 must be in one group, and all the values that are a multiple of 3 (and not a multiple of 5) must be in the other. (No loops needed.)": [""],
   "Given an array of ints, is it possible to choose a group of some of the ints, such that the group sums to the given target with this additional constraint: If a value in the array is chosen to be in the group, the value immediately following it in the array must not be chosen. (No loops needed.)": [""],
   "What is the difference between selection and insertion sorting?": [""],
   "What are the main steps of a merge sorting algorithm?": [""]
 };


/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * WhiteBoard is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var WhiteBoard = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
WhiteBoard.prototype = Object.create(AlexaSkill.prototype);
WhiteBoard.prototype.constructor = WhiteBoard;

WhiteBoard.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("WhiteBoard onSessionStarted requestId: " + sessionStartedRequest.requestId +
    ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

WhiteBoard.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("WhiteBoard onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
WhiteBoard.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("WhiteBoard onSessionEnded requestId: " + sessionEndedRequest.requestId +
    ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

WhiteBoard.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask White Board to give you a challenge, or, you can say exit... What can I help you with?", "What can I help you with?");
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
    // Get a random space fact from the space facts list
    var keys = Object.keys(CODE_QUESTIONS);
    var challengeIndex = Math.floor(Math.random() * CODE_QUESTIONS.length);
    var codeQuestion = keys[challengeIndex];

    // Create speech output
    var speechOutput = "Here's your challenge: " + codeQuestion;

    response.tellWithCard(speechOutput, "WhiteBoard", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the WhiteBoard skill.
    var whiteBoard = new WhiteBoard();
    whiteBoard.execute(event, context);
};
