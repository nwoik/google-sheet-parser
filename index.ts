export interface PlayerData {
    name?: string
    friendCode?: string
    discordId?: string
    mmr?: number
    mii?: string
}

export interface Season {
    name: string
    active: boolean
    participants: Participant[]
}

export interface Participant {
    name: string // change to friendCode
    mmr: number
}

