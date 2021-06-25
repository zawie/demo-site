export interface Demo {
    title: string,
    description?: string,
    thumbnail?: any,        // require(<thumbnail path>)
    help?:  string
    creationDate?: Date,
    isWIP?: boolean
} 

export interface DemoAppProps {
    height: number
}