
import { DefaultDto } from "./defaultDto";
import { Quadra } from "./quadra";

export interface Racha extends DefaultDto{
  nome: string | undefined;
  caixa: number | undefined;
  quadra: Quadra | undefined;
}
