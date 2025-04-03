import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Dummy data for characters
const characters = [
  { id: '1', name: 'Per', level: 5, image: require('./Bilder/stickman-vector-pose-9b7a6a.png') },
  { id: '2', name: 'Pål', level: 10, image: require('./Bilder/stickman-vector-pose-9b7a6a.png') },
  { id: '3', name: 'Dag', level: 1000, image: require('./Bilder/stickman-vector-pose-9b7a6a.png') },
];

// Type for navigation og route
type RootStackParamList = {
  'Galleri': undefined;
  'Din side': { character: { name: string; level: number; image: any } };
};

type CharacterDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Din side'>;
type CharacterDetailScreenRouteProp = RouteProp<RootStackParamList, 'Din side'>;

// Props for CharacterDetailScreen
type CharacterDetailScreenProps = {
  navigation: CharacterDetailScreenNavigationProp;
  route: CharacterDetailScreenRouteProp;
};

// Galleri-skjermen
const GalleryScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Familien</Text>
      <FlatList
        data={characters}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Din side', { character: item })}>
            <Image source={item.image} style={styles.thumbnail} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.level}>Level: {item.level}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

// Karakter-detaljskjerm
const CharacterDetailScreen = ({ character }: { character: { name: string; level: number; image: any } }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f8f8' }}>
      <Image source={character.image} style={styles.largeImage} />
      <Text style={styles.header}>{character.name}</Text>
      <Text style={styles.level}>Level: {character.level}</Text>
    </View>
  );
};

const TasksScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f8', padding: 20 }}>
      <Text style={styles.header}>Oppgaver</Text>
      <FlatList
        data={[{ id: '1', title: 'Fullfør et løp' }, { id: '2', title: 'Samle 100 mynter' }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.listItem}>• {item.title}</Text>}
        contentContainerStyle={{ flexGrow: 1 }} // 🟢 Sikrer riktig høyde
      />
    </View>
  );
};

const StoreScreen = () => {
  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f8', padding: 20 }}>
      <Text style={styles.header}>Butikk</Text>
      <FlatList
        data={[{ id: '1', name: 'Hatt' }, { id: '2', name: 'Briller' }]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text style={styles.listItem}>🛒 {item.name} - 50 mynter</Text>}
        contentContainerStyle={{ flexGrow: 1 }} // 🟢 Sikrer riktig høyde
      />
    </View>
  );
};


// Tabs-navigasjon
const Tab = createMaterialTopTabNavigator();

const TabsNavigator = ({ route }: { route: any }) => {
  const { character } = route.params;

  return (
    <View style={{ flex: 1 }}> 
      {/* Karakterdetaljer (hodebilde, navn, level) */}
      <View style={styles.characterContainer}>
        <Image source={character.image} style={styles.largeImage} />
        <Text style={styles.header}>{character.name}</Text>
        <Text style={styles.level}>Level: {character.level}</Text>
      </View>

      {/* Tab navigator - Viktig å sette flex: 1 her! */}
      <Tab.Navigator
        initialRouteName="Oppgaver"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarLabelStyle: { fontSize: 16 },
          tabBarStyle: { backgroundColor: 'white' },
        }}
        style={{ flex: 1 }} // 🟢 Sørger for at tabs tar riktig plass
      >
        <Tab.Screen name="Oppgaver" component={TasksScreen} />
        <Tab.Screen name="Butikk" component={StoreScreen} />
      </Tab.Navigator>
    </View>
  );
};


// Stack-navigasjon
const Stack = createStackNavigator<RootStackParamList>(); // Typing stack navigator

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Galleri" component={GalleryScreen} />
        <Stack.Screen 
          name="Din side" 
          component={TabsNavigator} 
          options={({ route }: any) => ({
            title: route.params.character.name, // Setter tittelen dynamisk
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Stiler
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8f8f8' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  card: { padding: 20, backgroundColor: '#fff', borderRadius: 10, marginBottom: 10, alignItems: 'center', width: 200 },
  name: { fontSize: 18, fontWeight: 'bold' },
  level: { fontSize: 16, color: 'gray' },
  thumbnail: { width: 50, height: 50 },
  largeImage: { width: 100, height: 100, marginBottom: 10 },
  listItem: { fontSize: 18, marginVertical: 5 },
  characterContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },  
});

export default App;