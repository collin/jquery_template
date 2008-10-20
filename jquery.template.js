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
      
      "#\\{([\\w]+)\\}": function() {
        return function(match) {
          return this[match];
        }
      }
      
      // ={template_name}
      
      ,"=\\{([\\w]+)\\}": function() {
        return function(template) {
          return _.template(template, this);
        };
      }
  
      // ={template_name:property_name}
      
      ,"=\\{([\\w]+):([\\w]+)\\}": function() {
        return function(template, property) {
          return _.template(template, this[property]);
        };
      }
      
      // =[template_name || object_name <- list_name]
      
      ,"=\\[([\\w]+)\\|\\|([\\w]+)<-(\\w+)\\]": function() {
        return function(template, object_name, list) {
          var list = this[list]
            ,i, len = list.length
            ,locals, render = "";
          
          for(i=0; i<len; i++) {
            locals = {};
            locals[object_name] = list[i];
            render += _.template(template, locals);  
          }
          return render;
        };
      }
    }
    ,in_place = {
      "\\?\\([\\w]+\\)": function(property) {
        return this[property];
      }
    };
  
  function compile_template(contents) {
    return function(contents) {
      return "";
    }
  }
  
  function set_template(name, contents) {
    templates[name] = compile_template(contents);
  }
  
  function render_template(name, contents) {
    return templates[name](contents);
  }

  _.template = function(name, contents) {
    if(contents instanceOf String)
      set_template(name, contents);
    else 
      return render_template(name, contents);
    return true;
  };
})(jQuery);
