export const extractTitleAndContent = (editorContent:string) => {
    const domParser = new DOMParser();
    const doc = domParser.parseFromString(editorContent, "text/html");

    console.log(editorContent)

    let title = '';
    let body = editorContent;
    const allowedTags = ['H1', 'H2', 'H3']

    // assuming the first element could be a heading or paragraph
    const firstElement = doc.body.firstChild; //@ts-ignore
    if (firstElement && allowedTags.includes(firstElement.tagName)) { //@ts-ignore
        title = firstElement.textContent || firstElement.innerText;
        firstElement.remove();
        body = doc.body.innerHTML;
    }

    console.log(title)
    console.log(body)
    return { title, body };
    }
