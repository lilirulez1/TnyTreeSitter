;; Keywords
[
  "if"
  "else"
  "for"
  "while"
  "return"
  "inline"
  "export"
  "struct"
  "enum"
  "type"
  "register"
  "interrupt"
  "module"
  "use"
  "callback"
  "event"
  "asm"
  "true"
  "false"
] @keyword

;; Operators
[
  "+"
  "-"
  "*"
  "/"
  "=="
  "!="
  "<"
  ">"
  "<="
  ">="
  "="
  "+="
  "-="
  "*="
  "/="
  "&"
  "|"
  "^"
  "~"
  "<<"
  ">>"
  ">>>"
  "=>"
  "<<="
  ">>="
  ">>>="
  "!"
  "++"
  "--"
] @operator

;; Punctuation
[
  "("
  ")"
  "["
  "]"
  ";"
  ":"
  ","
  "."
] @punctuation.delimiter

[
  "{"
  "}"
] @punctuation.bracket;

[
  ","
  "."
] @punctuation

;; Literals
(number) @number
(string) @string
[
  "true"
  "false"
] @boolean

;; Identifiers
(identifier) @variable
(type) @type
(attribute) @attribute

;; types
(builtin_type) @keyword
(type (builtin_type) @keyword)
(type (identifier) @type)

;; Function and type declarations
(function_declaration name: (identifier) @function)
(struct_declaration name: (identifier) @type)
(enum_declaration name: (identifier) @type)
(type_declaration name: (identifier) @type)
(register_declaration name: (identifier) @variable)
(variable_declaration name: (identifier) @variable)
(callback_declaration name: (identifier) @function)
(event_declaration name: (identifier) @function)
(interrupt_declaration name: (identifier) @function)

;; Comments
(comment) @comment
