import React from 'react';
import { View, Text } from 'react-native';

const StepIndicator = ({ currentStep, totalSteps }) => {
  const text = `ETAPA ${currentStep} DE ${totalSteps}`;

  return (
    <View style={{ gap: 4 }}>
      <Text style={{ fontSize: 12, color: '#212121' }}>{text}</Text>
      <View style={{ flexDirection: 'row', gap: 8 }}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const isActive = index < currentStep;
          return (
            <View
              key={index}
              style={{
                backgroundColor: isActive ? '#A020F0' : '#e0e0e0',
                width: 24,
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
