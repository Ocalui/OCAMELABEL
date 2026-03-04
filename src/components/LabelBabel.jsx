import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Zap, Database, Monitor, Square, Smartphone, Crosshair, Activity,
  Download, Save, ChevronRight, Archive, Info, CheckCircle2, Layers,
  Settings2, Trash2, Copy, RotateCcw, ZoomIn, Tag, Lock,
  RefreshCw, ToggleLeft, ToggleRight
} from 'lucide-react';
import { toPng } from 'html-to-image';

// ═══════════════════════════════════════════════════════════════════════
// TOKENS
// ═══════════════════════════════════════════════════════════════════════
const TOKENS = {
  oro: '#c4b087', teal: '#2d8b8a', blanco: '#f5f5f9', fondo: '#020305',
  glass: 'rgba(9,10,12,0.85)', borde: 'rgba(255,255,255,0.06)',
  grid: 'rgba(255,255,255,0.03)', scan: 'rgba(196,176,135,0.15)'
};

// ═══════════════════════════════════════════════════════════════════════
// MAGI PROFILES
// ═══════════════════════════════════════════════════════════════════════
const CONFIG_MAGI = [
  {
    id: 'MELCHIOR', nombre: 'Estabilidad Céntrica',
    descripcion: 'Branding masivo y simétrico. Señal de fuerza fundacional.',
    fuente: 'font-black', layout: 'flex-col justify-center items-center',
    escalaBranding: 'text-[130px] md:text-[150px]',
    trackingBranding: 'tracking-tighter', opacidad: '1'
  },
  {
    id: 'BALTHASAR', nombre: 'Asimetría Táctica',
    descripcion: 'Encabezados desplazados. Sistema activo en movimiento.',
    fuente: 'font-black', layout: 'justify-start items-center pl-24',
    escalaBranding: 'text-[125px] md:text-[145px]',
    trackingBranding: 'tracking-tighter', opacidad: '1'
  },
  {
    id: 'CASPAR', nombre: 'Blueprint Minimal',
    descripcion: 'Identidad como marca de agua. Prioridad a datos.',
    fuente: 'font-mono', layout: 'justify-center items-center',
    escalaBranding: 'text-[115px] md:text-[135px]',
    trackingBranding: 'tracking-[0.1em]', opacidad: '0.15'
  }
];

// ═══════════════════════════════════════════════════════════════════════
// PRESETS
// ═══════════════════════════════════════════════════════════════════════
const PRESETS = [
  { id: 'linkedin_hero',       nombre: 'LinkedIn Hero',       teoria: 0, formato: 'landscape', nodoA: 'BARCELONA BASED',    nodoB: 'AI_POLICY_GOV', tags: ['professional','corporate'] },
  { id: 'instagram_post',      nombre: 'Instagram Grid',      teoria: 1, formato: 'square',    nodoA: 'CREATIVE OPERATIONS', nodoB: 'QUALITY_LEAD',   tags: ['social','portfolio']      },
  { id: 'story_announcement',  nombre: 'Story Announcement',  teoria: 2, formato: 'story',     nodoA: 'SYSTEM UPDATE',      nodoB: 'PROTOCOL_ACTIVE',tags: ['mobile','urgent']         }
];

// ═══════════════════════════════════════════════════════════════════════
// BITS — stable per session
// ═══════════════════════════════════════════════════════════════════════
const BITS_POOL = [
  'BCN','SDQ','809','08','FLOP','EUA','GDPR','DATA','LAT_41.3','SIS',
  'SYS','CORE_V4','READY','OPS','11.21','86','20xx','19xx','026','UNIT',
  'FGGT','LOG','NODE','AI_','DevOPS','DIR','CRTV','CMD','LGBT','MR_F',
  'ANUSTART','STRT','PKMN','MFM'
];

const pickBits = () => {
  const pool = [...BITS_POOL];
  const count = Math.random() > 0.5 ? 5 : 4;
  const out = [];
  for (let i = 0; i < count && pool.length; i++) {
    const idx = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(idx, 1)[0]);
  }
  return out;
};

// Export pixel dims
const EXPORT_DIMS = {
  landscape: { w: 1200, h: 630  },
  square:    { w: 1080, h: 1080 },
  story:     { w: 1080, h: 1920 }
};

// ═══════════════════════════════════════════════════════════════════════
// MiniPreview
// ═══════════════════════════════════════════════════════════════════════
const MiniPreview = ({ type, active }) => (
  <div className={`w-16 h-10 border ${active ? 'border-[#c4b087]/60 shadow-[0_0_12px_rgba(196,176,135,0.2)]' : 'border-white/10'} rounded-sm relative overflow-hidden bg-black/70 transition-all duration-300`}>
    <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:4px_4px]" />
    {type === 0 && <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 scale-50"><div className={`w-8 h-2 ${active ? 'bg-[#c4b087]' : 'bg-white/20'}`}/><div className={`w-8 h-2 ${active ? 'bg-[#c4b087]' : 'bg-white/20'}`}/></div>}
    {type === 1 && <div className="absolute inset-0 flex items-center justify-start pl-2 scale-50"><div className={`w-10 h-3 ${active ? 'bg-[#c4b087]' : 'bg-white/20'} -translate-x-1 translate-y-1`}/></div>}
    {type === 2 && <div className="absolute inset-0 flex items-center justify-center scale-50"><div className={`w-10 h-3 border ${active ? 'border-[#c4b087]' : 'border-white/20'} opacity-40`}/><div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#fff_1px,transparent_1px)] bg-[size:3px]"/></div>}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════
// CapaHUD
// ═══════════════════════════════════════════════════════════════════════
const CapaHUD = ({ config, bits }) => {
  const isCaspar = config.teoria === 2;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/8 to-transparent" />
      <div className="absolute top-10 left-10 w-28 h-28 border-t border-l border-white/15" />
      <div className="absolute bottom-10 right-10 w-28 h-28 border-b border-r border-white/15" />
      {isCaspar && <>
        <div className="absolute top-10 right-10 w-28 h-28 border-t border-r border-white/15" />
        <div className="absolute bottom-10 left-10 w-28 h-28 border-b border-l border-white/15" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-white/[0.04]" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-white/[0.04]" />
        <div className="absolute left-0 top-1/3 w-full h-px bg-white/[0.04]" />
        <div className="absolute left-0 top-2/3 w-full h-px bg-white/[0.04]" />
      </>}
      <div className="absolute bottom-10 right-10 p-3 flex flex-col items-end gap-1">
        <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.5em]">SYS</span>
        <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider">V5.0_STABLE</span>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/8 text-5xl font-thin select-none">+</div>
      <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_3px,rgba(196,176,135,0.015)_3px,rgba(196,176,135,0.015)_4px)]" />
      {bits && <>
        {bits[0] && <span className="absolute top-[22%] left-9 font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] rotate-90 origin-left">{bits[0]}</span>}
        {bits[1] && <span className="absolute top-9 right-14 font-mono text-[8px] text-white/20 uppercase tracking-[0.4em]">{bits[1]}</span>}
        {bits[2] && <span className="absolute bottom-[22%] left-9 font-mono text-[8px] text-white/20 uppercase tracking-[0.4em] rotate-90 origin-left">{bits[2]}</span>}
        {bits[3] && <span className="absolute bottom-9 right-14 font-mono text-[8px] text-white/20 uppercase tracking-[0.4em]">{bits[3]}</span>}
        {bits[4] && <span className="absolute top-1/2 right-9 -translate-y-1/2 font-mono text-[8px] text-white/20 uppercase tracking-[0.4em]">{bits[4]}</span>}
      </>}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(58,44,24,0.15)_0%,transparent_70%)]" />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// CintaAviso
// ═══════════════════════════════════════════════════════════════════════
const CintaAviso = ({ tipo = 'top', config }) => {
  const esCaspar = config.teoria === 2;
  return (
    <div className={`${esCaspar ? 'bg-black text-[#c4b087]' : 'bg-[#c4b087] text-black'} h-12 w-full flex items-center justify-between px-8 font-mono text-[10px] font-black tracking-[0.35em] uppercase z-40 shrink-0`}>
      <div className="flex items-center gap-3">
        {tipo === 'top' && <Crosshair size={11} className="shrink-0" />}
        <span>[ {tipo === 'top' ? 'SISTEMA_LISTO' : 'DEEPLY SUPERFICIAL'} ]</span>
      </div>
      <div className="flex items-center gap-4 text-[9px] opacity-60 truncate px-4">
        <span>OCALUI.ME</span>
        <span className="opacity-40">/</span>
        <span>{config.nodoA}</span>
        <span className="opacity-40">/</span>
        <span>{config.nodoB}</span>
      </div>
      <div className={`${esCaspar ? 'bg-[#c4b087] text-black' : 'bg-black text-[#c4b087]'} px-3 py-1 text-[9px] font-black tracking-widest shrink-0`}>
        {config.nodoAnio}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// CanvasDespliegue
// ═══════════════════════════════════════════════════════════════════════
const CanvasDespliegue = ({ config, bits }) => {
  const magi = CONFIG_MAGI[config.teoria];
  const isMelchior = config.teoria === 0;
  const isCaspar   = config.teoria === 2;

  const dimensiones = useMemo(() => {
    switch (config.formato) {
      case 'landscape': return { width: '1000px', aspect: '1200/630' };
      case 'square':    return { width: '600px',  aspect: 'square'   };
      case 'story':     return { width: '380px',  aspect: '9/16'     };
      default:          return { width: '1000px', aspect: '1200/630' };
    }
  }, [config.formato]);

  return (
    <div
      className="relative flex flex-col overflow-hidden bg-[#050608] border border-white/10 shadow-[0_60px_160px_rgba(0,0,0,1)] transition-all duration-700"
      style={{ width: dimensiones.width, aspectRatio: dimensiones.aspect }}
    >
      <CintaAviso tipo="top" config={config} />

      <div className={`flex-1 relative flex ${magi.layout} overflow-hidden`}>
        <CapaHUD config={config} bits={bits} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(196,176,135,0.04)_0%,transparent_65%)] pointer-events-none" />

        <div
          className={`relative z-20 px-[5%] py-[3%] ${magi.fuente} ${magi.escalaBranding} ${magi.trackingBranding} text-[#f5f5f9] uppercase leading-[0.82] select-none`}
          style={{ opacity: magi.opacidad }}
        >
          {isMelchior && config.stacked ? (
            <div className="flex flex-col items-center">
              <span>OCA</span>
              <span>LUI</span>
            </div>
          ) : (
            <span>OCALUI</span>
          )}
        </div>

        <div className={`absolute bottom-12 ${isMelchior ? 'left-1/2 -translate-x-1/2 flex gap-10' : 'right-12 flex gap-8'} z-30`}>
          {['CREATIVE', 'QUALITY', 'OPERATIONS'].map((pilar, i) => (
            <div key={pilar} className="flex flex-col border-l-2 border-white/10 pl-4 py-1">
              <span className="font-mono text-[8px] text-white/30 tracking-[0.4em] uppercase mb-1">PILA_P-0{i + 1}</span>
              <span className={`font-black text-2xl uppercase tracking-tighter leading-none ${isCaspar ? 'text-white/15' : 'text-white'}`}>{pilar}</span>
            </div>
          ))}
        </div>
      </div>

      <CintaAviso tipo="bottom" config={config} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════
export default function LabelBabel() {

  const [teoria,               setTeoria              ] = useState(0);
  const [formato,              setFormato             ] = useState('landscape');
  const [nodoA,                setNodoA               ] = useState('BARCELONA BASED');
  const [nodoB,                setNodoB               ] = useState('AI_POLICY_GOV');
  const [nodoAnio,             setNodoAnio            ] = useState('2026');
  const [boveda,               setBoveda              ] = useState([]);
  const [estadoSincronizacion, setEstadoSincronizacion] = useState('IDLE');
  const [pestanaActiva,        setPestanaActiva       ] = useState('LAB');
  const [filtroMagi,           setFiltroMagi          ] = useState('ALL');
  const [bits,      setBits     ] = useState(() => pickBits());
  const [stacked,   setStacked  ] = useState(false);
  const [exporting, setExporting] = useState(false);

  const canvasRef = useRef(null);

  const configuracionActual = useMemo(() => ({
    teoria, formato, nodoA, nodoB, nodoAnio, stacked
  }), [teoria, formato, nodoA, nodoB, nodoAnio, stacked]);

  const sincronizarBoveda = useCallback(() => {
    setEstadoSincronizacion('SYNCING');
    setTimeout(() => {
      setBoveda(prev => [{
        id: Date.now(),
        ...configuracionActual,
        bits: [...bits],
        magi: CONFIG_MAGI[teoria].id,
        timestamp: new Date().toLocaleTimeString('es-ES'),
        fecha: new Date().toLocaleDateString('es-ES')
      }, ...prev]);
      setEstadoSincronizacion('READY');
      setTimeout(() => setEstadoSincronizacion('IDLE'), 2000);
    }, 1500);
  }, [configuracionActual, teoria, bits]);

  const aplicarPreset = useCallback((preset) => {
    setTeoria(preset.teoria);
    setFormato(preset.formato);
    setNodoA(preset.nodoA);
    setNodoB(preset.nodoB);
  }, []);

  const limpiarConfiguracion = useCallback(() => {
    setTeoria(0); setFormato('landscape');
    setNodoA('BARCELONA BASED'); setNodoB('AI_POLICY_GOV');
    setNodoAnio('2026'); setStacked(false);
    setBits(pickBits());
  }, []);

  const bovedaFiltrada = useMemo(() =>
    filtroMagi === 'ALL' ? boveda : boveda.filter(i => i.magi === filtroMagi),
    [boveda, filtroMagi]
  );

  const handleExport = useCallback(async () => {
    if (!canvasRef.current) return;
    setExporting(true);
    try {
      const node = canvasRef.current.querySelector('#canvas-inner');
      if (!node) return;
      const sz = EXPORT_DIMS[formato];
      const ratio = sz.w / node.offsetWidth;
      const dataUrl = await toPng(node, {
        width: sz.w, height: sz.h, pixelRatio: ratio,
        backgroundColor: '#050608',
        filter: el => !el.classList?.contains('no-export')
      });
      const a = document.createElement('a');
      a.download = `ocalui-${CONFIG_MAGI[teoria].id.toLowerCase()}-${formato}-${Date.now()}.png`;
      a.href = dataUrl; a.click();
    } finally { setExporting(false); }
  }, [formato, teoria]);

  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); if (estadoSincronizacion === 'IDLE') sincronizarBoveda(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'r') { e.preventDefault(); limpiarConfiguracion(); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'e') { e.preventDefault(); handleExport(); }
      if (['1','2','3'].includes(e.key) && !e.metaKey) setTeoria(+e.key - 1);
      if (e.key === 'f' && !e.metaKey) setFormato(p => p === 'landscape' ? 'square' : p === 'square' ? 'story' : 'landscape');
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [estadoSincronizacion, sincronizarBoveda, limpiarConfiguracion, handleExport]);

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#020305] text-[#f5f5f9] overflow-hidden">

      <aside className="w-full lg:w-[440px] bg-[#090a0c]/90 backdrop-blur-2xl border-r border-white/5 flex flex-col z-50 shrink-0">

        <div className="p-7 border-b border-white/5 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-[#c4b087] flex items-center justify-center rounded-sm shadow-[0_4px_20px_rgba(196,176,135,0.3)]">
              <Zap size={22} className="text-black fill-current" />
            </div>
            <div>
              <h1 className="text-base font-black text-white tracking-[0.45em] uppercase leading-none">OCALUI.ME</h1>
              <p className="text-[9px] text-white/30 font-mono mt-1 tracking-[0.12em] uppercase">LABEL BABEL /// V5.0</p>
            </div>
          </div>
          <div className="bg-black/40 border border-white/5 px-4 py-2 rounded-sm">
            <p className="text-[9px] font-mono text-[#c4b087] uppercase tracking-[0.2em]">Creative + Quality & AI Insights</p>
          </div>
        </div>

        <div className="px-7 pt-5 pb-3">
          <div className="flex bg-white/[0.02] p-1 rounded-sm border border-white/5">
            {[
              { id: 'LAB',      icon: <Database size={11}/>, label: 'MAGI LAB' },
              { id: 'ELEMENTS', icon: <Layers   size={11}/>, label: 'ELEMENTS' },
              { id: 'SOCIAL',   icon: <Tag      size={11}/>, label: 'SOCIAL'   },
              { id: 'VAULT',    icon: <Archive  size={11}/>, label: 'VAULT', badge: boveda.length }
            ].map(tab => (
              <button key={tab.id} onClick={() => setPestanaActiva(tab.id)}
                className={`relative flex-1 py-2.5 text-[9px] font-black tracking-[0.12em] transition-all flex items-center justify-center gap-1.5
                  ${pestanaActiva === tab.id ? 'bg-[#c4b087] text-black rounded-sm shadow-[0_4px_12px_rgba(196,176,135,0.4)]' : 'text-gray-600 hover:text-white hover:bg-white/5'}`}>
                {tab.icon} {tab.label}
                {tab.badge > 0 && <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2d8b8a] text-white text-[7px] font-bold rounded-full flex items-center justify-center">{tab.badge}</span>}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-7 pb-32 space-y-8 pt-3" style={{ scrollbarWidth: 'none' }}>

          {pestanaActiva === 'LAB' && (
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#c4b087]/50 flex items-center gap-2"><Database size={11}/> ACTIVE MAGI PROFILE</label>
                {CONFIG_MAGI.map((m, i) => (
                  <button key={m.id} onClick={() => setTeoria(i)}
                    className={`w-full p-5 border transition-all duration-300 flex items-center justify-between rounded-sm
                      ${teoria === i ? 'border-[#c4b087] bg-[#c4b087]/5 shadow-[inset_0_1px_0_rgba(196,176,135,0.2)]' : 'border-white/5 bg-white/[0.01] hover:border-white/10'}`}>
                    <div className="text-left space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-black tracking-widest uppercase ${teoria === i ? 'text-[#c4b087]' : 'text-white'}`}>{m.id}</span>
                        <ChevronRight size={11} className={teoria === i ? 'text-[#c4b087]' : 'text-white/20'} />
                      </div>
                      <p className="text-[7px] font-mono text-white/30 uppercase tracking-wider">{m.descripcion}</p>
                    </div>
                    <MiniPreview type={i} active={teoria === i} />
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                <label className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#c4b087]/50 flex items-center gap-2"><Monitor size={11}/> DEPLOYMENT FORMAT</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'landscape', icon: <Monitor size={14}/>,    label: 'HERO',  dims: '1200x630'  },
                    { id: 'square',    icon: <Square size={14}/>,     label: 'POST',  dims: '1080x1080' },
                    { id: 'story',     icon: <Smartphone size={14}/>, label: 'STORY', dims: '1080x1920' }
                  ].map(f => (
                    <button key={f.id} onClick={() => setFormato(f.id)}
                      className={`flex flex-col items-center gap-3 p-4 border rounded-sm transition-all
                        ${formato === f.id ? 'border-[#c4b087] bg-[#c4b087]/5 text-[#c4b087]' : 'border-white/5 text-gray-700 hover:border-white/15 hover:text-white'}`}>
                      {f.icon}
                      <div className="text-center">
                        <div className="text-[8px] font-black tracking-widest">{f.label}</div>
                        <div className="text-[7px] font-mono text-white/30 mt-0.5">{f.dims}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {pestanaActiva === 'ELEMENTS' && (
            <div className="space-y-6">
              <label className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#c4b087]/50 flex items-center gap-2"><Settings2 size={11}/> STRATEGIC METADATA</label>
              {[
                { label: 'LOCAL_NODE', value: nodoA, set: v => setNodoA(v.toUpperCase()), ph: 'BARCELONA BASED' },
                { label: 'GOV_NODE',   value: nodoB, set: v => setNodoB(v.toUpperCase()), ph: 'AI_POLICY_GOV'   },
                { label: 'YEAR_NODE',  value: nodoAnio, set: setNodoAnio, ph: '2026', max: 4 }
              ].map(f => (
                <div key={f.label} className="space-y-1.5">
                  <span className="text-[7px] font-black text-white/30 uppercase tracking-widest flex items-center gap-1.5"><Lock size={9}/>{f.label}</span>
                  <input type="text" value={f.value} onChange={e => f.set(e.target.value)}
                    placeholder={f.ph} maxLength={f.max}
                    className="w-full bg-black/40 border border-white/5 px-3.5 py-3 text-xs font-mono text-[#f5f5f9] placeholder-white/20 outline-none focus:border-[#c4b087]/40 transition-all rounded-sm" />
                </div>
              ))}
              <button onClick={limpiarConfiguracion}
                className="w-full py-3 border border-white/5 hover:border-red-500/30 text-[9px] font-black uppercase tracking-[0.3em] text-white/30 hover:text-red-400 transition-all rounded-sm flex items-center justify-center gap-2">
                <RotateCcw size={12}/> RESET TO DEFAULTS
              </button>
            </div>
          )}

          {pestanaActiva === 'SOCIAL' && (
            <div className="space-y-6">
              <label className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#c4b087]/50 flex items-center gap-2"><Tag size={11}/> RAPID DEPLOYMENT</label>
              {PRESETS.map(preset => (
                <button key={preset.id} onClick={() => aplicarPreset(preset)}
                  className="w-full p-5 border border-white/5 hover:border-[#c4b087]/30 bg-white/[0.01] hover:bg-[#c4b087]/5 transition-all text-left rounded-sm">
                  <h4 className="text-xs font-black text-white uppercase tracking-widest mb-2">{preset.nombre}</h4>
                  <div className="flex gap-2 mb-3">
                    {preset.tags.map(tag => <span key={tag} className="text-[7px] font-mono bg-white/5 px-2 py-1 rounded-sm text-white/40 uppercase tracking-wider">{tag}</span>)}
                  </div>
                  <div className="flex gap-4 text-[8px] font-mono text-white/25 uppercase">
                    <span>{CONFIG_MAGI[preset.teoria].id}</span>
                    <span className="opacity-40">/</span>
                    <span>{preset.formato}</span>
                  </div>
                </button>
              ))}

              <div className="flex items-center justify-between py-4 border-t border-white/5">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-white">OCA | LUI Block</p>
                  <p className="text-[7px] font-mono text-white/30 mt-0.5">Stacked variant — Melchior only</p>
                </div>
                <button onClick={() => setStacked(s => !s)} className="text-[#c4b087]/50 hover:text-[#c4b087] transition-colors">
                  {stacked ? <ToggleRight size={24}/> : <ToggleLeft size={24}/>}
                </button>
              </div>

              <div className="space-y-3 border-t border-white/5 pt-4">
                <div className="flex items-center justify-between">
                  <label className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#c4b087]/50 flex items-center gap-2"><Activity size={11}/> ACTIVE BITS</label>
                  <button onClick={() => setBits(pickBits())}
                    className="text-[8px] font-black uppercase tracking-widest text-white/25 hover:text-[#c4b087] flex items-center gap-1.5 transition-colors">
                    <RefreshCw size={10}/> REROLL
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {bits.map(b => <span key={b} className="text-[8px] font-mono bg-white/5 border border-white/8 px-2.5 py-1 rounded-sm text-[#c4b087]/70 tracking-widest">{b}</span>)}
                </div>
                <p className="text-[7px] font-mono text-white/15 uppercase tracking-wider">Stable until RESET · Cmd+R to reset all</p>
              </div>
            </div>
          )}

          {pestanaActiva === 'VAULT' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[8px] font-mono uppercase tracking-[0.3em] text-[#c4b087]/50 flex items-center gap-2"><Archive size={11}/> STRATEGIC VAULT</label>
                <span className="text-[8px] font-mono text-white/20">{bovedaFiltrada.length} / {boveda.length}</span>
              </div>
              {boveda.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {['ALL', ...CONFIG_MAGI.map(m => m.id)].map(filtro => (
                    <button key={filtro} onClick={() => setFiltroMagi(filtro)}
                      className={`text-[8px] font-black uppercase tracking-widest px-3 py-1.5 border rounded-sm transition-all
                        ${filtroMagi === filtro ? 'border-[#c4b087] bg-[#c4b087]/10 text-[#c4b087]' : 'border-white/10 text-gray-700 hover:border-white/20 hover:text-white'}`}>
                      {filtro}
                    </button>
                  ))}
                </div>
              )}
              {bovedaFiltrada.length === 0 ? (
                <div className="py-16 border border-dashed border-white/5 rounded-sm flex flex-col items-center gap-3">
                  <Info size={28} className="text-white/10"/>
                  <p className="text-[8px] font-black text-white/15 uppercase tracking-[0.2em]">
                    {filtroMagi === 'ALL' ? 'NO RECORDS IN VAULT' : `NO ${filtroMagi} RECORDS`}
                  </p>
                </div>
              ) : bovedaFiltrada.map(item => (
                <div key={item.id} className="bg-black/60 border border-white/5 p-4 rounded-sm hover:border-[#c4b087]/20 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-[10px] font-black text-white uppercase tracking-widest">SNAPSHOT</h4>
                      <div className="flex gap-2 mt-1">
                        <span className="text-[8px] font-mono text-[#c4b087]">{item.magi}</span>
                        <span className="text-white/20">·</span>
                        <span className="text-[8px] font-mono text-white/30">{item.formato}</span>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button onClick={() => {
                        setTeoria(item.teoria); setFormato(item.formato);
                        setNodoA(item.nodoA); setNodoB(item.nodoB); setNodoAnio(item.nodoAnio);
                        if (item.bits) setBits(item.bits);
                        setPestanaActiva('LAB');
                      }} className="text-white/20 hover:text-[#c4b087] transition-colors p-1" title="Restaurar">
                        <Copy size={13}/>
                      </button>
                      <button onClick={() => setBoveda(boveda.filter(v => v.id !== item.id))}
                        className="text-white/20 hover:text-red-500 transition-colors p-1" title="Eliminar">
                        <Trash2 size={13}/>
                      </button>
                    </div>
                  </div>
                  <p className="text-[7px] font-mono text-white/25 uppercase">{item.nodoA} / {item.nodoB}</p>
                  {item.bits && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {item.bits.map(b => <span key={b} className="text-[7px] font-mono text-white/15 bg-white/5 px-1.5 py-0.5 rounded-sm">{b}</span>)}
                    </div>
                  )}
                  <p className="text-[7px] font-mono text-white/15 mt-2">{item.fecha} · {item.timestamp}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-7 border-t border-white/5 bg-black/40 backdrop-blur-xl flex flex-col gap-3">
          <button onClick={handleExport} disabled={exporting}
            className="w-full h-12 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.4em] border border-[#c4b087]/30 text-[#c4b087] hover:bg-[#c4b087]/8 transition-all rounded-sm disabled:opacity-40">
            {exporting ? <Activity size={16} className="animate-spin"/> : <Download size={16}/>}
            {exporting ? 'EXPORTING...' : 'EXPORT PNG'}
          </button>
          <button onClick={sincronizarBoveda} disabled={estadoSincronizacion === 'SYNCING'}
            className={`w-full h-12 flex items-center justify-center gap-3 font-black text-[10px] uppercase tracking-[0.4em] border rounded-sm transition-all
              ${estadoSincronizacion === 'SYNCING' ? 'border-white/5 text-white/20 cursor-not-allowed' :
                estadoSincronizacion === 'READY'   ? 'border-[#2d8b8a] bg-[#2d8b8a]/10 text-[#2d8b8a]' :
                                                     'border-white text-white hover:bg-white hover:text-black'}`}>
            {estadoSincronizacion === 'SYNCING' ? <><Activity size={16} className="animate-spin"/> SYNCING...</> :
             estadoSincronizacion === 'READY'   ? <><CheckCircle2 size={16}/> APPROVED & VAULTED</> :
                                                  <><Save size={16}/> APPROVE & VAULT</>}
          </button>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2d8b8a] animate-pulse shadow-[0_0_8px_rgba(45,139,138,0.6)]"/>
              <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.2em]">WCAG AA</span>
            </div>
            <span className="text-[7px] font-mono text-white/15">Cmd+E: EXPORT · Cmd+S: VAULT · Cmd+R: RESET · 1-3: MAGI</span>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-[#020305] p-10 md:p-16 flex items-center justify-center overflow-auto relative" style={{ scrollbarWidth: 'none' }}>
        <div className="no-export absolute top-8 right-8 flex flex-col items-end gap-2 opacity-25 select-none pointer-events-none">
          <div className="flex items-center gap-2.5">
            <Activity size={16} className="text-[#c4b087]"/>
            <span className="text-xs font-mono text-white tracking-[0.5em] uppercase">V5.0_READY</span>
          </div>
          <span className="text-[9px] font-mono text-[#c4b087] tracking-[0.25em] uppercase">
            {CONFIG_MAGI[teoria].nombre} // {formato.toUpperCase()}
          </span>
        </div>

        <div className="relative group/canvas" ref={canvasRef}>
          <div className="absolute -inset-10 border border-white/[0.02] pointer-events-none rounded-sm group-hover/canvas:border-[#c4b087]/8 transition-all duration-500"/>
          <div id="canvas-inner">
            <CanvasDespliegue config={configuracionActual} bits={bits}/>
          </div>
          <div className="no-export absolute inset-0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none flex items-start justify-end p-6">
            <ZoomIn size={22} className="text-white opacity-15"/>
          </div>
        </div>
      </main>
    </div>
  );
}
