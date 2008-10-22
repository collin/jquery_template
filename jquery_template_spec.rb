require 'jquery_template'

describe JQuery::Template do
  include JQuery::Template
  
  it "renders" do
    render(:property => :awesomeness).should == '#{awesomeness}'
  end
  
  it "renders templates" do
    render(:template => :layout).should == "={layout}"
  end
  
  it "renders templates with an object" do
    render(:template => :bookshelf, :object => :book).should == "={bookshelf:book}"
  end
  
  it "renders templates with a collection" do
    render(:template => :bookshelf, :collection => :books).should == "={bookshelf:books}"
  end
  
  it "renders list expression syntax" do
    render(:template => :storefront, :translate => {:names => :developer_name}).
      should == "=[storefront||developer_name<-names]"
  end
  
  it "requires template with object" do
    lambda {
      render :object => :whatever
    }.should raise_error
  end
  
  it "requires template with collection" do
    lambda {
      render :collection => :whatevers
    }.should raise_error
  end
  
  it "only allows one object or collection" do
    lambda {
      render :object => :whatever, :collection => :whatevers, :template => :any
    }.should raise_error
  end
  
  it "errors against invalid properties" do
    lambda {
      render :property => :real, :dumb_property => :fake
    }.should raise_error 
  end
end
