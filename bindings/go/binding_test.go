package tree_sitter_tny_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_tny "github.com/tree-sitter/tree-sitter-tny/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_tny.Language())
	if language == nil {
		t.Errorf("Error loading Tny grammar")
	}
}
