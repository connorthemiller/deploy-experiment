// the makings of a story
var parts = {
  "description": "Parts to make a Ted Chiang story.",
  "author": "Connor Miller",
  "setting": [
    "the world's oldest tree", 
    "San Francisco, California",
    "Cairo, Egypt",
    "Barcelona, Spain",
    "Mespotamia",
    "a struggling tech startup"
  ],
  setDesc: [
    "(but not really)",
    "many years ago",
    "torn apart by politics",
    "but made entirely with sand", 
    "fueled by religous zealotry",
    "before the birth of Christ",
    "inhabited by sentient robots",
  ],
  "heroDrama": [
    "a mother copes with her grief",
    "two brothers reconcile their differences", 
    "a loner takes a chance", 
    "a teenage girl attempts to raise her sister alone",
    "a couple files for divorce",
    "a clover contemplates its existence",
    "a messenger warns a king",
    "a student suppresses their romantic feelings"
  ],
  "techConcept": [
    "in VR",
    "with a pill that cures everything",
    "in diverging quantum timelines",
    "with artificial intelligence",
    "because of an uncrackable code",
    "with aliens that live ten seconds in the future",
    "with 'if you like... then try...' algorithms",
    "by making a deepfake video"
  ]
}; 

function rand(limit) {
  return Math.floor(Math.random() * (limit));
}

function picker(t){
  return t[rand(t.length)]
}

function generateStory(){
  var setting = picker(parts.setting);
  var setDesc = picker(parts.setDesc);
  var heroDrama = picker(parts.heroDrama);
  var techConcept = picker(parts.techConcept);
  var output = `In ${setting} ${setDesc}, ${heroDrama} ${techConcept}.`;
  return output
}

// the stuff on the page
var target = document.getElementById("target");
var generateBtn = document.getElementById("generate");
var shareBtn = document.getElementById("share");

generateBtn.onclick = function(event) {
  target.innerHTML = generateStory();
  target.setAttribute("data-postable", "true");
}

shareBtn.onclick = function(event) {
  // this needs to be fixed
  if (target.dataset.postable != "false") {
  var tweet = encodeURIComponent("STORY: " + target.innerHTML + " [Made with the Ted Chiang Story Generator http://bit.ly/2IA577s]")
  window.open("https://twitter.com/intent/tweet?text="+tweet);
  } else {
    alert("Press the 'Generate' button to get started!"); 
  }
}
