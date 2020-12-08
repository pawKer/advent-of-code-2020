export const getInstructionsToDataObject = (str) => {
    const items = str.split('\n');
    const data = []
    items.forEach((elem) => {
        let elemTokens = elem.split(' ')
        let inst = elemTokens[0]
        let value = parseInt(elemTokens[1])
        let obj = {
            'instruction': inst,
            'value': value,
            'executed': false,
        }
        data.push(obj)
    })
    return data;
    
}