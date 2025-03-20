// utils/jsonToHtml.js
export const jsonToHtml = (content) => {
    if (!content) return "";
  
    return content
      .map((node) => {
        switch (node.type) {
          case "paragraph":
            return `<p>${jsonToHtml(node.content)}</p>`;
          case "heading":
            return `<h${node.attrs?.level || 3}>${jsonToHtml(node.content)}</h${
              node.attrs?.level || 3
            }>`;
          case "text":
            let text = node.text;
            if (node.marks) {
              node.marks.forEach((mark) => {
                switch (mark.type) {
                  case "bold":
                    text = `<strong>${text}</strong>`;
                    break;
                  case "italic":
                    text = `<em>${text}</em>`;
                    break;
                  case "underline":
                    text = `<u>${text}</u>`;
                    break;
                  default:
                    break;
                }
              });
            }
            return text;
          case "image":
            return `<img src="${node.attrs.src}" alt="${node.attrs.alt || ""}" title="${
              node.attrs.title || ""
            }" class="w-full max-w-[500px] h-auto" />`;
          case "bulletList":
            return `<ul class="list-disc pl-5">${jsonToHtml(node.content)}</ul>`;
          case "orderedList":
            return `<ol class="list-decimal pl-5">${jsonToHtml(node.content)}</ol>`;
          case "listItem":
            return `<li>${jsonToHtml(node.content)}</li>`;
          default:
            return "";
        }
      })
      .join("");
  };