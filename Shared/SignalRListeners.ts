import { TStore } from "./Store";
import { ActiveSummonersRift } from "./GameInterfaces";

export const OnGameUpdate = (update: ActiveSummonersRift, store: TStore) => {
    console.log("There has been an update to the game ");
    console.log(update);    
}