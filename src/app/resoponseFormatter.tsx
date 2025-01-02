
import React from 'react';

function ChatMessageFormatter({ message }:{message:string}) {
  // Helper function to extract headings from the message
  function extractHeadings(message: string) {
    const headingLines = message.split('\n').filter(line => line.startsWith('#'));
    return headingLines.map(line => {
      const level = line.match(/^#+/)?.[0].length || 1;
      const content = line.replace(/^#+\s*/, '');
      return { level, content };
    });
  }

  const headings = extractHeadings(message);

  return (
    <div className="container mx-auto px-4">
      {headings.map((heading) => (
        <h2
          key={heading.content}
          className={`text-${heading.level * 2}xl font-bold mb-4`} // Make headings bold
        >
          {heading.content}
        </h2>
      ))}

      <div
        dangerouslySetInnerHTML={{
          __html: message
            .replace(/^(#+)\s*(.*)$/gm, '') // Remove extracted headings
            .replace(/ \* /g, '<br /> <strong>*</strong> ') // Add line break and style for single asterisks
            .replace(/^\*\*(\d+\.\s+)(.*)\*\*/gm, '<br/><br/><strong>$1$2</strong>')// Make bold text within double asterisks bold
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Make bold text within double asterisks bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Emphasize text
            .replace( /^> (.*)$/gm,
              '<blockquote class="border-l-4 border-gray-300 p-4">$1</blockquote>'
            ) // Blockquotes
            
            .replace(
              /^[\t ]*• (.*)$/gm,
              '<br /><li class="list-item text-white">$1</li><br />' // Make list item text lighter and add line break
            ) // Unordered lists
            .replace(
              /^[\t ]*(\d+\. )(.*)$/gm,
              '<br /><li class="list-none flex flex-row text-white">$1$2</li><br />' // Make list item text lighter and add line break
            ) // Ordered lists
            .replace(
              /^[\t ]*[\-\+] (.*)$/gm,
              '<br /><li class="list-item text-white">$1</li><br />' // Make list item text lighter and add line break
            ) // Nested lists
            // Add the formatted Python code here
            .replace(
              /```python\n((.|\n)*?)```/g,
              '<br /><pre class="language-python w-full flex flex-row  overflow-scroll"><code class="language-python w-full flex flex-row">$1</code></pre><br/>'
            )
            .replace(/```javascript\n((.|\n)*?)```/g, 
              '<br /><pre class="language-js w-full flex flex-row  overflow-scroll"><code class="language-python w-full flex flex-row">$1</code></pre><br/>')
            .replace(/```c\+\+\n((.|\n)*?)```/g, 
              '<br /><pre class="language-c++ w-full flex flex-row  overflow-scroll"><code class="language-python w-full flex flex-row">$1</code></pre><br/>') 
            // Add more language-specific replacements for other languages (e.g., C, Rust, Ruby, etc.)
            .replace(/```(.*?)\n((.|\n)*?)```/g, 
              '<br /><pre class="language-python w-full flex flex-row  overflow-scroll"><code class="language-python w-full flex flex-row">$1</code></pre><br/>') 
              .replace(/```c\n((.|\n)*?)```/g, 
                '<br /><pre class="language-c w-full flex flex-row  overflow-scroll"><code class="language-c">$1</code></pre><br />')
              .replace(/```java\n((.|\n)*?)```/g, 
                '<br /><pre class="language-java w-full flex flex-row  overflow-scroll"><code class="language-java">$1</code></pre><br />')
              .replace(/```go\n((.|\n)*?)```/g, 
                '<br /><pre class="language-go w-full flex flex-row  overflow-scroll"><code class="language-go">$1</code></pre><br />')
              .replace(/```rust\n((.|\n)*?)```/g, 
                '<br /><pre class="language-rust w-full flex flex-row  overflow-scroll"><code class="language-rust">$1</code></pre><br />')
              .replace(/```html\n((.|\n)*?)```/g, 
                '<br /><pre class="language-html w-full flex flex-row  overflow-scroll"><code class="language-html">$1</code></pre><br />')
              .replace(/```dotnet\n((.|\n)*?)```/g, 
                '<br /><pre class="language-dotnet w-full flex flex-row  overflow-scroll"><code class="language-dotnet">$1</code></pre><br />')
              
            .replace(/(\*)/g, '<br />$1') // Add line break before each asterisk
            .replace(/^[\t ]*\d+\.\s*/, '') // Remove leading number and dot from ordered lists
            .replace(/\t/g, '    ') 
        }}
      />
    </div>
  );
}

export default ChatMessageFormatter;