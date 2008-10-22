Hear ye, hear ye!
==============================

Making a template:

    jQuery.template('name_of_template', template_string);
    
Rendering a template:

    jQuery.template('name_of_template', {/* Object to render with. */});

[Read test.js for examples of all the templating syntax.](http://github.com/collin/jquery_template/tree/master/test.js)

Let us all welcome Ruby to the party.

## module JQuery::Template
#### method: render(options={})
#### options

    render(:property => :name)
    
Render the property 'name' in the current object. 
Long-hand notation for '#{name}' 

    render(:template => :layout)
    
Render the template 'layout' using the current object. 
Long-hand notation for '={layout}'

    render(:template => :bookshelf, :object => :book}
    render(:template => :bookshelf, :collection => :books}
    
Render the template 'bookshelf'. In one case, pass the property 'book' of
the current object to be the current object of the template.
In the other case, loop over the property 'books' of the current object and
render the layout with each item in the list.
Long-hand notation for '={bookshelf:book}' and '={bookshelf:books}'. Whether
the property is a single object or an array is a render-time check.
Both options are provided to better convey intention, but :collection WILL
work if the property points to a single object or :object points to a list.

    render(:template => :storefront, :translate => {:names => :developer_name})
  
Assuming we have a current object like this: 
  
    {names:['collin', 'quinn', 'milo', 'david', 'sundar', 'will']}
   
This will render 'storefront' with an object for each name. The object will
be structured like this:

    {developer_name: 'collin'}
    {developer_name: 'quinn'}
    {developer_name: 'milo'}
    // etc...
    
Long-hand notation for '=[storefront||developer_name<-names]'

As a bonus, if any property on the object being rendered is a function, it will
called at render-time and the return value of that function used as if it were
the property itself.


_original README_

I want to mash my strings together and interpolate values with JS objects.

There shall be something of a language involved.
  
    #{property_of_current_object}
  
    ={template_name_to_be_rendered_with_current_object}
  
    ={template_name:property_of_current_object_to_render_it_with}
 
    ?(property_name_in_place_substitution)

    =[template_name||object_name<-list_on_current_object]
    
Read test.js for examples.

Amen!

The purpose of this project is NOT to be a test runner, it WILL be a component in
a test runner I am building on top of screw-unit. But that isn't complete so I built
a really quick, dead-simple test runner just so I could test this project. 

Then I got carried away rendering the results with the templating syntax.

![Example ui rendered from template syntax](http://img395.imageshack.us/img395/5859/screenshotlm7.png)

----------------------------------------------------
Released under the "Don't be a Dick" license.

Don't be a dick and everything will be okay.
