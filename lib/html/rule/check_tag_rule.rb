# encoding: utf-8
require_relative '../struct'

module XRay
  module HTML
    module Rule

      class CheckTagRule

        attr_reader :imported_scripts, :imported_css

        def initialize(opt=nil)
          @imported_scripts, @imported_css = [], []
        end

        def visit_html(html)
          ["必须存在文档类型声明", :warn] unless @have_dtd
        end

        def visit_dtd(dtd)
          @have_dtd = true
          check_dtd(dtd)
        end

        def visit_tag(tag)
          check_tag(tag)
        end

        def visit_property(prop)
          check_prop(prop)
        end

        def check_dtd(dtd)
          check [
            :check_dtd_type_be_html5,
            :check_dtd_upcase
          ], dtd
        end

        def check_dtd_type_be_html5(dtd)
          unless dtd.type.downcase == 'html'
            ['新页面统一使用HTML 5 DTD', :info]
          end
        end

        def check_dtd_upcase(dtd)
          unless dtd.to_s =~ /^<!DOCTYPE/
            ['必须使用大写的"DOCTYPE"', :info]
          end
        end

        def check_tag(tag)
          check [
            :check_tag_name_downcase,
            :check_unique_script_import,
            :check_unique_style_import,
            :check_img_must_have_alt,
            :check_hyperlink_with_target,
            :check_hyperlink_with_title,
            :check_no_import_in_style_tag,
            :check_head_contain_meta_and_title,
            :check_block_in_block,
            :check_form_element_with_name,
            :check_form_button
          ], tag
        end

        def check_tag_name_downcase(tag)
          if tag.tag_name =~ /[A-Z]/
            ["标签名必须小写", :warn]
          end
        end

        def check_img_must_have_alt(tag)
          if tag.tag_name_equal? 'img'
            unless tag.has_prop?(:alt)
              ["img标签必须加上alt属性", :warn]
            end
          end
        end

        def check_hyperlink_with_target(tag)
          if tag.tag_name_equal? 'a' and tag.prop_value(:href) =~ /^#/ and tag.prop_value(:target) != '_self'
            ['功能a必须加target="_self"，除非preventDefault过', :info]
          end
        end

        def check_hyperlink_with_title(tag)
          if tag.tag_name_equal? 'a' and tag.prop_value(:href) =~ /^[^#]/
            unless (prop = tag.prop_value(:title)) and !prop.empty?
              ['非功能能点的a标签必须加上title属性', :warn]
            end
          end
        end

        def check_unique_script_import(tag)
          if tag.tag_name_equal? 'script'
            src = tag.prop_value(:src).to_s
            if @imported_scripts.include? src
              ["避免重复引用同一或相同功能文件", :warn]
            else
              @imported_scripts << src
              nil
            end
          end
        end

        def check_unique_style_import(tag)
          if tag.tag_name_equal? 'link' and tag.prop_value(:rel) =~ /stylesheet/i
            src = tag.prop_value(:href).to_s
            if @imported_css.include? src
              ["避免重复引用同一或相同功能文件", :warn]
            else
              @imported_css << src
              nil
            end
          end
        end

        def check_no_import_in_style_tag(tag)
          if tag.tag_name_equal? 'style' and tag.inner_text =~ /@import\s/m
            ["不通过@import在页面上引入CSS", :warn]
          end
        end

        def check_head_contain_meta_and_title(tag)
          if tag.tag_name_equal? 'head'
            children = tag.children
            has_meta = children.any? { |e| e.tag_name_equal? 'meta' and e.prop_value('charset') }
            has_title = children.any? { |e| e.tag_name_equal? 'title' }
            unless has_meta and has_title
              ["head必须包含字符集meta和title", :warn]
            end
          end
        end

        def check_block_in_block(tag)
          if !tag.tag_name_equal?('a') and tag.inline? and tag.children.any? { |e| !e.inline? }
            ["行内标签不得包含块级标签，a标签例外", :warn]
          end
        end

        def check_form_element_with_name(tag)
          if (tag.tag_name_equal?('input') and %w(text radio checkbox).include?(tag.prop_value('type').to_s.downcase) or 
          tag.tag_name_equal?('select') or
          tag.tag_name_equal?('textarea'))
            val = tag.prop_value('name')
            unless val and !val.empty?
              ["text、radio、checkbox、textarea、select必须加name属性", :warn]
            end
          end
        end

        def check_form_button(tag)
          if tag.tag_name_equal?('input') and %w(button submit reset).include?(tag.prop_value('type').to_s.downcase)
            ["所有按钮必须用button（button/submit/reset）", :warn]
          end
        end

        # PROPERTY

        def check_prop(prop)
          check [
            :check_inline_style_prop,
            :check_prop_name_downcase,
            :check_id_prop_value_downcase,
            :check_class_prop_value_downcase,
            :check_prop_value_sep,
            :check_prop_value_exsit,
            :check_class_count
          ], prop
        end

        def check_inline_style_prop(prop)
          if prop.name =~ /^style$/im
            ["不能定义内嵌样式style", :warn]
          end
        end

        def check_prop_name_downcase(prop)
          if prop.name =~ /[A-Z]/
            ["属性名必须小写，连字符用中横线", :warn]
          end
        end

        def check_id_prop_value_downcase(prop)
          if prop.name_equal? 'id' and prop.value =~ /[A-Z]/
            ["id名称全部小写，单词分隔使用中横线", :warn]
          end
        end

        def check_class_prop_value_downcase(prop)
          if prop.name_equal? 'class' and prop.value =~ /[A-Z]/
            ["class名称全部小写，单词分隔使用中横线", :warn]
          end
        end

        def check_prop_value_sep(prop)
          if prop.value and prop.sep != '"'
            ["属性值必须使用双引号", :warn]
          end
        end

        def check_prop_value_exsit(prop)
          if prop.value.nil?
            ["不能仅有属性名", :warn]
          end
        end

        def check_class_count(prop)
          if prop.name_equal? 'class'
            names = prop.value.split /\s+/
            names.reject! { |s| s =~ /^(fd-|layout|grid|w952)\b/ }
            if names.size > 3
              ["一个节点上定义的class个数最多不超过3个(不含lib中的class)", :warn]
            end
          end
        end

        private
        def check(items, node)
          results = []
          items.each do |item|
            result = self.send(item, node)
            result && (results << result.flatten)
          end
          results
        end


      end




    end
  end
end
