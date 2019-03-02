(self["webpackJsonp"] = self["webpackJsonp"] || []).push([[39],{

/***/ "C:\\src\\gena.github.io\\experiments\\ee-dag\\node_modules\\monaco-editor\\esm\\vs\\basic-languages\\ruby\\ruby.js":
/*!***************************************************************************************************************!*\
  !*** C:/src/gena.github.io/experiments/ee-dag/node_modules/monaco-editor/esm/vs/basic-languages/ruby/ruby.js ***!
  \***************************************************************************************************************/
/*! exports provided: conf, language */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"conf\", function() { return conf; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"language\", function() { return language; });\n/*---------------------------------------------------------------------------------------------\r\n *  Copyright (c) Microsoft Corporation. All rights reserved.\r\n *  Licensed under the MIT License. See License.txt in the project root for license information.\r\n *--------------------------------------------------------------------------------------------*/\r\n\r\nvar conf = {\r\n    comments: {\r\n        lineComment: '#',\r\n        blockComment: ['=begin', '=end'],\r\n    },\r\n    brackets: [\r\n        ['(', ')'],\r\n        ['{', '}'],\r\n        ['[', ']']\r\n    ],\r\n    autoClosingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n        { open: '\\'', close: '\\'' },\r\n    ],\r\n    surroundingPairs: [\r\n        { open: '{', close: '}' },\r\n        { open: '[', close: ']' },\r\n        { open: '(', close: ')' },\r\n        { open: '\"', close: '\"' },\r\n        { open: '\\'', close: '\\'' },\r\n    ]\r\n};\r\n/*\r\n * Ruby language definition\r\n *\r\n * Quite a complex language due to elaborate escape sequences\r\n * and quoting of literate strings/regular expressions, and\r\n * an 'end' keyword that does not always apply to modifiers like until and while,\r\n * and a 'do' keyword that sometimes starts a block, but sometimes is part of\r\n * another statement (like 'while').\r\n *\r\n * (1) end blocks:\r\n * 'end' may end declarations like if or until, but sometimes 'if' or 'until'\r\n * are modifiers where there is no 'end'. Also, 'do' sometimes starts a block\r\n * that is ended by 'end', but sometimes it is part of a 'while', 'for', or 'until'\r\n * To do proper brace matching we do some elaborate state manipulation.\r\n * some examples:\r\n *\r\n *   until bla do\r\n *     work until tired\r\n *     list.each do\r\n *       something if test\r\n *     end\r\n *   end\r\n *\r\n * or\r\n *\r\n * if test\r\n *  something (if test then x end)\r\n *  bar if bla\r\n * end\r\n *\r\n * or, how about using class as a property..\r\n *\r\n * class Test\r\n *   def endpoint\r\n *     self.class.endpoint || routes\r\n *   end\r\n * end\r\n *\r\n * (2) quoting:\r\n * there are many kinds of strings and escape sequences. But also, one can\r\n * start many string-like things as '%qx' where q specifies the kind of string\r\n * (like a command, escape expanded, regular expression, symbol etc.), and x is\r\n * some character and only another 'x' ends the sequence. Except for brackets\r\n * where the closing bracket ends the sequence.. and except for a nested bracket\r\n * inside the string like entity. Also, such strings can contain interpolated\r\n * ruby expressions again (and span multiple lines). Moreover, expanded\r\n * regular expression can also contain comments.\r\n */\r\nvar language = {\r\n    tokenPostfix: '.ruby',\r\n    keywords: [\r\n        '__LINE__', '__ENCODING__', '__FILE__', 'BEGIN', 'END', 'alias', 'and', 'begin',\r\n        'break', 'case', 'class', 'def', 'defined?', 'do', 'else', 'elsif', 'end',\r\n        'ensure', 'for', 'false', 'if', 'in', 'module', 'next', 'nil', 'not', 'or', 'redo',\r\n        'rescue', 'retry', 'return', 'self', 'super', 'then', 'true', 'undef', 'unless',\r\n        'until', 'when', 'while', 'yield',\r\n    ],\r\n    keywordops: [\r\n        '::', '..', '...', '?', ':', '=>'\r\n    ],\r\n    builtins: [\r\n        'require', 'public', 'private', 'include', 'extend', 'attr_reader',\r\n        'protected', 'private_class_method', 'protected_class_method', 'new'\r\n    ],\r\n    // these are closed by 'end' (if, while and until are handled separately)\r\n    declarations: [\r\n        'module', 'class', 'def', 'case', 'do', 'begin', 'for', 'if', 'while', 'until', 'unless'\r\n    ],\r\n    linedecls: [\r\n        'def', 'case', 'do', 'begin', 'for', 'if', 'while', 'until', 'unless'\r\n    ],\r\n    operators: [\r\n        '^', '&', '|', '<=>', '==', '===', '!~', '=~', '>', '>=', '<', '<=', '<<', '>>', '+',\r\n        '-', '*', '/', '%', '**', '~', '+@', '-@', '[]', '[]=', '`',\r\n        '+=', '-=', '*=', '**=', '/=', '^=', '%=', '<<=', '>>=', '&=', '&&=', '||=', '|='\r\n    ],\r\n    brackets: [\r\n        { open: '(', close: ')', token: 'delimiter.parenthesis' },\r\n        { open: '{', close: '}', token: 'delimiter.curly' },\r\n        { open: '[', close: ']', token: 'delimiter.square' }\r\n    ],\r\n    // we include these common regular expressions\r\n    symbols: /[=><!~?:&|+\\-*\\/\\^%\\.]+/,\r\n    // escape sequences\r\n    escape: /(?:[abefnrstv\\\\\"'\\n\\r]|[0-7]{1,3}|x[0-9A-Fa-f]{1,2}|u[0-9A-Fa-f]{4})/,\r\n    escapes: /\\\\(?:C\\-(@escape|.)|c(@escape|.)|@escape)/,\r\n    decpart: /\\d(_?\\d)*/,\r\n    decimal: /0|@decpart/,\r\n    delim: /[^a-zA-Z0-9\\s\\n\\r]/,\r\n    heredelim: /(?:\\w+|'[^']*'|\"[^\"]*\"|`[^`]*`)/,\r\n    regexpctl: /[(){}\\[\\]\\$\\^|\\-*+?\\.]/,\r\n    regexpesc: /\\\\(?:[AzZbBdDfnrstvwWn0\\\\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})?/,\r\n    // The main tokenizer for our languages\r\n    tokenizer: {\r\n        // Main entry.\r\n        // root.<decl> where decl is the current opening declaration (like 'class')\r\n        root: [\r\n            // identifiers and keywords\r\n            // most complexity here is due to matching 'end' correctly with declarations.\r\n            // We distinguish a declaration that comes first on a line, versus declarations further on a line (which are most likey modifiers)\r\n            [/^(\\s*)([a-z_]\\w*[!?=]?)/, ['white',\r\n                    {\r\n                        cases: {\r\n                            'for|until|while': { token: 'keyword.$2', next: '@dodecl.$2' },\r\n                            '@declarations': { token: 'keyword.$2', next: '@root.$2' },\r\n                            'end': { token: 'keyword.$S2', next: '@pop' },\r\n                            '@keywords': 'keyword',\r\n                            '@builtins': 'predefined',\r\n                            '@default': 'identifier'\r\n                        }\r\n                    }]],\r\n            [/[a-z_]\\w*[!?=]?/,\r\n                {\r\n                    cases: {\r\n                        'if|unless|while|until': { token: 'keyword.$0x', next: '@modifier.$0x' },\r\n                        'for': { token: 'keyword.$2', next: '@dodecl.$2' },\r\n                        '@linedecls': { token: 'keyword.$0', next: '@root.$0' },\r\n                        'end': { token: 'keyword.$S2', next: '@pop' },\r\n                        '@keywords': 'keyword',\r\n                        '@builtins': 'predefined',\r\n                        '@default': 'identifier'\r\n                    }\r\n                }],\r\n            [/[A-Z][\\w]*[!?=]?/, 'constructor.identifier'],\r\n            [/\\$[\\w]*/, 'global.constant'],\r\n            [/@[\\w]*/, 'namespace.instance.identifier'],\r\n            [/@@[\\w]*/, 'namespace.class.identifier'],\r\n            // here document\r\n            [/<<[-~](@heredelim).*/, { token: 'string.heredoc.delimiter', next: '@heredoc.$1' }],\r\n            [/[ \\t\\r\\n]+<<(@heredelim).*/, { token: 'string.heredoc.delimiter', next: '@heredoc.$1' }],\r\n            [/^<<(@heredelim).*/, { token: 'string.heredoc.delimiter', next: '@heredoc.$1' }],\r\n            // whitespace\r\n            { include: '@whitespace' },\r\n            // strings\r\n            [/\"/, { token: 'string.d.delim', next: '@dstring.d.\"' }],\r\n            [/'/, { token: 'string.sq.delim', next: '@sstring.sq' }],\r\n            // % literals. For efficiency, rematch in the 'pstring' state\r\n            [/%([rsqxwW]|Q?)/, { token: '@rematch', next: 'pstring' }],\r\n            // commands and symbols\r\n            [/`/, { token: 'string.x.delim', next: '@dstring.x.`' }],\r\n            [/:(\\w|[$@])\\w*[!?=]?/, 'string.s'],\r\n            [/:\"/, { token: 'string.s.delim', next: '@dstring.s.\"' }],\r\n            [/:'/, { token: 'string.s.delim', next: '@sstring.s' }],\r\n            // regular expressions. Lookahead for a (not escaped) closing forwardslash on the same line\r\n            [/\\/(?=(\\\\\\/|[^\\/\\n])+\\/)/, { token: 'regexp.delim', next: '@regexp' }],\r\n            // delimiters and operators\r\n            [/[{}()\\[\\]]/, '@brackets'],\r\n            [/@symbols/, {\r\n                    cases: {\r\n                        '@keywordops': 'keyword',\r\n                        '@operators': 'operator',\r\n                        '@default': ''\r\n                    }\r\n                }],\r\n            [/[;,]/, 'delimiter'],\r\n            // numbers\r\n            [/0[xX][0-9a-fA-F](_?[0-9a-fA-F])*/, 'number.hex'],\r\n            [/0[_oO][0-7](_?[0-7])*/, 'number.octal'],\r\n            [/0[bB][01](_?[01])*/, 'number.binary'],\r\n            [/0[dD]@decpart/, 'number'],\r\n            [/@decimal((\\.@decpart)?([eE][\\-+]?@decpart)?)/, {\r\n                    cases: {\r\n                        '$1': 'number.float',\r\n                        '@default': 'number'\r\n                    }\r\n                }],\r\n        ],\r\n        // used to not treat a 'do' as a block opener if it occurs on the same\r\n        // line as a 'do' statement: 'while|until|for'\r\n        // dodecl.<decl> where decl is the declarations started, like 'while'\r\n        dodecl: [\r\n            [/^/, { token: '', switchTo: '@root.$S2' }],\r\n            [/[a-z_]\\w*[!?=]?/, {\r\n                    cases: {\r\n                        'end': { token: 'keyword.$S2', next: '@pop' },\r\n                        'do': { token: 'keyword', switchTo: '@root.$S2' },\r\n                        '@linedecls': { token: '@rematch', switchTo: '@root.$S2' },\r\n                        '@keywords': 'keyword',\r\n                        '@builtins': 'predefined',\r\n                        '@default': 'identifier'\r\n                    }\r\n                }],\r\n            { include: '@root' }\r\n        ],\r\n        // used to prevent potential modifiers ('if|until|while|unless') to match\r\n        // with 'end' keywords.\r\n        // modifier.<decl>x where decl is the declaration starter, like 'if'\r\n        modifier: [\r\n            [/^/, '', '@pop'],\r\n            [/[a-z_]\\w*[!?=]?/, {\r\n                    cases: {\r\n                        'end': { token: 'keyword.$S2', next: '@pop' },\r\n                        'then|else|elsif|do': { token: 'keyword', switchTo: '@root.$S2' },\r\n                        '@linedecls': { token: '@rematch', switchTo: '@root.$S2' },\r\n                        '@keywords': 'keyword',\r\n                        '@builtins': 'predefined',\r\n                        '@default': 'identifier'\r\n                    }\r\n                }],\r\n            { include: '@root' }\r\n        ],\r\n        // single quote strings (also used for symbols)\r\n        // sstring.<kind>  where kind is 'sq' (single quote) or 's' (symbol)\r\n        sstring: [\r\n            [/[^\\\\']+/, 'string.$S2'],\r\n            [/\\\\\\\\|\\\\'|\\\\$/, 'string.$S2.escape'],\r\n            [/\\\\./, 'string.$S2.invalid'],\r\n            [/'/, { token: 'string.$S2.delim', next: '@pop' }]\r\n        ],\r\n        // double quoted \"string\".\r\n        // dstring.<kind>.<delim> where kind is 'd' (double quoted), 'x' (command), or 's' (symbol)\r\n        // and delim is the ending delimiter (\" or `)\r\n        dstring: [\r\n            [/[^\\\\`\"#]+/, 'string.$S2'],\r\n            [/#/, 'string.$S2.escape', '@interpolated'],\r\n            [/\\\\$/, 'string.$S2.escape'],\r\n            [/@escapes/, 'string.$S2.escape'],\r\n            [/\\\\./, 'string.$S2.escape.invalid'],\r\n            [/[`\"]/, {\r\n                    cases: {\r\n                        '$#==$S3': { token: 'string.$S2.delim', next: '@pop' },\r\n                        '@default': 'string.$S2'\r\n                    }\r\n                }]\r\n        ],\r\n        // literal documents\r\n        // heredoc.<close> where close is the closing delimiter\r\n        heredoc: [\r\n            [/^(\\s*)(@heredelim)$/, {\r\n                    cases: {\r\n                        '$2==$S2': ['string.heredoc', { token: 'string.heredoc.delimiter', next: '@pop' }],\r\n                        '@default': ['string.heredoc', 'string.heredoc']\r\n                    }\r\n                }],\r\n            [/.*/, 'string.heredoc'],\r\n        ],\r\n        // interpolated sequence\r\n        interpolated: [\r\n            [/\\$\\w*/, 'global.constant', '@pop'],\r\n            [/@\\w*/, 'namespace.class.identifier', '@pop'],\r\n            [/@@\\w*/, 'namespace.instance.identifier', '@pop'],\r\n            [/[{]/, { token: 'string.escape.curly', switchTo: '@interpolated_compound' }],\r\n            ['', '', '@pop'],\r\n        ],\r\n        // any code\r\n        interpolated_compound: [\r\n            [/[}]/, { token: 'string.escape.curly', next: '@pop' }],\r\n            { include: '@root' },\r\n        ],\r\n        // %r quoted regexp\r\n        // pregexp.<open>.<close> where open/close are the open/close delimiter\r\n        pregexp: [\r\n            { include: '@whitespace' },\r\n            // turns out that you can quote using regex control characters, aargh!\r\n            // for example; %r|kgjgaj| is ok (even though | is used for alternation)\r\n            // so, we need to match those first\r\n            [/[^\\(\\{\\[\\\\]/, {\r\n                    cases: {\r\n                        '$#==$S3': { token: 'regexp.delim', next: '@pop' },\r\n                        '$#==$S2': { token: 'regexp.delim', next: '@push' },\r\n                        '~[)}\\\\]]': '@brackets.regexp.escape.control',\r\n                        '~@regexpctl': 'regexp.escape.control',\r\n                        '@default': 'regexp'\r\n                    }\r\n                }],\r\n            { include: '@regexcontrol' },\r\n        ],\r\n        // We match regular expression quite precisely\r\n        regexp: [\r\n            { include: '@regexcontrol' },\r\n            [/[^\\\\\\/]/, 'regexp'],\r\n            ['/[ixmp]*', { token: 'regexp.delim' }, '@pop'],\r\n        ],\r\n        regexcontrol: [\r\n            [/(\\{)(\\d+(?:,\\d*)?)(\\})/, ['@brackets.regexp.escape.control', 'regexp.escape.control', '@brackets.regexp.escape.control']],\r\n            [/(\\[)(\\^?)/, ['@brackets.regexp.escape.control', { token: 'regexp.escape.control', next: '@regexrange' }]],\r\n            [/(\\()(\\?[:=!])/, ['@brackets.regexp.escape.control', 'regexp.escape.control']],\r\n            [/\\(\\?#/, { token: 'regexp.escape.control', next: '@regexpcomment' }],\r\n            [/[()]/, '@brackets.regexp.escape.control'],\r\n            [/@regexpctl/, 'regexp.escape.control'],\r\n            [/\\\\$/, 'regexp.escape'],\r\n            [/@regexpesc/, 'regexp.escape'],\r\n            [/\\\\\\./, 'regexp.invalid'],\r\n            [/#/, 'regexp.escape', '@interpolated'],\r\n        ],\r\n        regexrange: [\r\n            [/-/, 'regexp.escape.control'],\r\n            [/\\^/, 'regexp.invalid'],\r\n            [/\\\\$/, 'regexp.escape'],\r\n            [/@regexpesc/, 'regexp.escape'],\r\n            [/[^\\]]/, 'regexp'],\r\n            [/\\]/, '@brackets.regexp.escape.control', '@pop'],\r\n        ],\r\n        regexpcomment: [\r\n            [/[^)]+/, 'comment'],\r\n            [/\\)/, { token: 'regexp.escape.control', next: '@pop' }]\r\n        ],\r\n        // % quoted strings\r\n        // A bit repetitive since we need to often special case the kind of ending delimiter\r\n        pstring: [\r\n            [/%([qws])\\(/, { token: 'string.$1.delim', switchTo: '@qstring.$1.(.)' }],\r\n            [/%([qws])\\[/, { token: 'string.$1.delim', switchTo: '@qstring.$1.[.]' }],\r\n            [/%([qws])\\{/, { token: 'string.$1.delim', switchTo: '@qstring.$1.{.}' }],\r\n            [/%([qws])</, { token: 'string.$1.delim', switchTo: '@qstring.$1.<.>' }],\r\n            [/%([qws])(@delim)/, { token: 'string.$1.delim', switchTo: '@qstring.$1.$2.$2' }],\r\n            [/%r\\(/, { token: 'regexp.delim', switchTo: '@pregexp.(.)' }],\r\n            [/%r\\[/, { token: 'regexp.delim', switchTo: '@pregexp.[.]' }],\r\n            [/%r\\{/, { token: 'regexp.delim', switchTo: '@pregexp.{.}' }],\r\n            [/%r</, { token: 'regexp.delim', switchTo: '@pregexp.<.>' }],\r\n            [/%r(@delim)/, { token: 'regexp.delim', switchTo: '@pregexp.$1.$1' }],\r\n            [/%(x|W|Q?)\\(/, { token: 'string.$1.delim', switchTo: '@qqstring.$1.(.)' }],\r\n            [/%(x|W|Q?)\\[/, { token: 'string.$1.delim', switchTo: '@qqstring.$1.[.]' }],\r\n            [/%(x|W|Q?)\\{/, { token: 'string.$1.delim', switchTo: '@qqstring.$1.{.}' }],\r\n            [/%(x|W|Q?)</, { token: 'string.$1.delim', switchTo: '@qqstring.$1.<.>' }],\r\n            [/%(x|W|Q?)(@delim)/, { token: 'string.$1.delim', switchTo: '@qqstring.$1.$2.$2' }],\r\n            [/%([rqwsxW]|Q?)./, { token: 'invalid', next: '@pop' }],\r\n            [/./, { token: 'invalid', next: '@pop' }],\r\n        ],\r\n        // non-expanded quoted string.\r\n        // qstring.<kind>.<open>.<close>\r\n        //  kind = q|w|s  (single quote, array, symbol)\r\n        //  open = open delimiter\r\n        //  close = close delimiter\r\n        qstring: [\r\n            [/\\\\$/, 'string.$S2.escape'],\r\n            [/\\\\./, 'string.$S2.escape'],\r\n            [/./, {\r\n                    cases: {\r\n                        '$#==$S4': { token: 'string.$S2.delim', next: '@pop' },\r\n                        '$#==$S3': { token: 'string.$S2.delim', next: '@push' },\r\n                        '@default': 'string.$S2'\r\n                    }\r\n                }],\r\n        ],\r\n        // expanded quoted string.\r\n        // qqstring.<kind>.<open>.<close>\r\n        //  kind = Q|W|x  (double quote, array, command)\r\n        //  open = open delimiter\r\n        //  close = close delimiter\r\n        qqstring: [\r\n            [/#/, 'string.$S2.escape', '@interpolated'],\r\n            { include: '@qstring' }\r\n        ],\r\n        // whitespace & comments\r\n        whitespace: [\r\n            [/[ \\t\\r\\n]+/, ''],\r\n            [/^\\s*=begin\\b/, 'comment', '@comment'],\r\n            [/#.*$/, 'comment'],\r\n        ],\r\n        comment: [\r\n            [/[^=]+/, 'comment'],\r\n            [/^\\s*=begin\\b/, 'comment.invalid'],\r\n            [/^\\s*=end\\b.*/, 'comment', '@pop'],\r\n            [/[=]/, 'comment']\r\n        ],\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack:///C:/src/gena.github.io/experiments/ee-dag/node_modules/monaco-editor/esm/vs/basic-languages/ruby/ruby.js?");

/***/ })

}]);