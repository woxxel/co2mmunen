export const material = {
    name: 'Material',
    type: 'unique',
    options: {
        void: {name: 'Keine', costs: 0},
        concrete: {name: 'Beton', costs: 4},
        recycleConcrete: {name: 'Recyclebeton', costs: 3.5},
        steel: {name: 'Stahl', costs: 3},
        wood: {name: 'Holz', costs: 1.5},
        plastic: {name: 'Kunststoff', costs: 2},
        hybrid: {name: 'Hybrid', costs: 2.5}
    }
}

export const area = {
    name: 'Grundfläche',
    type: 'linear',
    unit: 'm2',
    costs: 0.02,
    default: 200,
}

export const levels = {
    name: 'Stockwerke',
    type: 'linear',
    unit: '',
    costs: 2,
    default: 2
}

export const energyEfficiency = {
    name: 'Energie Effizienz',
    type: 'unique',
    options: {
        void: {name: 'Keine', costs: 0},
        app: {name: 'A++', costs: 1, time_costs: 0.5},
        ap: {name: 'A+', costs: 0.9, time_costs: 0.6},
        a: {name: 'A', costs: 0.8, time_costs: 0.7},
        b: {name: 'B', costs: 0.7, time_costs: 0.8},
        c: {name: 'C', costs: 0.6, time_costs: 0.9},
        d: {name: 'D', costs: 0.5, time_costs: 1}
    },
    default: 'a'
}

export const length = {
    name: 'Länge',
    type: 'linear',
    units: 'm',
    costs: '0.01',
    default: 2000,
}
