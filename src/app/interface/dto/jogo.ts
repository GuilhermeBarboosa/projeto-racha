import { DefaultDto } from "./defaultDto";

export interface Jogo extends DefaultDto{
  id: number;
  data: string;
  valorPago: number;
  idRacha: number;
  nomeRacha: string;
  caixa: number;
  idQuadra: number;
  nomeQuadra: string;
}
