require_relative '../node'

module XRay
  module JS
    Node = XRay::Node

    class Program < Node
      attr_reader :elements

      def initialize(elements)
        @elements = elements
      end

      def text
        elements.collect(&:text).join("\n")
      end

      def position
        elements.empty? ? nil : elements[0].position
      end
    end

    class FunctionDeclaraion < Node
      attr_reader :name, :parameters, :body

      def initialize(name, parameters, body, pos)
        super(nil, pos)
        @name, @parameters, @body = name, parameters, body
      end

      def text
        "function #{name}(#{parameters.collect(&:text).join(', ')}) {\n #{body} \n}"  
      end
    end

    class Statement < Node
    end

    class StatementSimple < Statement
      attr_reader :value

      def initialize(value, position)
        super(nil, position)
        @value = value
      end

      def text
        "#{value};" 
      end
    end

    class StatementBlock < Statement
      attr_reader :statements

      def initialize(statements, position)
        super(nil, position)
        @statements = statements
      end

      def text
        "{\n#{statements.collect(&:text).join("\n")}}"
      end
    end

    class StatementVar < Statement
      attr_reader :declarations
      
      def initialize(declarations, position)
        super(nil, position)
        @declarations = declarations
      end

      def text
        "var #{declartions.collect(&:text).join(', ')};" 
      end
    end

    class StatementVarDeclaration < Node
      attr_reader :name, :expression
      
      def initialize(name, expression)
        @name, @expression = name, expression
      end

      def text
        expression ? "#{name} = #{expression}" : name.text
      end

      def position
        name.position
      end
    end
  
  end
end