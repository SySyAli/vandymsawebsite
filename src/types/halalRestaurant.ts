import {Document} from "mongoose"

export interface halalRestaurant extends Document{
    name: string,
    address: string,
    note: string,
    website: string,
    onMealMoney: boolean,
    imageUrl: string
}

