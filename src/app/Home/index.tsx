import { use, useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, FlatList, Alert } from 'react-native';
import { Button } from '@/Components/Button';
import { styles } from './styles';
import { Input } from '@/Components/Input';
import { Filter } from '@/Components/Filter';
import { FilterStatus } from '@/types/FilterStatus';
import { Item } from '@/Components/Item';
import { itemsStorage, ItemStorage } from '@/storage/itemsStorage';

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export function Home() {

  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);

  //Adiciona um novo item na lista
  async function handleAdd(){
    if(!description.trim()){
      Alert.alert('Novo Item', 'Informe a descrição do item.');
    }

    const newItem = {
      id: new Date().getTime().toString(),
      description: description,
      status: FilterStatus.PENDING
    }

    await itemsStorage.add(newItem);
    await itemsByStatus();

    Alert.alert("Adicionado", `Adicionado ${description}`)
    setFilter(FilterStatus.PENDING);
    setDescription("");
  }

  //Recupera os itens do AsyncStorage
  async function itemsByStatus(){
    
    try {
    
      const response = await itemsStorage.getByStatus(filter);
      setItems(response);
    } 
    catch (error) {
      console.log(error);
      Alert.alert('Listagem', 'Não foi possível carregar os itens.');
    }
  }

  //Remove um item da lista
  async function handleRemove(id: string){

    try {
      
      await itemsStorage.remove(id);
      await itemsByStatus();
      Alert.alert('Remover', 'Item removido com sucesso.');
    } 
    catch (error) {
      Alert.alert('Remover', 'Não foi possível remover o item.');
    }
  }

  //Limpa todos os itens da lista
  function handleClear(){
    Alert.alert('Limpar', 'Deseja remover todos os itens da lista?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => { onClear() },
      }
    ]);
  }

  //Função que limpa todos os itens da lista
  async function onClear() {
    
    try {
      
      await itemsStorage.clear();
      setItems([]);
      Alert.alert('Limpar', 'Itens apagados com sucesso!');
    } 
    catch (error) {
      console.log(error);
      Alert.alert('Limpar', 'Não foi possível limpar a lista.');
    }
  }

  //Altera o status do item
  async function handleToggleItemStatus(id: string) {

    try {

      await itemsStorage.toggleStatus(id);
      await itemsByStatus();
    } 
    catch (error) {
      console.log(error);
      Alert.alert('Status', 'Não foi possível alterar o status do item.');
    }
  }

  //É chamado quando o componente é exibido em tela ou quando alguma variável do array de dependências é alterada
  useEffect(() => {
    itemsByStatus();
  }, [filter]);

  return (
    <View style={styles.container}>
      <Image source={require('@/assets/logo.png')} />

      <View style={styles.form}>
        <Input placeholder='O que você precisa comprar?' value={description} onChangeText={setDescription}/>
        <Button title="Adicionar" onPress={handleAdd}/>
      </View> 

      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter key={status} status={status} isActive={filter === status} onPress={() => setFilter(status)}/>
          ))}
          
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Item 
              data={item}
              onRemove={() => handleRemove(item.id)}
              onStatus={() => handleToggleItemStatus(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={ styles.listContent }  
          ListEmptyComponent={() => (
            <Text style={styles.empty}>
              Você ainda não tem itens na sua lista de compras
            </Text>
          )}
        />


      </View>
    </View>
  );
}
