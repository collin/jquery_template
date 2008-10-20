function pass() { console.count('pass'); }
function fail(result, expr, msg) {
  console.count('fail')
  console.warn(msg, result);
  while_running(expr);
}
function err(expr, e) {
  console.count('error')
  console.error(e.message);
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
  match("Hello, World!", function(){
    _.template("interp", "#{msg}, #{who}!");
  
    return _.template('interp', {
      msg: "Hello", who: "World"
    });
  });
});
