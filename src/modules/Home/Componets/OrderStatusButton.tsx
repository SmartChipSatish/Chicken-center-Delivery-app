import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const OrderStatusButton = ({ status }: { status: string }) => {
    const getStatus = (status: string) => {
        switch (status) {
            case 'INPROCESS':
                return { label: 'INPROCESS', backgroundColor: '#FFEB3B', textColor: '#000' }; // Yellow background, black text
            case 'Cancelled':
                return { label: 'CANCELLED', backgroundColor: '#F44336', textColor: '#FFF' }; // Red background, white text
            case 'DELIVERD':
                return { label: 'DELIVERED', backgroundColor: '#2196F3', textColor: '#FFF' }; // Blue background, white text
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

export default OrderStatusButton;

const styles = StyleSheet.create({
    button: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    buttonText: {
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});
