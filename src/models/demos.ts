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
        title: "Flocking Boids",
        creationDate: new Date('6/24/2021'),
        description: `Boids is an artificial life program, developed by Craig Reynolds in 1986, which simulates the flocking behaviour of birds. His paper on this topic was published in 1987 in the proceedings of the ACM SIGGRAPH conference. The name "boid" corresponds to a shortened version of "bird-oid object", which refers to a bird-like object. Incidentally, "boid" is also a New York Metropolitan dialect pronunciation for "bird."`,
        help: "Control the parameters on the bottom right corner."
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
