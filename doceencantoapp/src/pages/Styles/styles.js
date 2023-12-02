// src/styles/loginStyles.js
//#470214
//#FBF3DE
//#F4D19B
//#7C1C28
//#7A091B

import { StyleSheet } from 'react-native';

const loginStyles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
    flex: 1,
    backgroundColor: '#470214',
    padding: 20,
    bottom: 'auto'
  },
  titleLogin2: {
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'left',
    color:'#470214',
  },
  titleLogin: {
    fontSize: 97,
    marginBottom: 20,
    textAlign: 'left',
    color:'#FBF3DE'
  },
  email: {
    color: '#470214'
  },
  senha: {
    color: '#470214'
  },
  inputContainer: {
    
    backgroundColor: '#FBF3DE',
    borderRadius: 35,
    padding: 20,
  },
  input: {
    color:'#470214',
    height: 40,
    borderColor: '#62021e',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#470214',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  forgotPassword: {
    color:'#470214',
    textAlign: 'center',
    marginBottom: 10,
  },
  createAccount: {
    color:'#470214',
    textAlign: 'center',
  },

});

export default loginStyles;