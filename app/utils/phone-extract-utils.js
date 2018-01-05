export function extract(phoneNumber) {
    return preNumberArr[phoneNumber.substring(0, 3)]
        || preNumberArr[phoneNumber.substring(0, 4)];
}

const preNumber = {
    viettel: [
        "098",
        "097",
        "096",
        "0169",
        "0168",
        "0167",
        "0166",
        "0165",
        "0164",
        "0163",
        "0162",
        "086"
    ],
    mobi: [
        '090',
        '093',
        '089',
        '0120',
        '0121',
        '0122',
        '0126',
        '0128'
    ],
    vina: [
        "091",
        "094",
        "0123",
        "0124",
        "0125",
        "0127",
        "0129",
        "088"
    ]
};

const preNumberArr = ((preNumber) => {
    const flatPreNumber = {};
    for (let key in preNumber) {
        for (let numb of preNumber[key]) {
            flatPreNumber[numb] = key;
        }
    }

    return flatPreNumber;
})(preNumber);