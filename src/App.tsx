import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSearch } from './components/hero/HeroSearch';
import { ReportContainer } from './components/report/ReportContainer';
import { MyQueriesDrawer } from './components/history/MyQueriesDrawer';
import { useVehicleQuery } from './hooks/useVehicleQuery';

export function App() {
  const {
    step,
    plate,
    setPlate,
    fullReport,
    isHistoryDrawerOpen,
    setIsHistoryDrawerOpen,
    isLoading,
    history,
    handleSearch,
    handleSelectReportFromHistory,
    handleClearHistory,
    handleResetToSearch,
  } = useVehicleQuery();

  const isDarkTheme = step === 'SEARCH';

  return (
    <div
      className={`min-h-screen flex flex-col font-sans antialiased transition-colors duration-200 ${
        isDarkTheme
          ? 'bg-[#090e17] text-white selection:bg-[#00e676] selection:text-slate-950'
          : 'bg-[#f4f7fb] text-slate-800 selection:bg-blue-600 selection:text-white'
      }`}
    >
      {/* 1. Header Global com Suporte aos Modos Escuro e Claro */}
      <Navbar
        theme={isDarkTheme ? 'dark' : 'light'}
        onOpenHistory={() => setIsHistoryDrawerOpen(true)}
        historyCount={history.length}
        onResetToHome={handleResetToSearch}
      />

      {/* 2. Conteúdo Principal da Aplicação */}
      <main className="flex-1">
        {/* TELA 1: Landing Page / Hero de Consulta (Escura) */}
        {step === 'SEARCH' && (
          <HeroSearch
            plate={plate}
            setPlate={setPlate}
            onSearch={(customPlate) => handleSearch(customPlate)}
            isLoading={isLoading}
          />
        )}

        {/* TELA 2: Dashboard Completo do Veículo (Clara) */}
        {step === 'REPORT' && fullReport && (
          <ReportContainer
            report={fullReport}
            onNewSearch={handleResetToSearch}
          />
        )}
      </main>

      {/* 3. Gaveta Lateral de Histórico de Consultas */}
      <MyQueriesDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        history={history}
        onSelectReport={handleSelectReportFromHistory}
        onClearHistory={handleClearHistory}
      />

      {/* 4. Rodapé Global */}
      <Footer theme={isDarkTheme ? 'dark' : 'light'} />
    </div>
  );
}

export default App;

