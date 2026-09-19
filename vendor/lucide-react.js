import { jsx } from './jsx-runtime.js'
const symbols={ArrowLeft:'←',ArrowRight:'→',ArrowUpRight:'↗',Check:'✓',ChevronDown:'⌄',Menu:'☰',MessageCircle:'◌',PackageCheck:'▣',Ruler:'⌁',Search:'⌕',ShieldCheck:'◇',Truck:'▰',X:'×'}
const icon=name=>props=>jsx('span',{...props,className:`icon ${props?.className||''}`,'aria-hidden':'true',children:symbols[name]})
export const ArrowLeft=icon('ArrowLeft'),ArrowRight=icon('ArrowRight'),ArrowUpRight=icon('ArrowUpRight'),Check=icon('Check'),ChevronDown=icon('ChevronDown'),Menu=icon('Menu'),MessageCircle=icon('MessageCircle'),PackageCheck=icon('PackageCheck'),Ruler=icon('Ruler'),Search=icon('Search'),ShieldCheck=icon('ShieldCheck'),Truck=icon('Truck'),X=icon('X')
