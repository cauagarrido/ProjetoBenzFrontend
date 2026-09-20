import React from 'react';
import { AuthProvider } from './hooks/useAuth';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSearch } from './components/hero/HeroSearch';
import { ReportContainer } from './components/report/ReportContainer';
import { MyQueriesDrawer } from './components/history/MyQueriesDrawer';
import { useVehicleQuery } from './hooks/useVehicleQuery';

function AppContent() {
  const {
    step,
    plate,
    setPlate,
    fullReport,
    isHistoryDrawerOpen,
    setIsHistoryDrawerOpen,
    isLoading,
    history,
    error,
    handleSearch,
    handleFipeReport,
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
          : 'bg-[#e8ecf2] text-slate-800 selection:bg-blue-600 selection:text-white'
      }`}
    >
      {/* 1. Header */}
      <Navbar
        theme={isDarkTheme ? 'dark' : 'light'}
        onOpenHistory={() => setIsHistoryDrawerOpen(true)}
        historyCount={history.length}
        onResetToHome={handleResetToSearch}
      />

      {/* 2. Conteúdo Principal */}
      <main className="flex-1">
        {step === 'SEARCH' && (
          <HeroSearch
            plate={plate}
            setPlate={setPlate}
            onSearch={(customPlate) => handleSearch(customPlate)}
            onFipeResult={handleFipeReport}
            isLoading={isLoading}
            error={error}
          />
        )}

        {step === 'REPORT' && fullReport && (
          <ReportContainer
            report={fullReport}
            onNewSearch={handleResetToSearch}
          />
        )}
      </main>

      {/* 3. Gaveta de Histórico */}
      <MyQueriesDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        history={history}
        onSelectReport={handleSelectReportFromHistory}
        onClearHistory={handleClearHistory}
      />

      {/* 4. Rodapé */}
      <Footer theme={isDarkTheme ? 'dark' : 'light'} />
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
