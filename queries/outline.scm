; Outline entries for function declarations
(function_declaration
  name: (identifier) @symbol
  (#set! kind "Function"))

; Struct declarations
(struct_declaration
  name: (identifier) @symbol
  (#set! kind "Struct"))

; Enum declarations
(enum_declaration
  name: (identifier) @symbol
  (#set! kind "Enum"))

; Callback declarations
(callback_declaration
  name: (identifier) @symbol
  (#set! kind "Function"))

; Interrupt declarations
(interrupt_declaration
  name: (identifier) @symbol
  (#set! kind "Function"))

; Event declarations
(event_declaration
  name: (identifier) @symbol
  (#set! kind "Event"))

; Register declarations
(register_declaration
  name: (identifier) @symbol
  (#set! kind "Variable"))

; Type aliases
(type_declaration
  name: (identifier) @symbol
  (#set! kind "Type"))

; Variables
(variable_declaration
  name: (identifier) @symbol
  (#set! kind "Variable"))
