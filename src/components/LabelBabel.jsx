import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Zap, Database, Monitor, Square, Smartphone, Crosshair, Activity, 
  Download, Save, ChevronRight, Archive, Info, CheckCircle2, Layers, 
  Settings2, Trash2, Copy, Filter, RotateCcw, ZoomIn, Tag, Lock
} from 'lucide-react';

/**
 * ╔═══════════════════════════════════════════════════════════════════╗
 * ║  OCALUI.ME LABEL BABEL /// V.4.7 TACTICAL OPTIMIZATION           ║
 * ║  Terminal de Despliegue de Contenido Táctico                     ║
 * ║  Arquitectura: MAGI Lab (Editor) + Strategic Vault                ║
 * ╚═══════════════════════════════════════════════════════════════════╝
 */

// ═══════════════════════════════════════════════════════════════════════
// TOKEN SYSTEM - Design Variables
// ═══════════════════════════════════════════════════════════════════════

const TOKENS = {
  oro: '#c4b087',
  teal: '#2d8b8a',
  blanco: '#f5f5f9',
  fondo: '#020305', 
  glass: 'rgba(9, 10, 12, 0.85)',
  borde: 'rgba(255, 255, 255, 0.06)',
  grid: 'rgba(255, 255, 255, 0.03)',
  scan: 'rgba(196, 176, 135, 0.15)'
};

// ═══════════════════════════════════════════════════════════════════════
// MAGI PROFILES - Teorías de Distribución de Datos
// ═══════════════════════════════════════════════════════════════════════

const CONFIG_MAGI = [
  { 
    id: 'MELCHIOR',
    nombre: 'Estabilidad Céntrica',
    protocolo: 'Symmetria / Jerarquía Apex / Autoridad Absoluta',
    descripcion: 'Branding masivo y simétrico. Señal de fuerza fundacional.',
    fuente: 'font-black',
    layout: 'flex-col justify-center items-center',
    escalaBranding: 'text-[130px] md:text-[150px]',
    trackingBranding: 'tracking-tighter',
    opacidad: '1',
    rotacion: '0',
    posicion: 'center'
  },
  { 
    id: 'BALTHASAR',
    nombre: 'Asimetría Táctica',
    protocolo: 'Tensión Narrativa / Flujo Dinámico / Tiempo Real',
    descripcion: 'Encabezados desplazados. Sistema activo en movimiento.',
    fuente: 'font-black',
    layout: 'justify-start items-center pl-24',
    escalaBranding: 'text-[125px] md:text-[145px]',
    trackingBranding: 'tracking-tighter',
    opacidad: '1',
    rotacion: 'variable',
    posicion: 'asymmetric'
  },
  { 
    id: 'CASPAR',
    nombre: 'Blueprint Minimal',
    protocolo: 'Precisión de Datos / Branding Fantasma / Infraestructura',
    descripcion: 'Identidad como marca de agua. Prioridad a datos.',
    fuente: 'font-mono',
    layout: 'justify-center items-center',
    escalaBranding: 'text-[115px] md:text-[135px]',
    trackingBranding: 'tracking-[0.1em]',
    opacidad: '0.15',
    rotacion: '0',
    posicion: 'blueprint'
  }
];

// ═══════════════════════════════════════════════════════════════════════
// PRESETS - Configuraciones Predefinidas para Despliegue Rápido
// ═══════════════════════════════════════════════════════════════════════

const PRESETS = [
  {
    id: 'linkedin_hero',
    nombre: 'LinkedIn Hero',
    teoria: 0,
    formato: 'landscape',
    nodoA: 'BARCELONA BASED',
    nodoB: 'AI_POLICY_GOV',
    tags: ['professional', 'corporate']
  },
  {
    id: 'instagram_post',
    nombre: 'Instagram Grid',
    teoria: 1,
    formato: 'square',
    nodoA: 'CREATIVE OPERATIONS',
    nodoB: 'QUALITY_LEAD',
    tags: ['social', 'portfolio']
  },
  {
    id: 'story_announcement',
    nombre: 'Story Announcement',
    teoria: 2,
    formato: 'story',
    nodoA: 'SYSTEM UPDATE',
    nodoB: 'PROTOCOL_ACTIVE',
    tags: ['mobile', 'urgent']
  }
];

// ═══════════════════════════════════════════════════════════════════════
// COMPONENTES AUXILIARES
// ═══════════════════════════════════════════════════════════════════════

/**
 * MiniPreview - Representación visual miniaturizada de cada perfil MAGI
 */
const MiniPreview = ({ type, active }) => {
  const baseClass = `w-16 h-10 border ${
    active ? 'border-[#c4b087]/60 shadow-[0_0_12px_rgba(196,176,135,0.2)]' : 'border-white/10'
  } rounded-sm relative overflow-hidden bg-black/70 transition-all duration-300`;
  
  return (
    <div className={baseClass}>
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4px_4px]"></div>
      {type === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 scale-50">
          <div className={`w-8 h-1.5 ${active ? 'bg-[#c4b087]' : 'bg-white/20'}`}></div>
          <div className={`w-8 h-1.5 ${active ? 'bg-[#c4b087]' : 'bg-white/20'}`}></div>
        </div>
      )}
      {type === 1 && (
        <div className="absolute inset-0 flex items-center justify-start pl-2 scale-50">
          <div className={`w-10 h-2.5 ${active ? 'bg-[#c4b087]' : 'bg-white/20'} -translate-x-1 translate-y-1 rotate-2`}></div>
        </div>
      )}
      {type === 2 && (
        <div className="absolute inset-0 flex items-center justify-center scale-50">
          <div className={`w-10 h-3 border ${active ? 'border-[#c4b087]' : 'border-white/20'} opacity-40`}></div>
        </div>
      )}
    </div>
  );
};

/**
 * CapaHUD - Capa de interfaz táctica con grids, crosshairs y metadata
 */
const CapaHUD = ({ config }) => {
  const magi = CONFIG_MAGI[config.teoria];
  
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Grid Blueprint - 40px optimizado para PPTX */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.18]"></div>
      
      {/* Crosshairs de Eje */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
      
      {/* AUTH Corner - Top Left */}
      <div className="absolute top-10 left-10 w-28 h-28 border-t border-l border-white/20 p-3 flex flex-col justify-between">
        <div className="space-y-1">
          <span className="font-mono text-[8px] text-white/40 uppercase tracking-[0.5em] block">AUTH</span>
          <span className="font-black text-[10px] text-[#c4b087] uppercase tracking-widest block">{magi.id}</span>
        </div>
      </div>
      
      {/* SYS Status - Bottom Right */}
      <div className="absolute bottom-10 right-10 w-28 h-28 border-b border-r border-white/15 p-3 flex items-end justify-end">
        <div className="text-right space-y-1">
          <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.5em] block">SYS</span>
          <span className="font-mono text-[9px] text-white/20 uppercase tracking-wider block">V4.7_STABLE</span>
        </div>
      </div>
      
      {/* Crosshair Central */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/10 text-6xl font-thin select-none">+</div>
      
      {/* Scan Lines (sutil animación) */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,transparent_0%,rgba(196,176,135,0.03)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan-slow opacity-50"></div>
    </div>
  );
};

/**
 * CintaAviso - Warning Tape Protocol (banners superior e inferior)
 */
const CintaAviso = ({ tipo = 'top', config }) => {
  const esCaspar = config.teoria === 2;
  
  return (
    <div className={`w-full flex items-center justify-between px-10 font-mono text-[11px] font-black tracking-[0.4em] uppercase z-40 transition-all duration-500
      ${tipo === 'top' ? 'border-b border-white/5' : 'border-t border-white/5'}
      ${esCaspar ? 'bg-black text-[#c4b087] h-10' : 'bg-[#c4b087] text-black h-12'}`}
    >
      <div className="flex items-center gap-4">
        {tipo === 'top' && <Crosshair size={12} className="animate-pulse-subtle" />}
        <span>[ {tipo === 'top' ? 'SISTEMA_LISTO' : 'DEEPLY SUPERFICIAL'} ]</span>
      </div>
      
      <div className="flex items-center gap-8 truncate px-6">
        <span className="opacity-50">{esCaspar ? 'INFRAESTRUCTURA' : 'OCALUI.ME'}</span>
        <span className="opacity-20">/</span>
        <span className="opacity-80">{config.nodoA}</span>
        <span className="opacity-20">/</span>
        <span className={`${esCaspar ? 'text-white' : 'opacity-90'}`}>{config.nodoB}</span>
      </div>
      
      <div className={`flex items-center gap-2 px-3 py-1 rounded-sm ${
        esCaspar ? 'bg-[#c4b087] text-black' : 'bg-black text-[#c4b087]'
      }`}>
        <span className="text-[10px] tracking-widest font-black">{config.nodoAnio}</span>
      </div>
    </div>
  );
};

/**
 * CanvasDespliegue - Canvas principal de visualización
 */
const CanvasDespliegue = ({ config }) => {
  const magi = CONFIG_MAGI[config.teoria];
  const isMelchior = config.teoria === 0;
  const isBalthasar = config.teoria === 1;
  const isCaspar = config.teoria === 2;

  // Cálculo dinámico de dimensiones según formato
  const dimensiones = useMemo(() => {
    switch(config.formato) {
      case 'landscape': return { width: '1000px', aspect: '1200/630' };
      case 'square': return { width: '600px', aspect: 'square' };
      case 'story': return { width: '380px', aspect: '9/16' };
      default: return { width: '1000px', aspect: '1200/630' };
    }
  }, [config.formato]);

  return (
    <div 
      className="bg-[#050608] border border-white/10 shadow-[0_100px_200px_rgba(0,0,0,1)] relative flex flex-col overflow-hidden transition-all duration-1000"
      style={{ width: dimensiones.width, aspectRatio: dimensiones.aspect }}
    >
      {/* Warning Tape Superior */}
      <CintaAviso tipo="top" config={config} />
      
      {/* Área Principal */}
      <div className={`flex-1 relative flex overflow-hidden z-10 ${magi.layout}`}>
        <CapaHUD config={config} />
        
        {/* Glow Radial sutil */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#3a2c1820_0%,transparent_80%)] pointer-events-none animate-pulse-subtle"></div>
        
        {/* BRANDING - Tipografía Masiva */}
        <div className={`relative z-20 transition-all duration-1000 select-none
          ${magi.fuente} ${magi.escalaBranding} ${magi.trackingBranding} text-[#f5f5f9] uppercase leading-[0.78]
          ${isCaspar ? 'opacity-15 drop-shadow-none' : 'drop-shadow-[0_40px_80px_rgba(0,0,0,1)]'}
          ${isBalthasar && config.formato === 'story' ? 'rotate-90 origin-center scale-150' : ''}
          ${isBalthasar && config.formato !== 'story' ? '-translate-x-12 translate-y-6' : ''}
        `}>
          {isMelchior ? (
            <div className="flex flex-col items-center">
              <span>OCA</span>
              <span>LUI</span>
            </div>
          ) : isCaspar ? (
            <span>{config.nodoB}</span>
          ) : (
            <span>OCALUI</span>
          )}
        </div>
      </div>

      {/* PILAS - Tres Pilares Estratégicos */}
      <div className={`w-full px-20 pb-16 z-30 flex justify-between items-end gap-16 shrink-0 
        ${isBalthasar ? 'flex-col items-end gap-4 mr-6 mb-6' : ''}
        ${isCaspar ? 'justify-around px-32' : ''}`}
      >
        {['CREATIVE', 'QUALITY', 'OPERATIONS'].map((pilar, i) => (
          <div 
            key={i} 
            className={`flex flex-col border-l-2 border-gray-800 pl-6 py-1.5 transition-all hover:border-[#c4b087] group ${
              isMelchior ? 'items-center text-center' : ''
            }`}
          >
            <span className="font-mono text-[9px] text-gray-600 tracking-[0.4em] uppercase mb-1.5">
              PILA_P-0{i+1}
            </span>
            <span className={`font-black uppercase tracking-tighter leading-none transition-all duration-500 group-hover:text-[#c4b087]
              ${isCaspar ? 'text-4xl text-white/20' : isMelchior ? 'text-5xl text-white' : 'text-4xl text-white'}
            `}>
              {pilar}
            </span>
          </div>
        ))}
      </div>
      
      {/* Warning Tape Inferior */}
      <CintaAviso tipo="bottom" config={config} />
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════
// COMPONENTE PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════

export default function LabelBabel() {
  // ───────────────────────────────────────────────────────────────────────
  // Estado del Sistema
  // ───────────────────────────────────────────────────────────────────────
  
  const [teoria, setTeoria] = useState(0); 
  const [formato, setFormato] = useState('landscape'); 
  const [nodoA, setNodoA] = useState('BARCELONA BASED');
  const [nodoB, setNodoB] = useState('AI_POLICY_GOV');
  const [nodoAnio, setNodoAnio] = useState('2026');
  
  const [boveda, setBoveda] = useState([]);
  const [estadoSincronizacion, setEstadoSincronizacion] = useState('IDLE');
  const [pestanaActiva, setPestanaActiva] = useState('LAB');
  const [filtroMagi, setFiltroMagi] = useState('ALL');

  // ───────────────────────────────────────────────────────────────────────
  // Configuración Actual (Computed)
  // ───────────────────────────────────────────────────────────────────────
  
  const configuracionActual = useMemo(() => ({
    teoria, formato, nodoA, nodoB, nodoAnio
  }), [teoria, formato, nodoA, nodoB, nodoAnio]);

  // ───────────────────────────────────────────────────────────────────────
  // Handlers de Acciones
  // ───────────────────────────────────────────────────────────────────────
  
  const sincronizarBoveda = useCallback(() => {
    setEstadoSincronizacion('SYNCING');
    
    setTimeout(() => {
      const entrada = {
        id: Date.now(),
        ...configuracionActual,
        magi: CONFIG_MAGI[teoria].id,
        timestamp: new Date().toLocaleTimeString('es-ES'),
        fecha: new Date().toLocaleDateString('es-ES')
      };
      
      setBoveda(prev => [entrada, ...prev]);
      setEstadoSincronizacion('READY');
      
      setTimeout(() => setEstadoSincronizacion('IDLE'), 2000);
    }, 1500);
  }, [configuracionActual, teoria]);

  const aplicarPreset = useCallback((preset) => {
    setTeoria(preset.teoria);
    setFormato(preset.formato);
    setNodoA(preset.nodoA);
    setNodoB(preset.nodoB);
  }, []);

  const limpiarConfiguracion = useCallback(() => {
    setTeoria(0);
    setFormato('landscape');
    setNodoA('BARCELONA BASED');
    setNodoB('AI_POLICY_GOV');
    setNodoAnio('2026');
  }, []);

  const bovedaFiltrada = useMemo(() => {
    if (filtroMagi === 'ALL') return boveda;
    return boveda.filter(item => item.magi === filtroMagi);
  }, [boveda, filtroMagi]);

  // ───────────────────────────────────────────────────────────────────────
  // Keyboard Shortcuts (Power Users)
  // ───────────────────────────────────────────────────────────────────────
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Cmd/Ctrl + S = Save to Vault
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (estadoSincronizacion === 'IDLE') sincronizarBoveda();
      }
      
      // Cmd/Ctrl + R = Reset
      if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
        e.preventDefault();
        limpiarConfiguracion();
      }
      
      // 1-3 = Switch MAGI
      if (['1', '2', '3'].includes(e.key) && !e.metaKey && !e.ctrlKey) {
        setTeoria(parseInt(e.key) - 1);
      }
      
      // F = Switch Format
      if (e.key === 'f' && !e.metaKey && !e.ctrlKey) {
        setFormato(prev => {
          if (prev === 'landscape') return 'square';
          if (prev === 'square') return 'story';
          return 'landscape';
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [estadoSincronizacion, sincronizarBoveda, limpiarConfiguracion]);

  // ═══════════════════════════════════════════════════════════════════════
  // RENDER PRINCIPAL
  // ═══════════════════════════════════════════════════════════════════════

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#020305] text-[#f5f5f9] font-sans overflow-hidden">
      
      {/* ═══════════════════════════════════════════════════════════════════
          SIDEBAR: CONTROL TÁCTICO
          ═══════════════════════════════════════════════════════════════════ */}
      
      <aside className="w-full lg:w-[460px] bg-[#090a0c]/90 backdrop-blur-2xl border-r border-white/5 flex flex-col z-50 shrink-0 relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        {/* HEADER IDENTIDAD */}
        <div className="p-8 border-b border-white/5 flex flex-col gap-4 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 bg-[#c4b087] flex items-center justify-center rounded-sm border border-black/20 shadow-[0_4px_20px_rgba(196,176,135,0.3)]">
              <Zap size={24} className="text-black fill-current" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-black text-white tracking-[0.4em] uppercase leading-none">OCALUI.ME</h1>
              <p className="text-[9px] text-gray-600 font-mono mt-1 tracking-[0.1em] uppercase">LABEL BABEL /// V4.7</p>
            </div>
          </div>
          
          {/* Tagline */}
          <div className="bg-black/40 border border-white/5 px-4 py-2 rounded-sm">
            <p className="text-[10px] font-mono text-[#c4b087] uppercase tracking-[0.2em]">
              Creative + Quality & AI Insights
            </p>
          </div>
        </div>

        {/* NAVEGACIÓN */}
        <div className="px-8 pt-6 pb-4 relative z-10">
          <div className="flex bg-white/[0.02] p-1 rounded-sm border border-white/5">
            {[
              { id: 'LAB', icon: <Database size={12} />, label: 'MAGI LAB' },
              { id: 'ELEMENTS', icon: <Layers size={12} />, label: 'ELEMENTS' },
              { id: 'PRESETS', icon: <Tag size={12} />, label: 'PRESETS' },
              { id: 'VAULT', icon: <Archive size={12} />, label: 'VAULT', badge: boveda.length }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setPestanaActiva(tab.id)}
                className={`relative flex-1 py-3 text-[10px] font-black tracking-[0.15em] transition-all duration-200 flex items-center justify-center gap-2
                  ${pestanaActiva === tab.id 
                    ? 'bg-[#c4b087] text-black rounded-sm shadow-[0_4px_12px_rgba(196,176,135,0.4)]' 
                    : 'text-gray-600 hover:text-white hover:bg-white/5'
                  }`}
              >
                {tab.icon}
                {tab.label}
                {tab.badge > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#2d8b8a] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* CONTENIDO DINÁMICO POR PESTAÑA */}
        <div className="flex-1 overflow-y-auto px-8 space-y-10 scrollbar-hide pb-32 relative z-10">
          
          {/* ═══════════════════════════════════════════════════════════════
              PESTAÑA: MAGI LAB
              ═══════════════════════════════════════════════════════════════ */}
          
          {pestanaActiva === 'LAB' && (
            <div className="animate-in fade-in duration-500 space-y-10 pt-4">
              
              {/* Selector de Perfil MAGI */}
              <div className="space-y-4">
                <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#c4b087]/50 flex items-center gap-2">
                  <Database size={12} /> ACTIVE MAGI PROFILE
                </label>
                
                <div className="grid grid-cols-1 gap-3">
                  {CONFIG_MAGI.map((m, i) => (
                    <button 
                      key={m.id} 
                      onClick={() => setTeoria(i)}
                      className={`group p-5 border transition-all duration-300 relative overflow-hidden flex items-center justify-between rounded-sm
                        ${teoria === i 
                          ? 'border-[#c4b087] bg-[#c4b087]/5 shadow-[inset_0_1px_0_rgba(196,176,135,0.2)]' 
                          : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'
                        }`}
                    >
                      <div className="relative z-10 flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-black tracking-widest ${
                            teoria === i ? 'text-[#c4b087]' : 'text-white'
                          }`}>
                            {m.id}
                          </span>
                          <ChevronRight size={12} className={teoria === i ? 'text-[#c4b087]' : 'text-gray-800'} />
                        </div>
                        <p className="text-[8px] font-mono text-gray-600 uppercase tracking-widest leading-relaxed">
                          {m.nombre}
                        </p>
                        <p className="text-[7px] font-mono text-gray-700 tracking-wider leading-relaxed">
                          {m.descripcion}
                        </p>
                      </div>
                      <MiniPreview type={i} active={teoria === i} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector de Formato */}
              <div className="space-y-4">
                <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#c4b087]/50 flex items-center gap-2">
                  <Monitor size={12} /> DEPLOYMENT FORMAT
                </label>
                
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'landscape', icon: <Monitor size={16}/>, label: 'HERO', dims: '1200×630' },
                    { id: 'square', icon: <Square size={16}/>, label: 'POST', dims: '1080×1080' },
                    { id: 'story', icon: <Smartphone size={16}/>, label: 'STORY', dims: '1080×1920' }
                  ].map(f => (
                    <button 
                      key={f.id} 
                      onClick={() => setFormato(f.id)} 
                      className={`flex flex-col items-center gap-3 p-4 border rounded-sm transition-all duration-200
                        ${formato === f.id 
                          ? 'border-[#c4b087] bg-[#c4b087]/5 text-[#c4b087] shadow-[0_4px_12px_rgba(196,176,135,0.2)]' 
                          : 'border-white/5 text-gray-700 hover:border-white/15 hover:text-white'
                        }`}
                    >
                      {f.icon}
                      <div className="text-center">
                        <span className="text-[8px] font-black tracking-widest leading-none block mb-1">{f.label}</span>
                        <span className="text-[7px] font-mono text-gray-600 tracking-wider">{f.dims}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              PESTAÑA: ELEMENTS
              ═══════════════════════════════════════════════════════════════ */}
          
          {pestanaActiva === 'ELEMENTS' && (
            <div className="animate-in fade-in duration-500 space-y-10 pt-4">
              
              {/* Metadata Estratégica */}
              <div className="space-y-6">
                <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#c4b087]/50 flex items-center gap-2">
                  <Settings2 size={12} /> STRATEGIC METADATA
                </label>
                
                <div className="grid grid-cols-1 gap-5">
                  <div className="space-y-2">
                    <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                      <Lock size={10} /> LOCAL_NODE
                    </span>
                    <input 
                      type="text" 
                      value={nodoA} 
                      onChange={e => setNodoA(e.target.value.toUpperCase())} 
                      className="w-full bg-black/40 border border-white/5 p-3.5 text-xs font-mono outline-none focus:border-[#c4b087]/50 focus:bg-black/60 transition-all text-[#f5f5f9] rounded-sm"
                      placeholder="BARCELONA BASED"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest flex items-center gap-2">
                      <Lock size={10} /> GOV_NODE
                    </span>
                    <input 
                      type="text" 
                      value={nodoB} 
                      onChange={e => setNodoB(e.target.value.toUpperCase())} 
                      className="w-full bg-black/40 border border-white/5 p-3.5 text-xs font-mono outline-none focus:border-[#c4b087]/50 focus:bg-black/60 transition-all text-[#f5f5f9] rounded-sm"
                      placeholder="AI_POLICY_GOV"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest">YEAR_NODE</span>
                    <input 
                      type="text" 
                      value={nodoAnio} 
                      onChange={e => setNodoAnio(e.target.value)} 
                      className="w-full bg-black/40 border border-white/5 p-3.5 text-xs font-mono outline-none focus:border-[#c4b087]/50 focus:bg-black/60 transition-all text-[#f5f5f9] rounded-sm"
                      placeholder="2026"
                      maxLength={4}
                    />
                  </div>
                </div>
              </div>

              {/* Reset Button */}
              <button 
                onClick={limpiarConfiguracion}
                className="w-full py-3 px-4 border border-white/10 hover:border-red-500/30 hover:bg-red-500/5 text-gray-600 hover:text-red-400 text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-200 flex items-center justify-center gap-2 rounded-sm"
              >
                <RotateCcw size={12} />
                RESET TO DEFAULTS
              </button>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              PESTAÑA: PRESETS
              ═══════════════════════════════════════════════════════════════ */}
          
          {pestanaActiva === 'PRESETS' && (
            <div className="animate-in fade-in duration-500 space-y-6 pt-4">
              <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#c4b087]/50 flex items-center gap-2">
                <Tag size={12} /> RAPID DEPLOYMENT
              </label>
              
              <div className="space-y-3">
                {PRESETS.map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => aplicarPreset(preset)}
                    className="w-full p-5 border border-white/5 hover:border-[#c4b087]/30 bg-white/[0.01] hover:bg-[#c4b087]/5 transition-all duration-200 text-left rounded-sm group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-[11px] font-black text-white tracking-widest uppercase group-hover:text-[#c4b087] transition-colors">
                        {preset.nombre}
                      </h4>
                      <ChevronRight size={14} className="text-gray-800 group-hover:text-[#c4b087] transition-colors" />
                    </div>
                    
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      {preset.tags.map(tag => (
                        <span key={tag} className="text-[7px] font-mono text-gray-600 bg-white/5 px-2 py-1 rounded-sm uppercase tracking-wider">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-[8px] font-mono text-[#c4b087] uppercase tracking-[0.1em]">
                        {CONFIG_MAGI[preset.teoria].id}
                      </span>
                      <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                      <span className="text-[8px] font-mono text-gray-700 uppercase tracking-[0.1em]">
                        {preset.formato}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════════
              PESTAÑA: VAULT (BÓVEDA)
              ═══════════════════════════════════════════════════════════════ */}
          
          {pestanaActiva === 'VAULT' && (
            <div className="animate-in fade-in duration-500 space-y-6 pt-4">
              
              {/* Header con filtros */}
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#c4b087]/50 flex items-center gap-2">
                  <Archive size={12} /> STRATEGIC VAULT
                </label>
                <span className="text-[8px] font-mono text-gray-700 uppercase bg-white/5 px-2 py-1 rounded-sm">
                  {bovedaFiltrada.length} / {boveda.length}
                </span>
              </div>

              {/* Filtro por MAGI */}
              {boveda.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {['ALL', ...CONFIG_MAGI.map(m => m.id)].map(filtro => (
                    <button
                      key={filtro}
                      onClick={() => setFiltroMagi(filtro)}
                      className={`text-[8px] font-black uppercase tracking-widest px-3 py-1.5 border rounded-sm transition-all
                        ${filtroMagi === filtro 
                          ? 'border-[#c4b087] bg-[#c4b087]/10 text-[#c4b087]' 
                          : 'border-white/10 text-gray-700 hover:border-white/20 hover:text-white'
                        }`}
                    >
                      {filtro}
                    </button>
                  ))}
                </div>
              )}

              {/* Lista de registros */}
              {bovedaFiltrada.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-white/5 rounded-sm bg-white/[0.01] flex flex-col items-center gap-3 opacity-30">
                  <Info size={32} className="text-gray-700" />
                  <p className="text-[9px] font-black text-gray-700 uppercase tracking-[0.2em]">
                    {filtroMagi === 'ALL' ? 'NO RECORDS IN VAULT' : `NO ${filtroMagi} RECORDS`}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bovedaFiltrada.map(item => (
                    <div 
                      key={item.id} 
                      className="group relative bg-black/60 border border-white/5 p-4 rounded-sm hover:border-[#c4b087]/30 transition-all"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-[11px] font-black text-white tracking-widest uppercase">SNAPSHOT</h4>
                          <div className="flex items-center gap-2.5 mt-1.5">
                            <span className="text-[8px] font-mono text-[#c4b087] uppercase tracking-[0.1em]">
                              {item.magi}
                            </span>
                            <span className="w-1 h-1 bg-gray-800 rounded-full"></span>
                            <span className="text-[8px] font-mono text-gray-700 uppercase tracking-[0.1em]">
                              {item.formato}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              setTeoria(item.teoria);
                              setFormato(item.formato);
                              setNodoA(item.nodoA);
                              setNodoB(item.nodoB);
                              setNodoAnio(item.nodoAnio);
                              setPestanaActiva('LAB');
                            }}
                            className="text-gray-800 hover:text-[#c4b087] transition-colors p-1"
                            title="Restaurar configuración"
                          >
                            <Copy size={14} />
                          </button>
                          <button 
                            onClick={() => setBoveda(boveda.filter(v => v.id !== item.id))} 
                            className="text-gray-800 hover:text-red-500 transition-colors p-1"
                            title="Eliminar"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-[8px] font-mono text-gray-700">
                        <p className="uppercase tracking-wider">{item.nodoA} / {item.nodoB}</p>
                        <p className="text-gray-800">{item.fecha} · {item.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            ACTION BAR - Barra de Acciones Inferior
            ═══════════════════════════════════════════════════════════════ */}
        
        <div className="p-8 border-t border-white/5 bg-black/40 backdrop-blur-xl flex flex-col gap-4 relative z-10">
          
          {/* Botón Principal de Sincronización */}
          <button 
            onClick={sincronizarBoveda} 
            disabled={estadoSincronizacion === 'SYNCING'}
            className={`w-full h-16 flex items-center justify-center gap-4 font-black text-xs uppercase tracking-[0.4em] transition-all duration-300 active:scale-[0.99] border rounded-sm
              ${estadoSincronizacion === 'SYNCING' 
                ? 'bg-[#c4b087]/10 border-white/5 text-gray-700 cursor-not-allowed' : 
                estadoSincronizacion === 'READY' 
                  ? 'bg-[#2d8b8a] border-[#2d8b8a] text-white shadow-[0_4px_20px_rgba(45,139,138,0.4)]' : 
                  'bg-white text-black border-white hover:bg-[#c4b087] hover:border-[#c4b087] shadow-[0_4px_20px_rgba(255,255,255,0.2)]'
              }`}
          >
            {estadoSincronizacion === 'SYNCING' ? (
              <>
                <Activity size={18} className="animate-spin" />
                SYNCING TO VAULT...
              </>
            ) : estadoSincronizacion === 'READY' ? (
              <>
                <CheckCircle2 size={18} />
                APPROVED & VAULTED
              </>
            ) : (
              <>
                <Save size={18} />
                APPROVE & VAULT
              </>
            )}
          </button>
          
          {/* Footer Info */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#2d8b8a] shadow-[0_0_10px_rgba(45,139,138,0.6)] animate-pulse"></div>
              <span className="text-[8px] font-black text-gray-700 uppercase tracking-[0.2em]">
                CONTRAST AA WCAG
              </span>
            </div>
            <span className="text-[8px] font-mono text-gray-800 uppercase tracking-[0.1em]">
              BUILD_V4.7
            </span>
          </div>
          
          {/* Keyboard Hints */}
          <div className="flex items-center justify-center gap-3 pt-2 border-t border-white/5 mt-2">
            <span className="text-[7px] font-mono text-gray-800 uppercase tracking-wider">
              ⌘S: VAULT
            </span>
            <span className="text-gray-900">·</span>
            <span className="text-[7px] font-mono text-gray-800 uppercase tracking-wider">
              ⌘R: RESET
            </span>
            <span className="text-gray-900">·</span>
            <span className="text-[7px] font-mono text-gray-800 uppercase tracking-wider">
              1-3: MAGI
            </span>
          </div>
        </div>
      </aside>

      {/* ═══════════════════════════════════════════════════════════════════
          VIEWPORT: CANVAS DE DESPLIEGUE
          ═══════════════════════════════════════════════════════════════════ */}
      
      <main className="flex-1 bg-[#020305] p-10 md:p-20 flex items-center justify-center overflow-auto relative scrollbar-hide">
        
        {/* HUD de Sistema Superior Derecho */}
        <div className="absolute top-10 right-10 flex flex-col items-end gap-2.5 opacity-30 select-none pointer-events-none text-right">
          <div className="flex items-center gap-3">
            <Activity size={18} className="text-[#c4b087]" />
            <span className="text-xs font-mono text-white tracking-[0.6em] uppercase leading-none">
              V4.7_READY
            </span>
          </div>
          <span className="text-[9px] font-mono text-[#c4b087] tracking-[0.3em] uppercase">
            {CONFIG_MAGI[teoria].id} // {formato.toUpperCase()}
          </span>
        </div>
        
        {/* Entorno del Canvas con efecto hover */}
        <div className="relative group/canvas">
          <div className="absolute -inset-12 border border-white/[0.02] pointer-events-none rounded-sm transition-all duration-700 group-hover/canvas:border-[#c4b087]/10"></div>
          
          <CanvasDespliegue config={configuracionActual} />
          
          {/* Overlay de Zoom en hover */}
          <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none flex items-start justify-end p-8 rounded-sm">
            <ZoomIn size={28} className="text-white opacity-20" />
          </div>
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════════════════
          ESTILOS PERSONALIZADOS
          ═══════════════════════════════════════════════════════════════════ */}
      
      <style dangerouslySetInnerHTML={{ __html: `
        /* Scrollbar personalizado (webkit) */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Animación de pulso sutil */
        @keyframes subtle-pulse {
          0%, 100% { 
            opacity: 0.15; 
            transform: scale(1); 
          }
          50% { 
            opacity: 0.3; 
            transform: scale(1.01); 
          }
        }
        .animate-pulse-subtle {
          animation: subtle-pulse 8s infinite ease-in-out;
        }

        /* Animación de scan lines */
        @keyframes scan-slow {
          0% { 
            transform: translateY(0); 
          }
          100% { 
            transform: translateY(100%); 
          }
        }
        .animate-scan-slow {
          animation: scan-slow 15s linear infinite;
        }

        /* Fade in animation */
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-in {
          animation: fade-in 0.5s ease-out;
        }

        /* Font Loading Optimization */
        @font-face {
          font-family: 'JetBrains Mono';
          font-display: swap;
        }
      `}} />
    </div>
  );
}