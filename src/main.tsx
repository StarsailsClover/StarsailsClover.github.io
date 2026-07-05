import { createRoot } from 'react-dom/client'
import App from './App'

// 字体自托管（@fontsource-variable）
import '@fontsource-variable/fraunces'
import '@fontsource-variable/manrope'
import '@fontsource-variable/outfit'

import './index.css'

// 注：R3F + StrictMode 在 dev 下会双挂载导致 WebGL 上下文丢失抖动，故不启用 StrictMode
createRoot(document.getElementById('root')!).render(<App />)
