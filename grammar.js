/**
 * @file Tny grammar for tree-sitter
 * @author Liam Yates <liamyates2010@icloud.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "tny",

  extras: ($) => [/\s/, $.comment],

  conflicts: ($) => [[$.type, $.primary]],

  precedence: ($) => [[PREC.RIGHT, $.if_statement]],

  rules: {
    source_file: ($) => repeat($._declaration),

    comment: ($) => token(seq("//", /.*/)),

    _declaration: ($) =>
      choice(
        $.struct_declaration,
        $.module_declaration,
        $.use_declaration,
        $.interrupt_declaration,
        $.function_declaration,
        $.variable_declaration,
        $.callback_declaration,
        $.event_declaration,
        $.enum_declaration,
        $.register_declaration,
        $.type_declaration,
      ),

    struct_declaration: ($) =>
      seq(
        optional($.modifiers),
        "struct",
        field("name", $.identifier),
        "{",
        repeat($.struct_field),
        "}",
      ),

    struct_field: ($) => seq($.type, $.identifier, ";"),

    module_declaration: ($) =>
      seq(
        optional($.modifiers),
        "module",
        $.identifier,
        repeat(seq(".", $.identifier)),
        ";",
      ),

    use_declaration: ($) =>
      seq(
        optional($.modifiers),
        "use",
        $.identifier,
        repeat(seq(".", $.identifier)),
        ";",
      ),

    interrupt_declaration: ($) =>
      seq(
        optional($.modifiers),
        "interrupt",
        field("name", $.identifier),
        "(",
        optional($.param_list),
        ")",
        $.block,
      ),

    function_declaration: ($) =>
      seq(
        optional($.modifiers),
        field("return_type", $.type),
        field("name", $.identifier),
        "(",
        optional($.param_list),
        ")",
        $.block,
      ),

    callback_declaration: ($) =>
      seq(
        optional($.modifiers),
        "callback",
        field("return_type", $.type),
        field("name", $.identifier),
        "(",
        optional($.param_list),
        ")",
        ";",
      ),

    event_declaration: ($) =>
      seq(
        optional($.modifiers),
        "event",
        field("name", $.identifier),
        "(",
        optional($.param_list),
        ")",
        ";",
      ),

    enum_declaration: ($) =>
      seq(
        optional($.modifiers),
        "enum",
        field("name", $.identifier),
        optional(seq(":", $.type)),
        "{",
        repeat($.enum_field),
        "}",
      ),

    enum_field: ($) => seq($.identifier, optional(seq("=", $.literal))),

    register_declaration: ($) =>
      seq(
        optional($.modifiers),
        "register",
        field("type", $.type),
        field("name", $.identifier),
        "=",
        $.expression,
        ";",
      ),

    type_declaration: ($) =>
      seq(
        optional($.modifiers),
        "type",
        field("name", $.identifier),
        "=",
        $.expression,
        ";",
      ),

    variable_declaration: ($) =>
      seq(
        optional($.modifiers),
        field("name", $.identifier),
        optional(seq("=", $.expression)),
        ";",
      ),

    modifiers: ($) => repeat1(choice($.attribute, "export", "inline")),

    attribute: ($) =>
      seq("@", $.identifier, optional(seq("=", $.attribute_value))),
    attribute_value: ($) => choice($.literal, $.identifier),

    param_list: ($) => seq($.param, repeat(seq(",", $.param))),
    param: ($) => seq($.type, $.identifier),

    block: ($) => seq("{", repeat($.statement), "}"),

    statement: ($) =>
      choice(
        $.asm_statement,
        $.expression_statement,
        $.variable_statement,
        $.for_statement,
        $.if_statement,
        $.while_statement,
        $.return_statement,
        $.block,
      ),

    return_statement: ($) => seq("return", $.expression, ";"),
    while_statement: ($) => seq("while", "(", $.expression, ")", $.statement),
    for_statement: ($) =>
      seq(
        "for",
        "(",
        $.for_initializer,
        optional($.expression),
        ";",
        optional($.expression),
        ")",
        $.statement,
      ),
    for_initializer: ($) =>
      choice($.variable_statement, $.expression_statement, ";"),

    if_statement: ($) =>
      prec.right(
        seq(
          "if",
          "(",
          $.expression,
          ")",
          field("consequence", $.statement),
          optional(seq("else", field("alternative", $.statement))),
        ),
      ),

    expression_statement: ($) => seq($.expression, ";"),
    variable_statement: ($) =>
      seq($.type, $.identifier, optional(seq("=", $.expression)), ";"),

    asm_statement: ($) => seq("asm", "{", repeat($.primary), "}"),

    expression: ($) => $.assignment,

    assignment: ($) =>
      seq($.or, optional(seq($.assignment_operator, $.assignment))),

    assignment_operator: ($) =>
      choice(
        "=",
        "+=",
        "-=",
        "*=",
        "/=",
        "&=",
        "|=",
        "^=",
        "~=",
        "<<=",
        ">>=",
        ">>>=",
      ),

    or: ($) => seq($.and, repeat(seq("or", $.and))),
    and: ($) => seq($.bitwise_or, repeat(seq("and", $.bitwise_or))),

    bitwise_or: ($) => seq($.bitwise_xor, repeat(seq("|", $.bitwise_xor))),
    bitwise_xor: ($) => seq($.bitwise_and, repeat(seq("^", $.bitwise_and))),
    bitwise_and: ($) => seq($.equality, repeat(seq("&", $.equality))),

    equality: ($) =>
      seq($.comparison, optional(seq(choice("!=", "=="), $.comparison))),
    comparison: ($) =>
      seq($.shift, optional(seq(choice(">", ">=", "<", "<="), $.shift))),
    shift: ($) => seq($.term, optional(seq(choice("<<", ">>", ">>>"), $.term))),
    term: ($) => seq($.factor, repeat(seq(choice("+", "-"), $.factor))),
    factor: ($) => seq($.unary, repeat(seq(choice("/", "*"), $.unary))),

    unary: ($) =>
      choice(
        seq(choice("!", "-", "~", "++", "--", "*", "&"), $.unary),
        seq($.call, optional(choice("++", "--"))),
      ),

    call: ($) =>
      seq($.primary, repeat(choice($.call_suffix, $.field_access_suffix))),
    call_suffix: ($) =>
      seq(
        "(",
        optional(seq($.expression, repeat(seq(",", $.expression)))),
        ")",
      ),
    field_access_suffix: ($) => seq(".", $.identifier),

    lambda_expression: ($) =>
      seq(
        "[",
        optional($.param_list),
        "]",
        "(",
        optional($.param_list),
        ")",
        "=>",
        $.block,
      ),

    primary: ($) => choice($.literal, $.identifier, $.lambda_expression),

    type: ($) => seq($.identifier, repeat(choice("*", "&"))),

    identifier: ($) => /[a-zA-Z_][a-zA-Z0-9_]*/,
    literal: ($) => choice($.number, $.string, "true", "false"),

    number: ($) => /[0-9]+/,
    string: ($) => /".*?"/,
  },
});
