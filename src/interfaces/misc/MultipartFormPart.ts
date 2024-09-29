/* this bad boy is just so we can connect a name to each part */
interface MultipartFormPart <Type>{
    name: string,
    content: Type
}

export default MultipartFormPart;