let twoLetterISO = [
    "in","us"
]


var isoCountries = {
    'IN' : 'India',
    'US' : 'United States'
};

let countries = []; 
twoLetterISO.forEach(element => {
    let obj = {
        iso_2_alpha : element,
        // 
        png : `https://flagcdn.com/24x18/${element}.png`,
        countryName : getCountryName(element.toUpperCase()),
    }
    countries.push(obj); 
})

function getCountryName (countryCode) {
    if (isoCountries.hasOwnProperty(countryCode)) {
        return isoCountries[countryCode];
    } else {
        return countryCode;
    }
}

console.log(countries)

export default countries; 