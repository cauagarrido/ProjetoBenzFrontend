import React from 'react';
import { ShieldCheck, Lock, Award, Heart, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400 text-sm mt-24 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/60">
          
          {/* Coluna 1: Sobre */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-black text-white">
                BENZ<span className="text-blue-500">CHECK</span>
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              A plataforma mais completa e rápida do Brasil para consulta de histórico veicular por placa. Evite golpes e faça negócios seguros.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <CheckCircle2 className="w-4 h-4" />
              <span>Conexão direta com bases oficiais</span>
            </div>
          </div>

          {/* Coluna 2: O que verificamos */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              O que Verificamos
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="hover:text-slate-200 transition-colors">Histórico de Leilões em todo Brasil</li>
              <li className="hover:text-slate-200 transition-colors">Sinistros & Colisões de Média/Grande Monta</li>
              <li className="hover:text-slate-200 transition-colors">Débitos de IPVA, DPVAT e Multas</li>
              <li className="hover:text-slate-200 transition-colors">Gravame & Alienação Bancária</li>
              <li className="hover:text-slate-200 transition-colors">Bloqueios Judiciais (RENAJUD)</li>
              <li className="hover:text-slate-200 transition-colors">Alerta de Roubo e Furto (SINESP)</li>
            </ul>
          </div>

          {/* Coluna 3: Segurança */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Segurança & Garantias
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                <Lock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">Certificado SSL 256-bit</p>
                  <p className="text-[11px] text-slate-400">Ambiente 100% blindado e seguro</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-xs">
                <Award className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-slate-200">Garantia de Atualização</p>
                  <p className="text-[11px] text-slate-400">Dados processados em tempo real</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna 4: Suporte e Contato */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">
              Atendimento & Suporte
            </h4>
            <p className="text-xs text-slate-400 mb-3">
              Dúvidas sobre seu relatório ou pagamento? Fale com nosso suporte especializado.
            </p>
            <div className="space-y-1.5 text-xs">
              <p className="text-slate-300 font-medium">suporte@benzcheck.com.br</p>
              <p className="text-slate-400">Segunda a Sexta, das 08h às 20h</p>
              <p className="text-slate-400">Sábados das 09h às 14h</p>
            </div>
          </div>

        </div>

        {/* Rodapé inferior */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BenzCheck Tecnologia Veicular Ltda. Todos os direitos reservados.</p>
          <div className="flex items-center gap-1">
            <span>Desenvolvido com</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>para compras de veículos com total transparência</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
