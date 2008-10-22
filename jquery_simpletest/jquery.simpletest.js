counts = {
  pass: 0
  ,fail: 0
  ,error: 0
};


(function(_){
  _.template('results', "\
    <div class='results'>\
      <span class='pass'>Pass: #{pass}</span>\
      <span class='fail'>Fail: #{fail}</span>\
      <span class='error'>Error: #{error}</span>\
    </div>\
  ");
  
  _.template('while_running', "\
    <hr/>\
    <pre class='running'>\
#{fn_string}\
    </pre>\
  ");
  
  _.template('error', "\
    ={warning}\
    <a href='gedit:///#{fileName}?#{lineNumber}'>\
      #{fileName}\
    </a>\
    <br/>\
    <button class='show'>\
      show trace\
    </button>\
    <div class='trace'>\
      <button class='hide'>\
        hide trace\
      </button>\
      ={line:stack}\
    </div>\
  ");
  
  _.template('line', "\
    <div class='line #{odd}'>\
      <div class='file'>\
        <span>\
          #{lineNumber}:\
        </span>\
        <a href='gedit:///#{fileName}?#{lineNumber}'>\
          #{fileName}\
        </a>\
      </div>\
      <code>\
        #{code}\
      </code>\
    </div>\
  ")
  
  _.template('err', "\
    ={while_running:expr}\
    ={error:e}\
  ")
      
  _.template('warning', "\
    <p class='warning'>\
      #{msg} #{result}\
    </p>\
  ");
  
  _(function(){
    _('body')
      .append(_.template('results', counts))
      .append("<div id='console'>")
      .append(_.template('results', counts));
  });
  
})(jQuery);

  function count(which) {
    counts[which]++;
    jQuery('.results').replaceWith(jQuery.template('results', counts));
  }

  function warn(msg, result) {
    jQuery('#console').prepend(jQuery.template('warning', {
      msg: msg
      ,result: result
    }));
  }
  
  function while_running(expr) {
    jQuery('#console').prepend(jQuery.template('while_running', {
      fn_string: expr.toString()
    }));
  }
  
  function err(expr, e) {
    count('error');
    var line, split_line
      ,parsedStack = []
      ,stack = e.stack
        .replace(/file:\/\/\//g, '')
        .split(/\n|@/);
    
    jQuery(stack).each(function(which) {
      if(which % 2) {
        split_line = this.split(':');
        line.fileName = split_line[0];
        line.lineNumber = split_line[1];
        parsedStack.push(line);
      }
      else {
        line = {
          code: eval(this).toString()
          ,odd: 'even'
        };
      }
      if(!(which % 4)) line.odd = 'odd'
    });
    
    jQuery('#console').prepend(jQuery.template('err', {
      e: {
        lineNumber: e.lineNumber
        ,fileName: e.fileName.replace('file:///', '')
        ,stack: parsedStack
        ,msg: e.message
      }
      ,expr: {
        fn_string: expr.toString()
      }
    }));
    
    jQuery('#console')
      .find('.show:first')
        .click(function() {
          jQuery(this)
            .hide()
            .next()
              .slideDown();
        })
        .end()
      .find('.hide:first')
        .click(function(){
          jQuery(this)
            .parent()
              .slideUp()
              .prev()
                .show();
        })
  }
  
  function pass() { count('pass'); }
  function fail(result, expr, msg) {
    count('fail')
    warn(msg, result);
    while_running(expr);
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
