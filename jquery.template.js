(function(_) {
  function delve(str) {
    var slots = str.split('.')
      ,len = slots.length
      ,i
      ,obj = _
      ,slot;
    
    for(i=0; i <len; i++) {
      slot = slots[slot];
      if(obj.hasOwnProperty(slot))
        obj = obj[slot];
      else
        obj = obj[slot] = {}; 
    }
    
    return obj;
  }

  var templates = {}
    ,syntax = {
      // #{property_name}
      
      "\\#\\{([\\w]+)\\}": function(object) {
        return function(match, attr) {
          return object[attr];
        }
      }
      
      // ={template_name}
      
      ,"=\\{([\\w]+)\\}": function(object) {
        return function(template) {
          return _.template(template, object);
        }
      }
      
      // ={template_name:property_name}
      
      ,"=\\{([\\w]+):([\\w]+)\\}": function(object) {
        return function(template, property) {
          return _.template(template, object[property]);
        }
      }
      
      // =[template_name || object_name <- list_name]
      
      ,"=\\[([\\w]+)\\|\\|([\\w]+)<-(\\w+)\\]": function(object) {
        return function(template, object_name, list) {
          var list = object[list]
            ,i, len = list.length
            ,locals, render = "";
          
          for(i=0; i<len; i++) {
            locals = {};
            locals[object_name] = list[i];
            render += _.template(template, locals);  
          }
          return render;
        }
      }
      ,"\\?\\([\\w]+\\)": function(object) {
        return function(property) {
          return object[property];
        }
      }
    }
    ,compiled_syntax = [];
    
  for(var slot in syntax) compiled_syntax.push({
    regex: new RegExp(slot, 'g')
    ,compiler: syntax[slot]
  });
  
  function compile_template(contents) {
    var atom = compiled_syntax.length,
      expr;
    
    return function(object) {
      var render = new String(contents);
      while(atom--) {
        expr = compiled_syntax[atom];
        render =  render.replace(expr.regex, expr.compiler(object));
      }
      return render;
    }
  }
  
  function set_template(name, contents) {
    templates[name] = compile_template(contents);
  }
  
  function render_template(name, contents) {
    return templates[name](contents);
  }

  _.template = function(name, contents) {
    if(contents.constructor === String)
      set_template(name, contents);
    else 
      return render_template(name, contents);
    return true;
  };
})(jQuery);
