/*
  Hear ye, hear ye!
  
  I want to mash my strings together and interpolate values with JS objects.

  There shall be something of a language involved.
  
    =[template_name || object_name <- list_on_current_object]
    
    #{property_of_current_object}
    
    ={template_name_to_be_rendered_with_current_object}
    
    ={template_nome:property_of_current_object_to_render_it_with}
    
    ?(property_name_in_place_substitution)
  
  Amen!
  
  (PS: jQuery should be lurking around.)
*/

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

  var templates = {};
  
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
