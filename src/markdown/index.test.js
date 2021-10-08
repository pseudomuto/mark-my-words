import md from './index'

// I'm trusting that marked has been sufficiently tested. This is just here as a sanity check and to create a place to
// add any regression tests as time goes on.
const tests = [
  // name, input, expected
  ['simple input', '**bold**', '<p><strong>bold</strong></p>'],
  ['code blocks', '```ruby\nputs "Something"\n```', '<pre><code class="language-ruby">puts &quot;Something&quot;\n</code></pre>']
]

test.each(tests)('%s should convert correctly', (name, input, expected) => {
  expect(md(input).trim()).toBe(expected)
})
