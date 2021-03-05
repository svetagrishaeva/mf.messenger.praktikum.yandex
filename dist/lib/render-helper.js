export class RenderHelper {
    static render(query, block) {
        const root = document.querySelector(query);
        root === null || root === void 0 ? void 0 : root.appendChild(block.getContent());
        return root;
    }
}
//# sourceMappingURL=render-helper.js.map