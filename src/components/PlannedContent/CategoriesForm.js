
const formData = {
    material: {
        elementType: 'select',
        elementConfig: {
            options: [
                {value: 'void', displayValue: 'Keine'},
                {value: 'wood', displayValue: 'Holz'},
                {value: 'concrete', displayValue: 'Beton'},
                {value: 'steel', displayValue: 'Stahl'},
            ]
        },
        value: 'void',
        label: 'Material',
        validation: {},
        quickAdd: true,
        valid: true,
        touched: false
    },
    // position: {
    //     elementType: 'select',
    //     elementConfig: {
    //         options: [
    //             {value: 'void', displayValue: 'Waehlen'},
    //             {value: 'north', displayValue: 'Nord'},
    //             {value: 'south', displayValue: 'Sued'},
    //             {value: 'other', displayValue: 'andere'},
    //         ]
    //     },
    //     value: 'void',
    //     label: 'Ausrichtung',
    //     validation: {},
    //     quickAdd: true,
    //     valid: true,
    //     touched: false
    // },
    energyEfficiency: {
        elementType: 'select',
        elementConfig: {
            options: [
                {value: 'void', displayValue: 'Keine'},
                {value: 'app', displayValue: 'A++'},
                {value: 'ap', displayValue: 'A+'},
                {value: 'a', displayValue: 'A'},
                {value: 'b', displayValue: 'B'},
                {value: 'c', displayValue: 'C'},
                {value: 'd', displayValue: 'D'},
            ]
        },
        value: 'void',
        label: 'Energie Effizienz',
        validation: {},
        quickAdd: true,
        valid: true,
        touched: false
    },
    electricity: {
        elementType: 'select',
        elementConfig: {
            options: [
                {value: 'void', displayValue: 'Keine'},
                {value: 'c', displayValue: 'Kohle'},
                {value: 'm', displayValue: 'Mix'},
                {value: 'e', displayValue: 'Erneuerbar'}
            ]
        },
        value: 'void',
        label: 'Strommix',
        validation: {},
        quickAdd: true,
        valid: true,
        touched: false
    },


}

export default formData;
