export const extractTitleAndContent = (editorContent:string) => {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(editorContent, "text/html");

    console.log(editorContent)

    let title = '';
    let body = editorContent;

    // assuming the first element could be a heading or paragraph
    const firstElement = doc.body.firstChild; //@ts-ignore
    if (firstElement && (firstElement.tagName === 'H1' || firstElement.tagName === 'P')) { //@ts-ignore
        title = firstElement.textContent || firstElement.innerText;
        firstElement.remove();
        body = doc.body.innerHTML;
    }

    console.log(title)
    console.log(body)
    return { title, body };
    }
