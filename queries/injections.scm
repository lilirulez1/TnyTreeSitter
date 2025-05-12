; Inject assembly language into asm blocks
(asm_statement
  "{" @asm.start
  "}" @asm.end)

; Specify the injected language
; Replace "nasm" with "gas" or "c" if that's more appropriate
((asm_statement) @injection.content
 (#set! injection.language "assembly")
 (#set! injection.include-children))
