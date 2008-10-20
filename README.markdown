Hear ye, hear ye!
==============================

I want to mash my strings together and interpolate values with JS objects.

There shall be something of a language involved.
  
    #{property_of_current_object}
  
    ={template_name_to_be_rendered_with_current_object}
  
    ={template_name:property_of_current_object_to_render_it_with}
 
    ?(property_name_in_place_substitution)

    =[template_name||object_name<-list_on_current_object]
    *This one is commented out. It's cool, but I can't see when I'd need it.
    
Read test.js for examples.

Amen!

--------------------------------
(PS: jQuery should be lurking around.)
