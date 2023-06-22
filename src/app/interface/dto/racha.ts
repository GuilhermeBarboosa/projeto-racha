import { DefaultDto } from './defaultDto';
import { Quadra } from './quadra';

export interface Racha extends DefaultDto {
  nome: string;
  caixa: number;
  idQuadra: number;
  nomeQuadra: string;
}
