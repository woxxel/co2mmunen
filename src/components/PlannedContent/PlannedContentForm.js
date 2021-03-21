
const formData = {
    elementType: 'select',
    elementConfig: {
        options: [
            {value: 'void', displayValue: 'Keine'},
            {value: 'street', displayValue: 'Strassenbau'},
            {value: 'build', displayValue: 'Hausbau'},
            {value: 'industry', displayValue: 'Industrie'},
            {value: 'parc', displayValue: 'Oeffentliche Flaeche'},
        ]
    },
    value: 'void',
    label: 'Projektvorhaben',
    validation: {},
    valid: true,
    touched: false
}

export default formData;
