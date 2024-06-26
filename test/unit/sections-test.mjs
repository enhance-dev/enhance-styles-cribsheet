import test from 'tape'
import {
  getSections
} from '../../src/routes/api/_styleguide/regex/sections.mjs'

test('should extract sections', t=> {
  const input = `
  /*** SOMETHING ***/
  :root {
    --one: red;
    --two: green;

    --three: blue;
  }

  .foo {
    display: content;

    text-align: center;
  }

  /*** OR ***/
  .bar {
    color: red;
  }
  /*** OTHER ***/
  .baz {
    background: deeppink;
  }
`
  const sections = getSections(input)
  t.equals(sections.length, 3, 'Gets all sections')
  t.equal(sections[0].name, 'SOMETHING', 'Parses first section name')
  t.equal(sections[2].name, 'OTHER', 'Parses last section name')
  t.ok(sections[0].rules, sections[0].rules)
  t.end()
})
