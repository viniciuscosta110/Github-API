import {StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#E5E6f0'
  },
  searchButton: {
    padding: 15,
    margin: 20,
    width: '75%',
    alignItems:'center',
    textAlign: 'center',
    borderRadius: 30,
    backgroundColor: '#24292E'
  },
  avatar: {
    width: 54,
    height: 54,
    borderColor: '#4473F2',
    borderRadius: 30,
    borderWidth: 4,
  },
  bio: {
      color: '#666',
      marginTop: 5
  },
  repo: {
    flexDirection: 'column',
    backgroundColor:'#eee',
    marginTop: 10,
    marginBottom: 10,
    marginRight: 30,
    marginLeft: 30,
    padding: 10,
    borderRadius: 30,
  }
});

export default styles;