import {material,area,levels,energyEfficiency,length} from './Categories.js'

export const building = {
    name: 'Gebaeude',
    options: {
        void: {name: 'Keine', costs: 0},
        home_1: {name: 'Einfamilienhaus', costs: 2},
        home_n: {name: 'Mehrfamilienhaus', costs: 0.5},
        hospital: {name: 'Krankenhaus', costs: 4},
        school: {name: 'Schule', costs: 2},
        kindergarten: {name: 'Kindergarten', costs: 2},
        fire: {name: 'Feuerwehr', costs: 1},
        police: {name: 'Polizei', costs: 1},
        supermarket: {name: 'Supermarkt', costs: 0.5},
        office: {name: 'Bürogebaeude', costs: 1},
    },
    categories: {
        material, area, levels, energyEfficiency
    }
};

export const traffic = {
    name: 'Verkehr',
    options: {
        bikeTrack: {name: 'Fahrradweg', costs: 1},
        street: {name: 'Strasse', costs: 3},
        trainTracks: {name: 'Gleise', costs: 4},
        tram: {name: 'Tram', costs: 10},
    },
    categories: {
        material, length
    }
};
