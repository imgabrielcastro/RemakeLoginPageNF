import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, ActivityIndicator, StyleSheet, Dimensions, Keyboard } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { height } = Dimensions.get('window');

const CitySelector = ({ selectedCity, onSelectCity }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState(null);

  const fetchCities = async () => {
    try {
      setLoading(true);
      setError(null);

      const ufResponse = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      );
      const ufs = await ufResponse.json();

      const response = await fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/municipios"
      );
      const data = await response.json();

      const ufMap = ufs.reduce((map, uf) => {
        map[uf.id] = uf.sigla;
        return map;
      }, {});

      // Processamos os municípios
      const formattedCities = data
        .map((municipio) => {
          const ufId = municipio.microrregiao?.mesorregiao?.UF?.id;
          const ufSigla = ufMap[ufId] || "BR";

          return {
            id: municipio.id,
            name: `${municipio.nome}`,
            cidade: municipio.nome,
            estado: ufSigla,
            ufId: ufId,
          };
        })
        .sort((a, b) => a.name.localeCompare(b.name));

      setCities(formattedCities);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
      setError("Erro ao carregar a lista de cidades");
    } finally {
      setLoading(false);
    }
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const openModal = () => {
    setIsVisible(true);
    if (cities.length === 0) {
      fetchCities();
    }
  };

  return (
    <View style={styles.container}>
      {/* BOTÃO QUE ABRE O MODAL - ESSE É O QUE ESTAVA FALTANDO */}
      <TouchableOpacity style={styles.inputButton} onPress={openModal}>
        <Text style={styles.inputText}>
          {selectedCity ? selectedCity.name : "Selecione uma cidade"}
        </Text>
        <Icon name="search" size={20} color="#666" />
      </TouchableOpacity>

   <Modal
  isVisible={isVisible}
  onBackdropPress={() => {
    Keyboard.dismiss();
    setIsVisible(false);
  }}
  style={[styles.modal, { margin: 0 }]}
  animationIn="slideInUp"
  animationOut="slideOutDown"
  coverScreen={true}
  onSwipeComplete={() => setIsVisible(false)}
  swipeDirection="down"
  propagateSwipe={true}
  backdropOpacity={0.6}
>
  <View style={[styles.modalContent, { height: height * 0.9 }]}>
    <View style={styles.modalHandle} />
    
    <View style={styles.modalHeader}>
      <Text style={styles.modalTitle}>Encontre sua cidade</Text>
      <TouchableOpacity 
        onPress={() => setIsVisible(false)}
        style={styles.closeButton}
      >
        <Icon name="close" size={24} color="#83239F" />
      </TouchableOpacity>
    </View>

    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar cidade..."
        placeholderTextColor="#999"
        value={searchText}
        onChangeText={setSearchText}
        autoFocus={true}
      />
      <Icon name="search" size={20} color="#83239F" style={styles.searchIcon} />
    </View>

    {/* Lista de resultados em cards */}
    <View style={styles.listContainer}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#83239F" />
          <Text style={styles.loadingText}>Buscando cidades...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <View style={styles.errorCard}>
            <Icon name="error-outline" size={40} color="#FF3B30" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              onPress={fetchCities}
              style={styles.retryButton}
            >
              <Text style={styles.retryText}>Tentar novamente</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <FlatList
          data={filteredCities}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.cityCard,
                selectedCity?.id === item.id && styles.selectedCityCard
              ]}
              onPress={() => {
                onSelectCity(item);
                setIsVisible(false);
                setSearchText('');
              }}
            >
              <View style={styles.cardContent}>
                <Text style={styles.cityName}>{item.cidade}</Text>
                <View style={styles.stateBadge}>
                  <Text style={styles.stateText}>{item.estado}</Text>
                </View>
              </View>
              <Icon name="arrow-right" size={30} color="#83239F" />
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyCard}>
                <Icon name="location-off" size={40} color="#83239F" />
                <Text style={styles.emptyText}>
                  {searchText ? "Nenhuma cidade encontrada" : "Comece a digitar para buscar"}
                </Text>
              </View>
            </View>
          }
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: '10',
    borderWidth: 1,
    borderColor: "#78747d",
    padding: 15,
    width: '100%',
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  inputText: {
    color: "#000",
  },
modal: {
  margin: 0,
  justifyContent: "flex-end",
},
modalContent: {
  backgroundColor: "#F9F9F9",
  borderTopLeftRadius: 28,
  borderTopRightRadius: 28,
  width: "100%",
  maxHeight: "90%",
  paddingBottom: 30,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: -4 },
  shadowOpacity: 0.15,
  shadowRadius: 12,
  elevation: 15,
},
modalHandle: {
  width: 60,
  height: 6,
  backgroundColor: "#E0E0E0",
  borderRadius: 4,
  alignSelf: "center",
  marginTop: 12,
  marginBottom: 8,
},
modalHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 24,
  paddingVertical: 18,
},
modalTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: '#83239F',
  letterSpacing: 0.5,
},
closeButton: {
  padding: 8,
  borderRadius: 20,
  backgroundColor: '#F0E0F5',
},
searchContainer: {
  flexDirection: "row",
  alignItems: "center",
  paddingHorizontal: 20,
  marginHorizontal: 20,
  marginBottom: 15,
  borderRadius: 14,
  backgroundColor: "#FFFFFF",
  borderWidth: 1,
  borderColor: "#EDEDED",
  shadowColor: "#83239F",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
},
searchInput: {
  flex: 1,
  height: 50,
  color: '#333',
  fontSize: 16,
  paddingHorizontal: 15,
  paddingRight: 10,
},
searchIcon: {
  marginRight: 15,
},
listContainer: {
  flex: 1,
  paddingHorizontal: 20,
},
listContent: {
  paddingBottom: 30,
},
cityCard: {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  padding: 18,
  marginBottom: 12,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: "#F0F0F0",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},
selectedCityCard: {
  borderColor: "#83239F",
  backgroundColor: "#FBF0FF",
  shadowColor: "#83239F",
},
cardContent: {
  flexDirection: 'row',
  alignItems: 'center',
},
cityName: {
  fontSize: 16,
  color: '#333',
  fontWeight: '500',
  marginRight: 12,
},
stateBadge: {
  backgroundColor: '#F0D9F7',
  paddingHorizontal: 10,
  paddingVertical: 4,
  borderRadius: 10,
},
stateText: {
  fontSize: 12,
  color: '#83239F',
  fontWeight: '600',
  textTransform: 'uppercase',
},
loadingContainer: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 40,
},
loadingText: {
  marginTop: 15,
  color: '#83239F',
  fontSize: 16,
  fontWeight: '500',
},
errorContainer: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
},
errorCard: {
  backgroundColor: "#FFF",
  borderRadius: 16,
  padding: 30,
  alignItems: 'center',
  width: '100%',
  maxWidth: 300,
  borderWidth: 1,
  borderColor: "#FFEBEE",
},
errorText: {
  color: "#FF3B30",
  marginVertical: 15,
  fontSize: 16,
  textAlign: 'center',
  fontWeight: '500',
},
retryButton: {
  backgroundColor: '#83239F',
  paddingHorizontal: 24,
  paddingVertical: 12,
  borderRadius: 12,
  marginTop: 10,
  shadowColor: "#83239F",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 3,
},
retryText: {
  color: "#fff",
  fontSize: 15,
  fontWeight: '600',
},
emptyContainer: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
},
emptyCard: {
  backgroundColor: "#FFF",
  borderRadius: 16,
  padding: 30,
  alignItems: 'center',
  width: '100%',
  maxWidth: 300,
  borderWidth: 1,
  borderColor: "#F5F5F5",
},
emptyText: {
  color: '#83239F',
  marginTop: 15,
  fontSize: 16,
  textAlign: 'center',
  fontWeight: '500',
},
});

export default CitySelector;

