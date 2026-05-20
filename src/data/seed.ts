export const EQUIPES = [
  { id: 'e1', nome: 'Equipe Alpha', cor: '#EA083D', emoji: '🎬', membros: 'Carlos Silva, Ana Lima' },
  { id: 'e2', nome: 'Equipe Beta', cor: '#7c3aed', emoji: '📸', membros: 'Ricardo Souza, Patrícia Mendes' },
  { id: 'e3', nome: 'Equipe Gamma', cor: '#00daf3', emoji: '🎙️', membros: 'João Costa, Marina Alves' },
]

export const EQUIPAMENTOS = [
  { id: 'eq1', nome: 'Arri Alexa Mini LF', categoria: 'CAMERAS', serie: 'SN: AR-90214-X', total: 15, campo: 3, status: 'AVAILABLE', valor: 85000 },
  { id: 'eq2', nome: 'Sennheiser MKH 416', categoria: 'AUDIO', serie: 'SN: SEN-7731-M', total: 8, campo: 8, status: 'IN USE', valor: 4200 },
  { id: 'eq3', nome: 'Aputure LS 600d Pro', categoria: 'LIGHTING', serie: 'SN: AP-LIT-600-X', total: 24, campo: 21, status: 'MAINTENANCE', valor: 7500 },
  { id: 'eq4', nome: 'SmallHD 703 UltraBright', categoria: 'ACCESSORIES', serie: 'SN: SM-HD-V8-K', total: 20, campo: 2, status: 'AVAILABLE', valor: 3800 },
  { id: 'eq5', nome: 'DJI Ronin RS3 Pro', categoria: 'SUPPORT', serie: 'SN: DJI-RS3-002', total: 6, campo: 4, status: 'IN USE', valor: 5200 },
  { id: 'eq6', nome: 'Canon EOS R5', categoria: 'CAMERAS', serie: 'SN: CN-R5-0091', total: 4, campo: 2, status: 'AVAILABLE', valor: 18000 },
  { id: 'eq7', nome: 'Godox SL-60W', categoria: 'LIGHTING', serie: 'SN: GDX-SL60-04', total: 12, campo: 6, status: 'AVAILABLE', valor: 900 },
  { id: 'eq8', nome: 'Rode VideoMic Pro+', categoria: 'AUDIO', serie: 'SN: RODE-VP-12', total: 10, campo: 4, status: 'AVAILABLE', valor: 1200 },
]

export const MOVIMENTACOES = [
  { id: 'm1', tipo: 'CHECK-OUT', equipe: 'e1', responsavel: 'Carlos Silva', projeto: 'Live Samsung Academy', data: '14/05/2026', hora: '09:15', itens: ['Canon EOS R5', 'DJI Ronin RS3'], status: 'Sync Success', retornado: false, previsao: '15/05/2026' },
  { id: 'm2', tipo: 'CHECK-IN', equipe: 'e3', responsavel: 'João Costa', projeto: 'Live Samsung Academy', data: '13/05/2026', hora: '14:30', itens: ['Arri Alexa Mini LF', 'DJI Ronin RS3', 'SSD ×2'], status: 'Sync Success', retornado: true, previsao: '13/05/2026' },
  { id: 'm3', tipo: 'CHECK-OUT', equipe: 'e2', responsavel: 'Ricardo Souza', projeto: 'Ensaio Corporativo Tech', data: '13/05/2026', hora: '08:00', itens: ['Canon EOS R5', 'Godox SL-60W ×2'], status: 'Processing', retornado: false, previsao: '14/05/2026' },
  { id: 'm4', tipo: 'CHECK-IN', equipe: 'e1', responsavel: 'Carlos Silva', projeto: 'Podcast Infolive Ep. 44', data: '09/05/2026', hora: '17:45', itens: ['Rode VideoMic ×2'], status: 'Sync Success', retornado: true, previsao: '09/05/2026' },
  { id: 'm5', tipo: 'CHECK-OUT', equipe: 'e2', responsavel: 'Patrícia Mendes', projeto: 'Webinar Itaú Personnalité', data: '08/05/2026', hora: '11:00', itens: ['Arri Alexa Mini LF', 'Sennheiser MKH 416'], status: 'Sync Success', retornado: false, previsao: '09/05/2026' },
]

export const PENDENTES = [
  { id: 'p1', equipe: 'e1', responsavel: 'Carlos Silva', projeto: 'Live Samsung Academy', saida: '14/05/2026', previsao: '15/05/2026', atrasado: false, dias: 1, itens: ['Sony FX3 ×1', 'DJI Ronin SC2 ×1'] },
  { id: 'p2', equipe: 'e2', responsavel: 'Ricardo Souza', projeto: 'Webinar Itaú Personnalité', saida: '08/05/2026', previsao: '09/05/2026', atrasado: true, dias: 5, itens: ['Arri Alexa Mini LF ×1', 'Sennheiser MKH 416 ×2'] },
  { id: 'p3', equipe: 'e2', responsavel: 'Patrícia Mendes', projeto: 'Ensaio Corporativo Tech', saida: '13/05/2026', previsao: '14/05/2026', atrasado: true, dias: 1, itens: ['Canon EOS R5 ×1', 'Godox SL-60W ×2'] },
]

export const MANUTENCOES = [
  { id: 'mn1', equip: 'Aputure LS 600d Pro', tipo: 'Corretiva', tecnico: 'Técnico Ribeiro', entrada: '08/05/2026', previsao: '16/05/2026', status: 'EM ANDAMENTO' },
  { id: 'mn2', equip: 'Lente Sigma 35mm f/1.4', tipo: 'Preventiva', tecnico: 'Técnico Alves', entrada: '10/05/2026', previsao: '14/05/2026', status: 'CONCLUÍDO' },
  { id: 'mn3', equip: 'DJI Mavic 3 Pro', tipo: 'Corretiva', tecnico: 'Técnico Ribeiro', entrada: '12/05/2026', previsao: '20/05/2026', status: 'URGENTE' },
]
