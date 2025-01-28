import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import SegmentedControl from '@react-native-segmented-control/segmented-control';


function WeatherApp() {
  const [unit, setUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [selectedCity, setSelectedCity] = useState('Saskatoon'); // Default city

  // Static weather data
  const weatherData = [
    { city: 'Saskatoon', temperatureC: 22, condition: 'Sunny' },
    { city: 'Regina', temperatureC: 19, condition: 'Cloudy' },
    { city: 'Prince Albert', temperatureC: 16, condition: 'Rainy' },
  ];

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C'));
  };

  const convertTemperature = (tempC) => {
    return unit === 'C' ? tempC : (tempC * 9) / 5 + 32;
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const selectedWeather = weatherData.find((data) => data.city === selectedCity);

  const [selectedSegment, setSelectedSegment] = useState(0);


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather App</Text>
      <Button 
          onPress={() => toggleUnit()} 
          title={`Toggle to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
          style={styles.toggleButton}
        />
    <View style={styles.container}>
      <SegmentedControl
        values={['Saskatoon', 'Regina', 'Prince Albert']}
        selectedIndex={selectedSegment}
        onChange={(event) => {
          setSelectedSegment(event.nativeEvent.selectedSegmentIndex);
          handleCityChange({ target: { value: ['Saskatoon', 'Regina', 'Prince Albert'][event.nativeEvent.selectedSegmentIndex] } });
        }}
      />
      <StatusBar style="auto" />
    </View>
    {selectedWeather ? (
    <View style={styles.weatherCard}>
        <Text style={styles.city}>{selectedWeather.city}</Text>
        <Text style={styles.condition}>{selectedWeather.condition}</Text>
        <Text style={styles.temperature}>{convertTemperature(selectedWeather.temperatureC)}°{unit}</Text>
    </View>
    ) : (
      <Text style={styles.loading}>No weather data available</Text>
    )}
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  header: {
    fontSize: 25,
    marginBottom: 20,
  },
  toggleButton: {
    padding: 15,
    marginBottom: 20,
    cursor: 'pointer',
  },
  selectorContainer: {
    marginBottom: 20,
  },
  label: {
    marginRight: 10,
    fontSize: 16,
  },
  selector: {
    padding: 5,
    fontSize: 16,
  },
  weatherCard: {
    border: '1px solid #ccc',
    borderRadius: 5,
    padding: 15,
    margin: '10px auto',
    width: 200,
    textAlign: 'left',
  },
  city: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 16,
    color: '#555',
  },
  temperature: {
    fontSize: 18,
    color: '#333',
  },
  loading: {
    fontSize: 16,
    color: '#999',
  },
});

export default WeatherApp;