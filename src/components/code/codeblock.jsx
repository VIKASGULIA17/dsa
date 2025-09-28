import React, { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Copy, Check, Code2 } from 'lucide-react'

export const CodeBlock = ({ codeTemplates, templateId }) => {
  const [activeLanguage, setActiveLanguage] = useState('cpp')
  const [copiedStates, setCopiedStates] = useState({})

  const languages = [
    { id: 'cpp', name: 'C++', icon: '🔵' },
    { id: 'java', name: 'Java', icon: '☕' },
    { id: 'python', name: 'Python', icon: '🐍' },
    { id: 'javascript', name: 'JavaScript', icon: '🟡' }
  ]

  const handleCopy = (langId) => {
    setCopiedStates({ ...copiedStates, [langId]: true })
    setTimeout(() => {
      setCopiedStates({ ...copiedStates, [langId]: false })
    }, 2000)
  }

  const getLanguageForSyntaxHighlighter = (langId) => {
    const mapping = {
      cpp: 'cpp',
      java: 'java', 
      python: 'python',
      javascript: 'javascript'
    }
    return mapping[langId] || 'text'
  }

  const customStyle = {
    ...oneDark,
    'pre[class*="language-"]': {
      ...oneDark['pre[class*="language-"]'],
      background: '#0f0f0f',
      margin: 0,
      padding: '1.5rem',
      borderRadius: '0',
      fontSize: '14px',
      lineHeight: '1.6'
    },
    'code[class*="language-"]': {
      ...oneDark['code[class*="language-"]'],
      background: 'transparent',
      fontSize: '14px',
      fontFamily: "'Monaco', 'Menlo', 'Ubuntu Mono', monospace"
    }
  }

  return (
    <div className="bg-neutral-950 rounded-b-2xl overflow-hidden">
      {/* Language Tabs */}
      <div className="flex bg-neutral-900 border-b border-neutral-800 overflow-x-auto">
        {languages.map((lang) => (
          <button
            key={lang.id}
            onClick={() => setActiveLanguage(lang.id)}
            className={`flex items-center space-x-2 px-6 py-3 font-medium transition-all flex-shrink-0 ${
              activeLanguage === lang.id
                ? 'bg-neutral-950 text-white border-b-2 border-blue-500'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
            }`}
            data-testid={`lang-tab-${lang.id}`}
          >
            <span>{lang.icon}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Code Content */}
      <div className="relative">
        {languages.map((lang) => (
          <div
            key={lang.id}
            className={`${activeLanguage === lang.id ? 'block' : 'hidden'}`}
          >
            {/* Copy Button */}
            <div className="absolute top-4 right-4 z-10">
              <CopyToClipboard
                text={codeTemplates[lang.id] || '// Code not available'}
                onCopy={() => handleCopy(lang.id)}
              >
                <button
                  className="flex items-center space-x-2 px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white rounded-lg transition-all border border-neutral-700"
                  data-testid={`copy-btn-${lang.id}`}
                >
                  {copiedStates[lang.id] ? (
                    <>
                      <Check size={16} className="text-green-400" />
                      <span className="text-sm">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span className="text-sm">Copy</span>
                    </>
                  )}
                </button>
              </CopyToClipboard>
            </div>

            {/* Code Display */}
            {codeTemplates[lang.id] ? (
              <SyntaxHighlighter
                language={getLanguageForSyntaxHighlighter(lang.id)}
                style={customStyle}
                customStyle={{
                  background: '#0f0f0f',
                  margin: 0,
                  padding: '1.5rem',
                  paddingTop: '3rem' // Space for copy button
                }}
                wrapLines={true}
                wrapLongLines={true}
                className="text-sm"
              >
                {codeTemplates[lang.id]}
              </SyntaxHighlighter>
            ) : (
              <div className="p-8 text-center text-neutral-500">
                <Code2 className="mx-auto mb-4" size={48} />
                <p className="text-lg">Code template not available for {lang.name}</p>
                <p className="text-sm mt-2">This implementation is coming soon!</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="bg-neutral-900 px-6 py-4 border-t border-neutral-800">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-neutral-400 mb-2 sm:mb-0">
            <strong className="text-neutral-300">Language:</strong> {
              languages.find(l => l.id === activeLanguage)?.name
            }
          </div>
          <div className="text-sm text-neutral-400">
            <strong className="text-neutral-300">Template ID:</strong> {templateId}
          </div>
        </div>
      </div>
    </div>
  )
}