// import React from 'react';


// const ResponseFormatter = ({ response }:{response:string}) => {
//   const formatText = (text:any) => {
//     // Split by double asterisks for bold sections
//     const boldSections = text.split('**');
    
//     // Split by triple asterisks for emphasis/sub-points

//     const formatSection = (section:string, index:number) => {
//       const emphasisSections = section.split('***');
      
//       return emphasisSections.map((emphSection: string, empIndex: number) => {
//         // Check if this is a heading (contains ":")
//         if (emphSection.includes(':') && empIndex === 0) {
//           const [title, ...rest] = emphSection.split(':');
//           return (
//             <React.Fragment key={`emp-${index}-${empIndex}`}>
//               <span className="font-semibold">{title}:</span>
//               {rest.join(':')}
//             </React.Fragment>
//           );
//         }
//         return (
//           <span 
//             key={`emp-${index}-${empIndex}`}
//             className={empIndex % 2 === 1 ? 'text-blue-600 font-medium' : ''}
//           >
//             {emphSection}
//           </span>
//         );
//       });
//     };

//     return boldSections.map((section:string, index:number) => {
//       if (index % 2 === 1) {
//         // This is a bold section
//         return (
//           <div key={`section-${index}`} className="font-bold my-2">
//             {formatSection(section, index)}
//           </div>
//         );
//       }
//       // Regular section
//       return (
//         <span key={`section-${index}`}>
//           {formatSection(section, index)}
//         </span>
//       );
//     });
//   };

//   return (
//     <div className="prose max-w-none">
//       <div className="space-y-4 text-gray-700">
//         {formatText(response)}
//       </div>
//     </div>
//   );
// };

// // Example usage component
// function ChatMessageFormatter({ message }: { message: string }) {
//   return (
//     <div className="bg-white rounded-lg shadow-sm p-4 my-2">
//       <ResponseFormatter response={message} />
//     </div>
//   );
// };  

// export default ChatMessageFormatter;

// import React from 'react';

// type FormattingType = {
//   type: 'heading' | 'subheading' | 'bullet' | 'text' | 'code' | 'table' | 'callout' | 'quote';
//   content: string;
//   level?: number;
//   indent?: number;
//   headers?: string[];
//   rows?: string[][];
//   variant?: 'info' | 'warning' | 'success' | 'error';
// };

// interface ResponseFormatterProps {
//   response: string;
// }

// const ResponseFormatter: React.FC<ResponseFormatterProps> = ({ response }) => {
//   // Parse the text into structured format with enhanced parsing
//   const parseText = (text: string): FormattingType[] => {
//     const lines = text.split('\n').filter(line => line.trim());
//     const formattedLines: FormattingType[] = [];
//     let currentTable: string[][] = [];
//     let isInTable = false;
    
//     lines.forEach((line, index) => {
//       const trimmedLine = line.trim();
      
//       // Handle table parsing
//       if (trimmedLine.startsWith('|') && trimmedLine.endsWith('|')) {
//         if (!isInTable) {
//           isInTable = true;
//           currentTable = [];
//         }
        
//         const cells = trimmedLine
//           .split('|')
//           .filter(cell => cell.trim())
//           .map(cell => cell.trim());
        
//         currentTable.push(cells);
        
//         if (!lines[index + 1]?.trim().startsWith('|')) {
//           formattedLines.push({
//             type: 'table',
//             content: '',
//             headers: currentTable[0],
//             rows: currentTable.slice(2)
//           });
//           isInTable = false;
//           currentTable = [];
//         }
//         return;
//       }
      
//       // Handle callouts
//       if (trimmedLine.startsWith(':::')) {
//         const variant = trimmedLine.split(' ')[1] as 'info' | 'warning' | 'success' | 'error';
//         const content = trimmedLine.split(' ').slice(2).join(' ');
//         formattedLines.push({
//           type: 'callout',
//           content,
//           variant
//         });
//         return;
//       }
      
//       // Handle blockquotes
//       if (trimmedLine.startsWith('>')) {
//         formattedLines.push({
//           type: 'quote',
//           content: trimmedLine.slice(1).trim()
//         });
//         return;
//       }
      
//       if (trimmedLine.match(/^\*?\d+\./)) {
//         const level = (trimmedLine.match(/^\*+/) || [''])[0].length;
//         formattedLines.push({
//           type: 'heading',
//           content: trimmedLine.replace(/^\*?\d+\.\s*/, ''),
//           level: level + 1
//         });
//       } else if (trimmedLine.startsWith('*')) {
//         const indent = (trimmedLine.match(/^\*+/) || [''])[0].length;
//         formattedLines.push({
//           type: 'bullet',
//           content: trimmedLine.replace(/^\*+\s*/, ''),
//           indent
//         });
//       } else if (trimmedLine.includes('```')) {
//         formattedLines.push({
//           type: 'code',
//           content: trimmedLine.replace(/```/g, '').trim()
//         });
//       } else {
//         formattedLines.push({
//           type: 'text',
//           content: trimmedLine
//         });
//       }
//     });
    
//     return formattedLines;
//   };

//   const renderTable = (headers: string[], rows: string[][]) => {
//     return (
//       <div className="overflow-x-auto my-4 rounded-lg shadow">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {headers.map((header, index) => (
//                 <th
//                   key={index}
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                 >
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {rows.map((row, rowIndex) => (
//               <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
//                 {row.map((cell, cellIndex) => (
//                   <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {cell}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderCallout = (content: string, variant: 'info' | 'warning' | 'success' | 'error') => {
//     const variantStyles = {
//       info: 'bg-blue-50 border-blue-200 text-blue-800',
//       warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
//       success: 'bg-green-50 border-green-200 text-green-800',
//       error: 'bg-red-50 border-red-200 text-red-800'
//     };

//     return (
//       <div className={`p-4 my-4 border-l-4 rounded-r ${variantStyles[variant]}`}>
//         {content}
//       </div>
//     );
//   };

//   const renderQuote = (content: string) => {
//     return (
//       <blockquote className="pl-4 my-4 border-l-4 border-gray-300 italic text-gray-700">
//         {content}
//       </blockquote>
//     );
//   };

//   const renderContent = (item: FormattingType) => {
//     switch (item.type) {
//       case 'table':
//         return item.headers && item.rows ? renderTable(item.headers, item.rows) : null;
      
//       case 'callout':
//         return item.variant ? renderCallout(item.content, item.variant) : null;
      
//       case 'quote':
//         return renderQuote(item.content);
      
//       case 'heading':
//         const headingClasses = {
//           1: 'text-3xl font-bold mb-4',
//           2: 'text-2xl font-bold mb-3',
//           3: 'text-xl font-bold mb-2',
//           4: 'text-lg font-bold mb-2',
//           5: 'text-base font-bold mb-2',
//           6: 'text-sm font-bold mb-2'
//         };
//         return (
//           <div className={`mt-6 ${headingClasses[(item.level || 1) as keyof typeof headingClasses]}`}>
//             {formatInlineStyles(item.content)}
//           </div>
//         );
      
//       case 'bullet':
//         return (
//           <li className={`ml-${(item.indent || 1) * 4} mb-2`}>
//             {formatInlineStyles(item.content)}
//           </li>
//         );
      
//       case 'code':
//         return (
//           <pre className="bg-gray-100 p-4 rounded-lg my-4 overflow-x-auto text-sm font-mono">
//             <code>
//               {item.content}
//             </code>
//           </pre>
//         );
      
//       default:
//         return (
//           <p className="mb-4 text-gray-700">
//             {formatInlineStyles(item.content)}
//           </p>
//         );
//     }
//   };

//   const formatInlineStyles = (text: string) => {
//     const parts = text.split(/(\*\*\*.*?\*\*\*|\*\*.*?\*\*)/g);
    
//     return parts.map((part, index) => {
//       if (part.startsWith('***') && part.endsWith('***')) {
//         const content = part.slice(3, -3);
//         return (
//           <span key={index} className="font-bold text-blue-600">
//             {content}
//           </span>
//         );
//       } else if (part.startsWith('**') && part.endsWith('**')) {
//         const content = part.slice(2, -2);
//         return (
//           <span key={index} className="font-bold">
//             {content}
//           </span>
//         );
//       }
//       return part;
//     });
//   };

//   const formattedContent = parseText(response);

//   return (
//     <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
//       <div className="p-6">
//         <div className="space-y-2">
//           {formattedContent.map((item, index) => (
//             <div key={index}>
//               {item.type === 'bullet' ? (
//                 <ul className="list-disc ml-4">
//                   {renderContent(item)}
//                 </ul>
//               ) : (
//                 renderContent(item)
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export const ChatMessageFormatter: React.FC<{ message: string }> = ({ message }) => {
//   return (
//     <div className="my-4">
//       <ResponseFormatter response={message} />
//     </div>
//   );
// };

// export default ChatMessageFormatter;

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