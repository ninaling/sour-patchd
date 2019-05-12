$(document).ready(function(){
  var svg = document.getElementById("loading-svg");
  var s = Snap(svg);
  var fork = Snap.select('#fork');
  var forkPoints = fork.node.getAttribute('d');
  var spoonPoints = Snap.select('#spoon').node.getAttribute('d');
  var knifePoints = Snap.select('#knife').node.getAttribute('d');
  var toSpoon = function(){
    fork.animate({ d: spoonPoints }, 1500, mina.easeinout, toKnife);
  }
  var toKnife = function(){
    fork.animate({ d: knifePoints }, 1500, mina.easeinout, toFork);
  }
  var toFork = function(){
    fork.animate({ d: forkPoints }, 1500, mina.easeinout, toSpoon);
  }
  toSpoon();
});
