import { DefaultDto } from "./defaultDto";

export interface Posicao extends DefaultDto{
  id?: number | undefined;
  posicao : string | undefined;
}
