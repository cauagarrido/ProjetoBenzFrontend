import React from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSearch } from './components/hero/HeroSearch';

import { VehiclePreviewCard } from './components/checkout/VehiclePreviewCard';
import { PixCheckoutModal } from './components/checkout/PixCheckoutModal';
import { ReportContainer } from './components/report/ReportContainer';
import { MyQueriesDrawer } from './components/history/MyQueriesDrawer';
import { useVehicleQuery } from './hooks/useVehicleQuery';

export function App() {
  const {
    step,
    plate,
    setPlate,
    basicInfo,
    fullReport,
    pixData,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isHistoryDrawerOpen,
    setIsHistoryDrawerOpen,
    isLoading,
    history,
    handleSearch,
    handleStartCheckout,
    handlePaymentConfirmed,
    handleSelectReportFromHistory,
    handleClearHistory,
    handleResetToSearch,
  } = useVehicleQuery();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white font-sans antialiased">
      
      {/* 1. Header Global */}
      <Navbar
        onOpenHistory={() => setIsHistoryDrawerOpen(true)}
        historyCount={history.length}
        onResetToHome={handleResetToSearch}
      />

      {/* 2. Conteúdo Dinâmico por Etapa da Jornada */}
      <main className="flex-1">
        
        {/* ETAPA 1: Busca & Hero */}
        {step === 'SEARCH' && (
          <div className="pt-6 sm:pt-10">
            <HeroSearch
              plate={plate}
              setPlate={setPlate}
              onSearch={() => handleSearch()}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* ETAPA 2: Prévia & Checkout de Alta Conversão */}
        {step === 'PREVIEW' && basicInfo && (
          <div className="pt-4 sm:pt-8">
            <VehiclePreviewCard
              basicInfo={basicInfo}
              onProceedToCheckout={handleStartCheckout}
              onBackToSearch={handleResetToSearch}
            />
          </div>
        )}

        {/* ETAPA 3: Dashboard do Relatório Completo */}
        {step === 'REPORT' && fullReport && (
          <ReportContainer
            report={fullReport}
            onNewSearch={handleResetToSearch}
          />
        )}

      </main>

      {/* 3. Modal de Pagamento PIX Dinâmico */}
      <PixCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        pixData={pixData}
        onPaymentConfirmed={handlePaymentConfirmed}
      />

      {/* 4. Gaveta Lateral de Minhas Consultas */}
      <MyQueriesDrawer
        isOpen={isHistoryDrawerOpen}
        onClose={() => setIsHistoryDrawerOpen(false)}
        history={history}
        onSelectReport={handleSelectReportFromHistory}
        onClearHistory={handleClearHistory}
      />

      {/* 5. Rodapé Global */}
      <Footer />

    </div>
  );
}

export default App;
