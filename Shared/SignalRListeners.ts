import { ActiveSummonersRift } from "./GameInterfaces";

export const OnGameUpdate = (update: ActiveSummonersRift) => {
    console.log("There has been an update to the game ", update);
}