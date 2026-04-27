import { useState, useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useSettings } from '../contexts/SettingsContext'

const COMMANDS = {
  help: {
    desc: 'List available commands',
    run: () => [
      '',
      '  SETTINGS',
      '  ─────────────────────────────────────',
      '  animations     Toggle animations on/off',
      '  parallax       Toggle parallax scrolling',
      '  particles      Toggle animated background',
      '  status         Show current settings',
      '  lang [en|pt]   Switch language',
      '',
      '  NAVIGATION',
      '  ─────────────────────────────────────',
      '  goto [section] Jump to section',
      '                 (home, expertise, portfolio,',
      '                  experience, contact)',
      '',
      '  INFO',
      '  ─────────────────────────────────────',
      '  whoami         About the developer',
      '  stack          Show tech stack',
      '  neofetch       System info display',
      '  projects       List all projects',
      '  skills         Skill proficiency bars',
      '  uptime         Session uptime',
      '  date           Current date/time',
      '  cowsay [msg]   A cow says things',
      '  matrix         Take the red pill',
      '  coffee         Brew some coffee',
      '  ping           Connectivity check',
      '  fortune        Random dev wisdom',
      '  clear          Clear terminal output',
      '',
      '  Tip: Tab to autocomplete. Arrow keys for history.',
      '  Shortcut: Ctrl+` to toggle terminal.',
      '',
    ],
  },
  whoami: {
    desc: 'About the developer',
    run: () => [
      '',
      '  Vinicius Santos Machado',
      '  Fullstack Web & Mobile Developer',
      '  ──────────────────────────────────',
      '  Brand:      VSM Development',
      '  Focus:      React, Node.js, Python, Kotlin',
      '  Location:   Brazil',
      '  Education:  B.S. Computer Engineering (UNINTER)',
      '  Company:    Nativa IA',
      '  Status:     Available for new projects',
      '',
    ],
  },
  stack: {
    desc: 'Show tech stack',
    run: () => [
      '',
      '  ┌─ Frontend ────────────────────────┐',
      '  │  React / TypeScript               │',
      '  │  Tailwind CSS                     │',
      '  │  Jetpack Compose (Android)        │',
      '  └───────────────────────────────────┘',
      '  ┌─ Backend ─────────────────────────┐',
      '  │  Node.js / Express                │',
      '  │  Python / FastAPI                 │',
      '  │  PostgreSQL / pgvector            │',
      '  └───────────────────────────────────┘',
      '  ┌─ Mobile ──────────────────────────┐',
      '  │  Kotlin / Java                    │',
      '  │  Android SDK                      │',
      '  │  Room Database                    │',
      '  └───────────────────────────────────┘',
      '  ┌─ DevOps ──────────────────────────┐',
      '  │  Docker / Docker Compose          │',
      '  │  Git / GitHub                     │',
      '  └───────────────────────────────────┘',
      '',
    ],
  },
  neofetch: {
    desc: 'System info',
    run: () => {
      const now = new Date()
      return [
        '',
        '       ██╗   ██╗███████╗███╗   ███╗',
        '       ██║   ██║██╔════╝████╗ ████║',
        '       ██║   ██║███████╗██╔████╔██║',
        '       ╚██╗ ██╔╝╚════██║██║╚██╔╝██║',
        '        ╚████╔╝ ███████║██║ ╚═╝ ██║',
        '         ╚═══╝  ╚══════╝╚═╝     ╚═╝',
        '',
        `  OS:       VSM Development v2.0`,
        `  Host:     ${window.location.hostname || 'localhost'}`,
        `  Kernel:   React 19 + Vite 8`,
        `  Shell:    vsm-terminal 1.0`,
        `  Uptime:   ${Math.floor((now.getTime() % 86400000) / 3600000)}h ${Math.floor((now.getTime() % 3600000) / 60000)}m`,
        `  Packages: framer-motion, i18next, lucide`,
        `  CPU:      Fullstack Engine x8`,
        `  GPU:      Tailwind CSS v4 Accelerated`,
        `  Memory:   Unlimited Ambition`,
        `  Disk:     ${Math.floor(Math.random() * 40 + 60)}% creative capacity used`,
        '',
      ]
    },
  },
  projects: {
    desc: 'List all projects',
    run: () => [
      '',
      '  ID   NAME               TYPE     STACK',
      '  ── ─────────────────── ──────── ────────────────────',
      '  01   Debrid Searcher    Web      React, Node.js',
      '  02   Chatbot RAG        Web      FastAPI, PostgreSQL',
      '  03   Remedi             Mobile   Kotlin, MVVM',
      '  04   AInformation       Mobile   Kotlin, Compose',
      '',
      '  Use "goto portfolio" to see them in detail.',
      '',
    ],
  },
  skills: {
    desc: 'Skill proficiency bars',
    run: () => [
      '',
      '  React        ████████████████████░░  90%',
      '  TypeScript   ██████████████████░░░░  82%',
      '  Node.js      ████████████████████░░  88%',
      '  Python       ████████████████░░░░░░  75%',
      '  Kotlin       ████████████████████░░  85%',
      '  PostgreSQL   ██████████████████░░░░  80%',
      '  Docker       ██████████████░░░░░░░░  65%',
      '  FastAPI      ████████████████░░░░░░  78%',
      '  Compose      ██████████████████░░░░  82%',
      '  CSS/TW       ████████████████████░░  92%',
      '',
    ],
  },
  matrix: {
    desc: 'Take the red pill',
    run: () => {
      const chars = 'ﾊﾐﾋｰｳｼﾅﾓﾆｻﾜﾂｵﾘｱﾎﾃﾏｹﾒｴｶｷﾑﾕﾗｾﾈｽﾀﾇﾍ012345789Z'
      const lines = []
      for (let i = 0; i < 8; i++) {
        let line = '  '
        for (let j = 0; j < 42; j++) {
          line += chars[Math.floor(Math.random() * chars.length)]
        }
        lines.push(line)
      }
      return [
        '',
        ...lines,
        '',
        '  Wake up, developer...',
        '  The Matrix has you...',
        '  Follow the green cursor.',
        '',
      ]
    },
  },
  coffee: {
    desc: 'Brew some coffee',
    run: () => [
      '',
      '       ( (',
      '        ) )',
      '      ........',
      '      |      |]',
      '      \\      /',
      '       `----\'',
      '',
      '  Brewing fresh coffee...',
      '  [████████████████████] 100%',
      '  Coffee ready! Productivity +50%',
      '',
    ],
  },
  ping: {
    desc: 'Connectivity check',
    run: () => {
      const ms = () => Math.floor(Math.random() * 15 + 5)
      return [
        '',
        `  PING vsm.dev (127.0.0.1): 56 bytes`,
        `  64 bytes: seq=0 ttl=64 time=${ms()}.${ms()}ms`,
        `  64 bytes: seq=1 ttl=64 time=${ms()}.${ms()}ms`,
        `  64 bytes: seq=2 ttl=64 time=${ms()}.${ms()}ms`,
        `  64 bytes: seq=3 ttl=64 time=${ms()}.${ms()}ms`,
        '',
        `  --- vsm.dev ping statistics ---`,
        `  4 packets transmitted, 4 received, 0% loss`,
        '',
      ]
    },
  },
  fortune: {
    desc: 'Random dev wisdom',
    run: () => {
      const fortunes = [
        '"Any fool can write code that a computer can understand.\n  Good programmers write code that humans can understand."\n  — Martin Fowler',
        '"First, solve the problem. Then, write the code."\n  — John Johnson',
        '"The best error message is the one that never shows up."\n  — Thomas Fuchs',
        '"Code is like humor. When you have to explain it, it\'s bad."\n  — Cory House',
        '"Simplicity is the soul of efficiency."\n  — Austin Freeman',
        '"Make it work, make it right, make it fast."\n  — Kent Beck',
        '"Talk is cheap. Show me the code."\n  — Linus Torvalds',
        '"Programs must be written for people to read,\n  and only incidentally for machines to execute."\n  — Harold Abelson',
        '"The only way to go fast is to go well."\n  — Robert C. Martin',
        '"Deleted code is debugged code."\n  — Jeff Sickel',
      ]
      const pick = fortunes[Math.floor(Math.random() * fortunes.length)]
      return ['', `  ${pick}`, '']
    },
  },
  date: {
    desc: 'Current date/time',
    run: () => {
      const now = new Date()
      return [
        '',
        `  ${now.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}`,
        `  ${now.toLocaleTimeString('en-US')}`,
        `  Timezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
        '',
      ]
    },
  },
  uptime: {
    desc: 'Session uptime',
    run: () => {
      const perf = performance.now()
      const secs = Math.floor(perf / 1000)
      const mins = Math.floor(secs / 60)
      const hrs = Math.floor(mins / 60)
      return [
        '',
        `  Session uptime: ${hrs}h ${mins % 60}m ${secs % 60}s`,
        `  Page loaded ${((perf) / 1000).toFixed(1)}s ago`,
        '',
      ]
    },
  },
}

// Session start time for uptime
const sessionStart = Date.now()

export default function Terminal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    {
      type: 'system',
      lines: [
        '  VSM Development Terminal v2.0',
        '  Type "help" for available commands.',
        '',
      ],
    },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)
  const { settings, toggle } = useSettings()
  const { i18n } = useTranslation()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const execute = useCallback(
    (raw) => {
      const trimmed = raw.trim()
      if (!trimmed) return

      const parts = trimmed.split(/\s+/)
      const cmd = parts[0].toLowerCase()
      const arg = parts.slice(1).join(' ')
      const argLower = arg.toLowerCase()

      const entry = { type: 'input', text: trimmed }
      let output

      if (cmd === 'clear') {
        setHistory([])
        setCmdHistory((prev) => [...prev, trimmed])
        setHistoryIndex(-1)
        return
      }

      if (cmd === 'animations') {
        toggle('animations')
        const next = !settings.animations
        output = { type: 'output', lines: [`  Animations ${next ? 'enabled' : 'disabled'}.`] }
      } else if (cmd === 'parallax') {
        toggle('parallax')
        const next = !settings.parallax
        output = { type: 'output', lines: [`  Parallax ${next ? 'enabled' : 'disabled'}.`] }
      } else if (cmd === 'particles') {
        toggle('particles')
        const next = !settings.particles
        output = { type: 'output', lines: [`  Animated background ${next ? 'enabled' : 'disabled'}.`] }
      } else if (cmd === 'status') {
        output = {
          type: 'output',
          lines: [
            '',
            '  Current Settings:',
            `    animations  : ${settings.animations ? 'ON' : 'OFF'}`,
            `    parallax    : ${settings.parallax ? 'ON' : 'OFF'}`,
            `    particles   : ${settings.particles ? 'ON' : 'OFF'}`,
            `    language    : ${i18n.language}`,
            '',
          ],
        }
      } else if (cmd === 'lang') {
        if (argLower === 'en' || argLower === 'pt') {
          i18n.changeLanguage(argLower)
          output = {
            type: 'output',
            lines: [`  Language set to ${argLower === 'en' ? 'English' : 'Portuguese'}.`],
          }
        } else {
          output = { type: 'error', lines: ['  Usage: lang [en|pt]'] }
        }
      } else if (cmd === 'goto') {
        const valid = ['home', 'expertise', 'portfolio', 'experience', 'contact']
        if (argLower && valid.includes(argLower)) {
          const el = document.getElementById(argLower)
          if (el) el.scrollIntoView({ behavior: settings.animations ? 'smooth' : 'auto' })
          output = { type: 'output', lines: [`  Navigating to ${argLower}...`] }
        } else {
          output = {
            type: 'error',
            lines: [`  Usage: goto [${valid.join(' | ')}]`],
          }
        }
      } else if (cmd === 'cowsay') {
        const msg = arg || 'Moo! Hire Vinicius!'
        const border = '─'.repeat(msg.length + 2)
        output = {
          type: 'output',
          lines: [
            '',
            `   ┌${border}┐`,
            `   │ ${msg} │`,
            `   └${border}┘`,
            '          \\   ^__^',
            '           \\  (oo)\\_______',
            '              (__)\\       )\\/\\',
            '                  ||----w |',
            '                  ||     ||',
            '',
          ],
        }
      } else if (cmd === 'sudo') {
        output = {
          type: 'error',
          lines: [
            '',
            '  Nice try. You are not in the sudoers file.',
            '  This incident will be reported.',
            '',
          ],
        }
      } else if (cmd === 'rm' || cmd === 'delete') {
        output = {
          type: 'error',
          lines: ['', '  I appreciate the enthusiasm, but lets keep things constructive.', ''],
        }
      } else if (cmd === 'exit' || cmd === 'quit') {
        onClose()
        setCmdHistory((prev) => [...prev, trimmed])
        setHistoryIndex(-1)
        return
      } else if (cmd === 'hello' || cmd === 'hi' || cmd === 'hey') {
        output = {
          type: 'output',
          lines: [
            '',
            '  Hey there! Welcome to VSM Development.',
            '  Feel free to explore with "help".',
            '',
          ],
        }
      } else if (COMMANDS[cmd]) {
        output = { type: 'output', lines: COMMANDS[cmd].run() }
      } else {
        output = {
          type: 'error',
          lines: [`  Command not found: ${cmd}`, '  Type "help" for available commands.'],
        }
      }

      setHistory((prev) => [...prev, entry, output])
      setCmdHistory((prev) => [...prev, trimmed])
      setHistoryIndex(-1)
    },
    [settings, toggle, i18n, onClose]
  )

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      execute(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const newIndex =
          historyIndex < cmdHistory.length - 1 ? historyIndex + 1 : historyIndex
        setHistoryIndex(newIndex)
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '')
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(cmdHistory[cmdHistory.length - 1 - newIndex] || '')
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      const partial = input.toLowerCase().trim()
      if (partial) {
        const allCmds = [
          ...Object.keys(COMMANDS),
          'animations',
          'parallax',
          'particles',
          'status',
          'lang',
          'goto',
          'clear',
          'cowsay',
          'exit',
          'sudo',
        ]
        const match = allCmds.find((c) => c.startsWith(partial))
        if (match) setInput(match)
      }
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - click outside to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[199] bg-void/30 backdrop-blur-[2px] md:bg-transparent md:backdrop-blur-none"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[200] w-[min(580px,calc(100vw-32px))]"
          >
            <div className="terminal-window shadow-2xl shadow-accent/5">
              {/* Title bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-edge/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <button
                      onClick={onClose}
                      className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors cursor-pointer"
                      aria-label="Close terminal"
                    />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                    <div className="w-3 h-3 rounded-full bg-green-500/70" />
                  </div>
                  <span className="text-[0.7rem] text-muted ml-2 font-mono">vsm@dev:~</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[0.65rem] text-muted/60 font-mono hidden sm:block">
                    Ctrl+` | Esc
                  </span>
                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-edge/60 px-2.5 py-1 text-[0.65rem] font-mono text-dim transition-colors hover:border-accent/40 hover:text-txt cursor-pointer"
                    aria-label="Close terminal"
                  >
                    Close
                  </button>
                </div>
              </div>

              {/* Output */}
              <div
                ref={scrollRef}
                className="px-4 py-3 max-h-[360px] overflow-y-auto"
                onClick={() => inputRef.current?.focus()}
              >
                {history.map((entry, i) => (
                  <div key={i} className="mb-0.5">
                    {entry.type === 'input' && (
                      <div className="flex gap-2">
                        <span className="text-accent shrink-0">$</span>
                        <span className="text-txt">{entry.text}</span>
                      </div>
                    )}
                    {entry.type === 'output' &&
                      entry.lines.map((line, j) => (
                        <div key={j} className="text-dim whitespace-pre leading-snug">
                          {line}
                        </div>
                      ))}
                    {entry.type === 'error' &&
                      entry.lines.map((line, j) => (
                        <div key={j} className="text-red-400/80 whitespace-pre leading-snug">
                          {line}
                        </div>
                      ))}
                    {entry.type === 'system' &&
                      entry.lines.map((line, j) => (
                        <div key={j} className="text-cyan whitespace-pre leading-snug">
                          {line}
                        </div>
                      ))}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-edge/30">
                <span className="text-accent text-sm shrink-0">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  placeholder="type a command..."
                  spellCheck={false}
                  autoComplete="off"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
