module JQuery
  module Template
    class NoTemplateError < StandardError; end
    class TooManyTranslationsError < StandardError; end
    class TranslationUnspicifiedError < StandardError; end
    class OnlySupplyObjectOrCollectionError < StandardError; end
    class InvalidOptionError < StandardError; end
    
    def render options={}
      Renderer.new(options).render
    end
    
    class Renderer
      def self.property property_id
        send :define_method, "#{property_id}?" do
          @options.include? property_id
        end
        
        send :define_method, property_id do
          @options[property_id]
        end
      end
      
      property :property
      property :template
      property :object
      property :collection
      property :translate
      
      def initialize options
        @options = options
        raise InvalidOptionError unless options_valid?
      end
      
      def options_valid?
        @options.each do |option, value|
          return false unless respond_to? option
        end
      end
      
      def render
        if property?
          "\#{#{property}}"
        elsif template? and only_template
          "={#{template}}"
        elsif object? or collection?
          raise NoTemplateError unless template?
          raise OnlySupplyObjectOrCollectionError if object? and collection?
          "={#{template}:#{object or collection}}"
        elsif translate?
          raise NoTemplateError unless template?
          "=[#{template}||#{translation}]"
        end
      end
      
      def translation
        list_name, name = *translation_options
        "#{name}<-#{list_name}"
      end
      
      def translation_options
        opts = translate.to_a
        raise TooManyTranslationsError if opts.length > 1
        raise TranslationUnspicifiedError if opts.length == 0
        return opts.first
      end
      
      def only_template
        not(object? || collection? || translate?)
      end
    end
  end
end
