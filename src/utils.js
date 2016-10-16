let cyclicStringify = (obj) => {
    let seen = [];
    return JSON.stringify(obj, function(key, val) {
        if (val != null && typeof val == 'object') {
            if (seen.indexOf(val) >= 0) {
                return;
            }
            seen.push(val);
        }
        return val;
    });
};
let cyclicObjectToJson = (obj) => {
    return JSON.parse(cyclicStringify(obj));
};

export default {
    cyclicStringify,
    cyclicObjectToJson
};
