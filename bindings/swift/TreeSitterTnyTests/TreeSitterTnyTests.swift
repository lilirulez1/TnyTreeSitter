import XCTest
import SwiftTreeSitter
import TreeSitterTny

final class TreeSitterTnyTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_tny())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Tny grammar")
    }
}
