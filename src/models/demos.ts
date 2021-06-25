import { FunctionComponent } from 'react';
import { Demo, DemoAppProps } from './definitions'
const defaultImage = require(`../thumbnails/default.png`);

export const DEMOS: Demo[] = [
    {
        title: "Projectile Motion",
        creationDate: new Date('9/29/2020'),
        description: "A simple projectile motion simulator.",
        help: "Drag the yellow arrow to adjust the force of gravity, and drag the red point to adjust initial velocity.",
    },
    {
        title:  "Electric Field",
        creationDate: new Date('9/30/2020'),
        description: "An electric field with two electrons (in red) and two protons (in yellow).",
        help: "Drag the electrons and protons around to change the field. Drag the orange indicator to measure the field at particular points.",
    },
    {
        title: "Orbital Dynamics",
        creationDate: new Date('9/30/2020'),
        isWIP: true
    }
]

export const getDemoIdentifer = (demo: Demo):string => demo.title.toLowerCase().replace(' ','-')

export function getDemo(identifier: string): Demo | null {
    const matches: Demo[] = DEMOS.filter( (d: Demo) => getDemoIdentifer(d) === identifier)
    console.log("hehehe", identifier, matches);
    switch(matches.length) {
        case 0:
            return null
        case 1:
            return matches[0]
        default:
            throw new Error(`The identifier "${identifier}" matched with multiple Demo objects: ${matches}`)
    }
}

export function getThumbnail(demo: Demo) {
    try{
        return require(`../thumbnails/${getDemoIdentifer(demo)}.png`)
    } catch {
        return defaultImage
    }
}

export const getDemoComponent = (demo: Demo): FunctionComponent<DemoAppProps> | null => { 
    console.log("trying to get component for ", getDemoIdentifer(demo))
    try {
        return require(`../demo-apps/${getDemoIdentifer(demo)}.tsx`).default 
    } catch {
        console.log("Returning null")
        return null
    }
}
