function pass() { console.count('pass'); }
function fail(result, expr, msg) {
  console.count('fail')
  console.warn(msg, result);
  while_running(expr);
}
function err(expr, e) {
  console.count('error')
  console.error(e.message);
  console.error(e.fileName, "+", e.lineNumber);
  while_running(expr)
}
function while_running(expr) {
  console.info('while running');
  console.log(expr.toString());
}

function assert(expr) {
  try {
    var result = expr();
    if(result) pass();
    else fail(result, expr, 'expected true got');
  }
  catch(e) {err(expr, e);}
}

function match(val, expr) {
  try {
    var result = expr();
    if(val == result) pass();
    else fail(result, expr, 'expected '+val+' but got')
  }
  catch(e) {err(expr, e);}
}

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
});
