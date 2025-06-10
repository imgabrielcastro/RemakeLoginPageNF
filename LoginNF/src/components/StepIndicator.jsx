import React from 'react';
import { View, Text } from 'react-native';

const StepIndicator = ({ currentStep, totalSteps }) => {
  const text = `ETAPA ${currentStep} DE ${totalSteps}`;

  return (
    <View style={{ gap: 4, alignSelf: 'center', justifyContent:'center'}}>
      <Text style={{ fontSize: 14, color: '#212121', textAlign: 'center' }}>{text}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index < currentStep;
          return (
            <View
              key={index}
              style={{
                backgroundColor: isActive ? '#A020F0' : '#e0e0e0',
                width: '32%',
                height: 4,
                borderRadius: 2,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default StepIndicator;
