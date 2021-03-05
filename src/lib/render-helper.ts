import { Block } from '../blocks/Block.js';

export class RenderHelper {
  static render(query: string, block: Block) {
    const root = document.querySelector(query);
    root?.appendChild(block.getContent());
    return root;
  }
}