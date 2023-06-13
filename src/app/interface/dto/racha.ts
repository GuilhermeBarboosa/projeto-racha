import { Quadra } from "./Quadra";
import { DefaultDto } from "./defaultDto";

export interface Racha extends DefaultDto{
  id?: number | undefined;
  nome: string | undefined;
  caixa: number | undefined;
  quadra: Quadra | undefined;
}
