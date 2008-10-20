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

The purpose of this project is NOT to be a test runner, it WILL be a component in
a test runner I am building on top of screw-unit. But that isn't complete, so I built
a really quick test runner. Then I got carried away rendering the results with
the templating syntax.

![http://img395.imageshack.us/img395/5859/screenshotlm7.png]

--------------------------------
(PS: jQuery should be lurking around.)
