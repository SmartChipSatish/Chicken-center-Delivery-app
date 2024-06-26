import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import CustomHeader from '../../../Hooks/CustomHeader'

export default function Faqs() {
  return (
    <>
      <View>
      <CustomHeader tittle="FAQ's" Navigate='Profile' />
     </View>
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Frequently Asked Questions</Text>
        <View style={styles.faqItem}>
          <Text style={styles.question}>Q: What is this app about?</Text>
          <Text style={styles.answer}>
            A: This app is designed to help users manage their profiles, change passwords, and review terms and conditions and privacy policies.
          </Text>
        </View>
        <View style={styles.faqItem}>
          <Text style={styles.question}>Q: How do I update my profile?</Text>
          <Text style={styles.answer}>
            A: You can update your profile by navigating to the profile screen and making the necessary changes. Ensure all fields are filled correctly before saving.
          </Text>
        </View>
        <View style={styles.faqItem}>
          <Text style={styles.question}>Q: How do I change my password?</Text>
          <Text style={styles.answer}>
            A: You can change your password by navigating to the password change screen. Enter your current password followed by the new password and confirm it.
          </Text>
        </View>
        <View style={styles.faqItem}>
          <Text style={styles.question}>Q: Where can I find the terms and conditions?</Text>
          <Text style={styles.answer}>
            A: The terms and conditions can be found on the dedicated terms and conditions screen accessible from the main menu.
          </Text>
        </View>
        <View style={styles.faqItem}>
          <Text style={styles.question}>Q: Where can I find the privacy policy?</Text>
          <Text style={styles.answer}>
            A: The privacy policy can be found on the dedicated privacy policy screen accessible from the main menu.
          </Text>
        </View>
      </ScrollView>
    </View>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:"#000"
  },
  faqItem: {
    marginBottom: 16,
    color:"#000"
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"#000"
  },
  answer: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color:"#000"
  },
});