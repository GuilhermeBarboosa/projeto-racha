import { DefaultDto } from "./defaultDto";
import { Jogador } from "./jogador";
import { Racha } from "./racha";

export interface JogadorRacha extends DefaultDto{
  idJogador: number;
  nomeJogador: string;
  idade: number;
  telefone: string;
  cpf: string;
  email: string;
  posicao: string;
  gols: number;
  assistencias: number;
  idRacha: number;
  nomeRacha: string;
  caixa: number;
  idQuadra: number;
  nomeQuadra: string;
}
