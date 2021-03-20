
const formData = {
    elementType: 'select',
    elementConfig: {
        options: [
            {value: 'void', displayValue: 'Bitte auswaehlen'},
            {value: 'street', displayValue: 'Strassenbau'},
            {value: 'build', displayValue: 'Hausbau'},
            {value: 'industry', displayValue: 'Industrie'},
            {value: 'parc', displayValue: 'Oeffentliche Flaeche'},
        ]
    },
    value: 'void',
    label: 'Art der Massnahme',
    validation: {},
    quickAdd: true,
    valid: true,
    touched: false
}

export default formData;
