export const luggageRulesToDataObject = (str) => {
    const items = str.split('\n');
    let data = []
    items.forEach((row) => {
        let words = row.split('contain')
        let bagTokens = words[0].split(' ')
        let containTokens = words[1].split(',')
        let bagType = bagTokens[0] + bagTokens[1]
        let obj = {}
        obj['bagType'] = bagType
        obj['canContain'] = []
        containTokens.forEach((token) => {
            let newObj = {}
            const newTokens = token.trim().split(' ')
            if(newTokens[0] === 'no'){
                newObj['bagType'] = 'noother'
                newObj['quantity'] = 0;
            } else {
                newObj['bagType'] = newTokens[1] + newTokens[2]
                newObj['quantity'] = parseInt(newTokens[0])
            }
            obj['canContain'].push(newObj)
        })
        data.push(obj)
        
    })
    console.log(data)
    return data;
    
}

/*

EXAMPLE DATA STRUCTURE:

[
    { bagType: 'lightred', 
      canContain: 
        [
            { bagType: 'brightwhite', quantity: 1 },
            { bagType: 'mutedyellow', quantity: 2 }
        ] 
    },
    { bagType: 'darkorange',
      canContain: 
        [
            { bagType: 'brightwhite', quantity: 3 },
            { bagType: 'mutedyellow', quantity: 4 }
        ] 
    },
    ........
    { bagType: 'fadedblue',
      canContain: 
        [ 
            { bagType: 'noother', quantity: 0 } 
        ] 
    },
]

*/