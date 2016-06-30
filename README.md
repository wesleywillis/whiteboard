# Whiteboard
#### Custom Alexa Skill (Available in Alexa Skill Store)

This is a custom Alexa skill I built for myself to help practice technical interview skills.  The user can request a coding challenge from their Amazon Echo, and will be provided with a random challenge question.  Current version is minimum viable product.

#### Planned Updates: 
* Improve SSML to make Alexa speech more natural, or use recorded speech snippets in place of Alexa default speech.
* Provide links to solutions of the challenge on each skill card.  Challenges are already stored as keys with empty array values to allow for additional information to be added onto challenge
* Tag questions so that user can request specific types of challenges.
  * Intents that filter by tag.
* Score keeping to allow user to input and track challenges they have passed/failed.
  * Behavior that weights failed challenges so system selects them more often for current challenge
* Allow user to delete challenges they do not find relevant
  * "Alexa, delete that challenge" removes question from challenge hash. 
