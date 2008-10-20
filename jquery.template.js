(function(_) {
  var templates = {}
    ,syntax = {
      "\\?\\(([\\w]+)\\)": function(object) {
        return function(match, property) {
          return object[property];
        }
      }
      
      // #{property_name}
      
      ,"\\#\\{([\\w]+)\\}": function(object) {
        return function(match, attr) {
          var obj_attr = object[attr];
          if(_.isFunction(obj_attr)) return obj_attr();
          return obj_attr;
        }
      }
      
      // ={template_name}
      
      ,"=\\{([\\w]+)\\}": function(object) {
        return function(match, template) {
          return _.template(template, object);
        }
      }
      
      // ={template_name:property_name}
      
      ,"=\\{([\\w]+):([\\w]+)\\}": function(object) {
        return function(match, template, property) {
          var obj_prop = object[property];
          if(_.isFunction(obj_prop)) obj_prop = obj_prop();
          console.log(obj_prop)
          if(obj_prop.constructor === Array) {
            var len = obj_prop.length, i, render="";
            for(i=0; i<len; i++) render += _.template(template, obj_prop[i]);
            return render;
          }
          return _.template(template, obj_prop);
        }
      }
      
      // =[template_name || object_name <- list_name]
      
      ,"=\\[([\\w]+)\\|\\|([\\w]+)<-(\\w+)\\]": function(object) {
        return function(match, template, object_name, list) {
          if(_.isFunction(object[list])) list = object[list]();
          else  list = object[list];
          var i, len = list.length
            ,locals, render = "";
          
          for(i=0; i<len; i++) {
            locals = {};
            locals[object_name] = list[i];
            render += _.template(template, locals);  
          }
          return render;
        }
      }
    }
    ,compiled_syntax = [];
    
  for(var slot in syntax) compiled_syntax.push({
    regex: new RegExp(slot, 'g')
    ,compiler: syntax[slot]
  });
  
  function compile_template(contents) {
    var len = compiled_syntax.length
      ,i
      ,expr;
    
    return function(object) {
      var render = new String(contents);
      for(i=0; i<len; i++) {
        expr = compiled_syntax[i];
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
