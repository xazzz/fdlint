require_relative '../base_parser'
require_relative 'struct'

module XRay; module HTML

  AUTO_CLOSE_TAGS = %w(area base basefont br col frame hr img input link meta param)

  class Parser < BaseParser

    def self.parse(src, &block)
      parser = self.new(src)
      doc = parser.parse
      yield doc if block_given? 
      doc
    end

    TEXT            = /[^<]+/m
    PROP_NAME       = %r/\w[-\w]*/m
    PROP_VALUE      = %r/'([^']*)'|"([^"]*)"|([^\s>]+)/m
    PROP            = %r/#{PROP_NAME}\s*(?:=\s*#{PROP_VALUE})?/m
    TAG_NAME        = /\w[^>\s]*/ 
    TAG_START       = %r/<(#{TAG_NAME})/m
    TAG_END         = %r/<\/#{TAG_NAME}\s*>/m
    TAG             = %r/#{TAG_START}(\s+#{PROP})*\s*>/m
    SELF_CLOSE_TAG  = %r/#{TAG_START}(\s+#{PROP})*\s+\/>/m
    DTD             = /<!doctype\s+(.*?)>/im
    COMMENT         = /<!--(.*?)-->/m

    def parse_html
      nodes = batch(:parse_element)
      case nodes.size
        when 0 then nil
        when 1 then nodes[0]
        else nodes
      end
    end

    alias_method :parse, :parse_html

    def parse_element
      if @scanner.check(COMMENT)
        parse_comment
      elsif @scanner.check(TAG_START)
        parse_tag
      else
        parse_text
      end
    end

    def parse_comment
      scan COMMENT
      CommentElement.new(@scanner[1])
    end

    def parse_text
      text = ''
      until @scanner.check(TAG) or @scanner.check(SELF_CLOSE_TAG) or @scanner.check(TAG_END) or @scanner.check(COMMENT) or @scanner.eos?
        text << '<' if @scanner.skip(/</)
        text << @scanner.scan(TEXT)
      end

      TextElement.new text
    end

    def parse_tag
      if @scanner.check DTD
        parse_dtd_tag
      elsif @scanner.check SELF_CLOSE_TAG
        parse_self_closing_tag
      elsif @scanner.check TAG
        parse_normal_tag
      end
    end

    def parse_properties
      skip_empty
      props = []
      until prop_search_done? do
        prop = parse_property
        props << prop if prop
        skip_empty
      end
      props
    end

    def parse_property
      name = parse_prop_name
      if @scanner.check( /\s*=/ )
        skip /[=]/
        sep = @scanner.check(/['"]/)
        value = parse_prop_value
      end
      Property.new name, value, sep
    end

    def parse_prop_name
      scan PROP_NAME
    end

    def parse_prop_value
      scan PROP_VALUE
      Node.new("#{@scanner[1]}#{@scanner[2]}#{@scanner[3]}")
    end

    protected
    def prop_search_done?
      @scanner.check(/\/>|>/) or @scanner.eos?
    end

    def parse_normal_tag
      skip /</
      tag, prop = scan(TAG_NAME), parse_properties
      skip />/

      children = []
      if auto_close?(tag.text)
        #TODO: give a warning for this
      else
        end_tag = %r(<#{tag.text.sub(/^(?!=\/)/, '\/')}>)
        until @scanner.check(TAG_END) or @scanner.eos? do
          child = parse_element
          children << child if child
        end
        begin
          skip end_tag
        rescue => e
          #TODO: html not validated
          puts "---"
          raise e
        end
      end
      Element.new(tag, prop, children)
    end

    def parse_dtd_tag
      scan DTD
    end

    def parse_self_closing_tag
      skip /</
      tag = scan(TAG_NAME)
      prop = parse_properties
      skip /\/>/
      Element.new(tag, prop)
    end


    def auto_close?(tag)
      XRay::HTML::AUTO_CLOSE_TAGS.include?(tag.to_s)
    end

  end


end; end

if __FILE__ == $0
  XRay::HTML::Parser.parse(%q(<div class="info" checked>information</div>)) { |e| puts e.outer_html }
  XRay::HTML::Parser.parse(%q(<img width="100" height='150' id=img > <center>text</center>)) { |e| puts e.first.outer_html }
  XRay::HTML::Parser.parse(%q(<center><div><div><center>text</center></div></div></center>)) { |e| puts e.outer_html }
  begin; XRay::HTML::Parser.parse(%q(<center><div></center></div>)) { |e| puts e.outer_html }; rescue; end
end
