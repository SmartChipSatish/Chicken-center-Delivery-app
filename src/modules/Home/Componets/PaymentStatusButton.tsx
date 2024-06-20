import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const PaymentStatusButton = ({ status }: { status: string }) => {
    const getStatus = (status: string) => {
        switch (status) {
            case 'SUCCESS':
                return { label: 'ONLINE', backgroundColor: '#C6F6D5', textColor: '#38A169' };
            case 'PENDING':
                return { label: 'COD', backgroundColor: '#FEEBC8', textColor: '#DD6B20' };

            default:
                return { label: 'Unknown', backgroundColor: '#E2E8F0', textColor: '#2D3748' };
        }
    };

    const { label, backgroundColor, textColor } = getStatus(status);

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor }]}>
            <Text style={[styles.buttonText, { color: textColor }]}>{label}</Text>
        </TouchableOpacity>
    );
};

export default PaymentStatusButton;

const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        overflow: 'hidden',
        marginLeft: 10,
    },
    buttonText: {
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
