export type WebAudioModule = {
  inputNode?: AudioNode;
  outputNode: AudioNode;
  setupNodes: () => void;
  cleanupNodes: () => void;
};

export function createAudioNodeChain(...nodes: (AudioNode | WebAudioModule)[]) {
  return {
    connects() {
      let currentOutput: AudioNode | null = null;
      for (const node of nodes) {
        const inputNode =
          "inputNode" in node
            ? node.inputNode
            : (node as AudioNode | undefined);
        const outputNode = "outputNode" in node ? node.outputNode : node;
        if (currentOutput && inputNode) {
          currentOutput.connect(inputNode);
        }
        if ("setupNodes" in node) {
          node.setupNodes();
        }
        currentOutput = outputNode;
      }
    },
    disconnects() {
      let currentOutput: AudioNode | null = null;
      for (const node of nodes) {
        const inputNode =
          "inputNode" in node
            ? node.inputNode
            : (node as AudioNode | undefined);
        const outputNode = "outputNode" in node ? node.outputNode : node;
        if (currentOutput && inputNode) {
          currentOutput.disconnect(inputNode);
        }
        if ("cleanupNodes" in node) {
          node.cleanupNodes();
        }
        currentOutput = outputNode;
      }
    },
  };
}
