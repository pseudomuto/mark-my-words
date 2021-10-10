import fs from 'fs'
import fsp from 'fs/promises'
import markdown from './markdown'

// I'm trusting that marked has been sufficiently tested. This is just here as a sanity check and to create a place to
// add any regression tests as time goes on.
const tests = [
  // name, input, expected
  ['simple input', '**bold**', '<p><strong>bold</strong></p>'],
  ['code blocks', '```ruby\nputs "Something"\n```', '<pre><code class="language-ruby">puts &quot;Something&quot;\n</code></pre>']
]

describe('md', () => {
  test.each(tests)('%s should convert correctly', (name, input, expected) => {
    expect(markdown.md(input).trim()).toBe(expected)
  })
})

describe('mdFile', () => {
  const files = fs
    .readdirSync('testdata')
    .filter(f => f.endsWith('.md'))
    .map(f => [`testdata/${f.replace('.md', '.html')}`, `testdata/${f}`])

  test.each(files)('renders %s from %s', async (html, md) => {
    const res = await fsp.readFile(html, 'utf8')
    expect(await markdown.mdFile(md)).toBe(res)
  })
})
