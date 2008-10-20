jQuery(function(_){  
  _.template("interp", "#{msg}, #{who}!");
 
  match("Hello, World!", function(){
    return _.template('interp', {
      msg: "Hello", who: "World"
    });
  });
 
  _.template("defer", "={interp} ={interp}") 
  match("Hello, Tests! Hello, Tests!", function() {
    return _.template('defer', {
      msg: "Hello", who: "Tests"
    });
  });
  
  _.template("pass", "={interp:jupiter} ={interp:mars}");
  match("Goodbye, Jupiter! Hello, Mars!", function() {
    return _.template('pass', {
      jupiter: {msg:"Goodbye", who:"Jupiter"}
      ,mars: {msg:"Hello", who:"Mars"}
    });
  });
  
  _.template("late", "={?(template)}")
  match("Hello, Nurse!", function() {
    return _.template('late', {
      template: 'interp', msg: "Hello", who: "Nurse"
    });
  });
});
