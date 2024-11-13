import { EXIT, visit } from "unist-util-visit";

export default function updateFrontmatter() {
  return (tree) => {
    let title = "";
    let description = "";

    visit(tree, "heading", (node, index) => {
      if (node.depth === 1) {
        visit(node, "text", (textNode) => {
          title = textNode.value;
        });
      }

      if (node.depth === 2) {
        visit(node, "text", (child) => {
          if (child.value === "Theme") {
            description = tree.children.at(index + 1).children.at(0).value;

            const startIndex = index + 1;
            const descriptionSegments = [];

            for (let i = 0; ; i++) {
              const currentNode = tree.children[startIndex + i];

              if (currentNode.type === "paragraph") {
                visit(currentNode, "text", (node) => {
                  descriptionSegments.push(node.value);
                });
              } else {
                break;
              }
            }

            description = descriptionSegments.join(" ");
            EXIT;
          }
        });
      }
    });

    if (!title) {
      throw new Error("Title not found in markdown file");
    }
    if (!description) {
      throw new Error("Description not found in markdown file");
    }

    visit(tree, "yaml", (node) => {
      node.value = `
${node.value}
title: "${title}"
description: "${description}"
      `.trim();
    });
  };
}
