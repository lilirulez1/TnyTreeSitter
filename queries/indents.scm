; Indent inside blocks
((block) @indent.begin
 (#set! indent.open true)
 (#set! indent.increase 1))

((block "}") @indent.end
 (#set! indent.close true)
 (#set! indent.decrease 1))

; Function declarations with a block body
((function_declaration body: (block) @indent.begin)
 (#set! indent.increase 1))

; If/else statements
((if_statement consequence: (statement) @indent.begin)
 (#set! indent.increase 1))

((if_statement alternative: (statement) @indent.begin)
 (#set! indent.increase 1))

; While loops
((while_statement body: (statement) @indent.begin)
 (#set! indent.increase 1))

; For loops
((for_statement body: (statement) @indent.begin)
 (#set! indent.increase 1))

; Interrupts with blocks
((interrupt_declaration body: (block) @indent.begin)
 (#set! indent.increase 1))

; Statements ending in semicolons should reset indent
((expression_statement) @indent.end)
((return_statement) @indent.end)
((variable_statement) @indent.end)
((variable_declaration) @indent.end)
