export interface IUser {
    id: string,
    firstname: string,
    lastname: string,
    birthdate: Date | null,
    skills: string[] | null,
    profileCompletion: number,
    lastConnection: Date | null,
    isalreadyConnected: boolean 
}