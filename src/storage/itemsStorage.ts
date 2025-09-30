import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITEMS_STORAGE_KEY = "@comprar:items";

export type ItemStorage = {
    id: string;
    status: FilterStatus;
    description: string;
}

//Método para recuperar os itens do AsyncStorage
async function get(): Promise<ItemStorage[]> {

    try {

        const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY);
        return storage ? JSON.parse(storage) : [];
    } 
    catch (error) {

        throw new Error("ITEMS_GET: " + error);
    }
}

//Método para recuperar os itens do AsyncStorage por status
async function getByStatus(status:FilterStatus): Promise<ItemStorage[]> {
    
    const items = await get();
    return items.filter(item => item.status === status);
}

//Método para salvar os itens no AsyncStorage
async function save(items: ItemStorage[]): Promise<void> {

    try {
        await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items));
    } 
    catch (error) {
        throw new Error("ITEMS_SAVE: " + error);    
    }
}

//Método para adicionar um novo item no AsyncStorage
async function add(item: ItemStorage): Promise<ItemStorage[]> {

    const items = await get();
    items.push(item);
    await save(items);

    return items;
}

export const itemsStorage = {
    get,
    getByStatus,
    add,
};

