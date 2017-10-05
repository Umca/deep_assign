function getPropDescriptor(obj, prop){
    return Object.getOwnPropertyDescriptor(obj, prop);
}

// define if it is primitive
function isPrimitive(value){
    return typeof value == 'string' || typeof value == 'number' || typeof value == 'function';
}

function isArray(value){
    return value instanceof Array;
}

function isDate(value){
    return value instanceof Date;
}

function isSet(value){Set;
}

function isMap(value){
    return value instanceof Map;
}

function treeWalk(obj, [key, value], ctx){
    if(isPrimitive(value) || isArray(value) || isDate(value) || isSet(value) || isMap(value) ){
        let descriptor = getPropDescriptor(ctx, key);
        Object.defineProperty(obj, key, descriptor);
        return;
    } else {
        ctx = ctx[key];
        obj[key] = {}
        let entries = Object.entries(value);
        entries.forEach( entry => treeWalk(obj[key], entry, ctx) );
    }
}

function deepAssign (target, ...sources){
    
    let obj = {};

    sources.forEach( source => {
        let entries = Object.entries(source);
        entries.forEach(entry => treeWalk(obj, entry, source));
    })

    for (let key in obj){
        target[key] = obj[key]
    }

    return target;
}

var temp={
    a:11,
    b:{
        c:[12, 23],
        d:{
            e:{
                f: new Date(12, 12, 2016)
            },
            g:34
        }        
    }
}

deepAssign({world: 21}, temp, {a:3, d:9});


